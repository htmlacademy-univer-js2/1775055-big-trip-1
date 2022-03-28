import MenuView from './view/menu-view.js';
import FilterView from './view/filter-view.js';
import ListEventView from './view/list-event-view.js';
import EventView from './view/item-event-view.js';
import EventOffer from './view/event-offer-view.js';
import OfferForEditAndNewPoint from './view/offer-edit-and-new-point.js';
import SortView from './view/sort-view.js';
import EditPoint from './view/edit-point-view.js';
import { generateRoute } from './mock/point.js';
import EventEmpty from './view/event-empty.js';
import TripPhoto from './view/add-photo-tape-view.js';
import { RenderPosition, render } from './render.js';

const routeCount = 5;

const routes = Array.from({ length: routeCount }, generateRoute);

const siteHeader = document.querySelector('.page-header');
const siteNavigationElement = siteHeader.querySelector('.trip-controls__navigation');

render(siteNavigationElement, new MenuView().element, RenderPosition.BEFOREEND);

const siteFilterElement = siteHeader.querySelector('.trip-controls__filters');

render(siteFilterElement, new FilterView().element, RenderPosition.BEFOREEND);

const siteMain = document.querySelector('.page-main');
const siteMainElement = siteMain.querySelector('.page-body__container');

const sortView = new SortView();

render(siteMainElement, sortView.element, RenderPosition.BEFOREEND);

const listEventComponent = new ListEventView();
render(siteMainElement, listEventComponent.element, RenderPosition.BEFOREEND);

const siteList = document.querySelector('.trip-events__list');

const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EditPoint(event);

  const replaceEventToEditPoint = () => {
    eventListElement.replaceChild(eventEditComponent.element, eventComponent.element);
  };

  const replaceEditPointToEvent = () => {
    eventListElement.replaceChild(eventComponent.element, eventEditComponent.element);
  };

  const removeOfferElements = () => {
    const availableOffers = eventListElement.querySelector('.event__available-offers');
    const offersElement = availableOffers.querySelectorAll('.event__offer-selector');
    for (let i = 0; i < event.offers.length; i++) {
      offersElement[i].remove();
    }
  };
  
  eventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceEventToEditPoint();
    const availableOffers = eventListElement.querySelector('.event__available-offers');
    for (let i = 0; i < event.offers.length; i++) {
      render(availableOffers, new OfferForEditAndNewPoint(event.offers[i]).element, RenderPosition.BEFOREEND);
    }
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.element.querySelector('.event--edit').querySelector('.event__rollup-btn').addEventListener('click', () => {
    removeOfferElements();
    replaceEditPointToEvent();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      removeOfferElements();
      replaceEditPointToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventEditComponent.element.querySelector('.event').addEventListener('submit', (evt) => {
    evt.preventDefault();
    removeOfferElements();
    replaceEditPointToEvent();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(eventListElement, eventComponent.element, RenderPosition.BEFOREEND);
};

for (let i = 0; i < routeCount; i++) {
  renderEvent(siteList, routes[i]);
}

const tripEventsSection = document.querySelector('.trip-events');
const eventEmptyComponent = new EventEmpty();

if(routes.length === 0){
  render(tripEventsSection, eventEmptyComponent.element, RenderPosition.BEFOREEND);
  siteList.remove();
  sortView.element.remove();
}

const selectedOffers = document.querySelectorAll('.event__selected-offers');

for (let i = 0; i < routeCount; i++) {
  for (let j = 0; j < routes[i].offers.length; j++) {
    render(selectedOffers[i], new EventOffer(routes[i].offers[j]).element, RenderPosition.BEFOREEND);
  }
}
