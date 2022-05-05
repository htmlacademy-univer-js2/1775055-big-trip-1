import TripPresenter from './presenter/trip-presenter.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import MenuView from './view/menu-view.js';
import { MenuItem } from './const.js';
import { countingStats, clearStats } from './utils/statistic.js';
import StatisticsView from './view/statistics-view.js';
import  ApiService  from './api-service';
import { RenderPosition, render, remove } from './render.js';

const siteMainElement = document.querySelector('.page-main').querySelector('.page-body__container');

const siteMenuContainer = document.querySelector('.trip-controls__navigation');

const siteFilterElement = document.querySelector('.trip-controls__filters');

const buttonAddNewPoint = document.querySelector('.trip-main__event-add-btn');

const tripEventsContainer = document.querySelector('.trip-events');

const siteMenuComponent = new MenuView();

const AUTHORIZATION = 'Basic gjgtrhgrughei313';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

buttonAddNewPoint.disabled = true;

const eventsModel = new EventsModel(new ApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(tripEventsContainer, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, eventsModel);

tripPresenter.init();

let statsView = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.EVENTS:
      tripEventsContainer.classList.add('trip-events');
      filterPresenter.destroy();
      tripPresenter.destroy();
      filterPresenter.init(eventsModel.events);
      tripPresenter.init();
      remove(statsView);
      statsView = null;
      clearStats();
      break;
    case MenuItem.STATISTICS:
      tripEventsContainer.classList.remove('trip-events');
      countingStats(eventsModel.events);
      statsView = new StatisticsView();
      render(siteMainElement, statsView, RenderPosition.BEFOREEND);
      filterPresenter.destroy();
      tripPresenter.destroy();
      tripPresenter.renderInfoTrip();
      break;
  }
};

eventsModel.init().finally(() => {
  filterPresenter.init(eventsModel.events);
  render(siteMenuContainer, siteMenuComponent, RenderPosition.BEFOREEND);
  buttonAddNewPoint.disabled = false;
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
});

buttonAddNewPoint.addEventListener('click', (evt) => {
  evt.preventDefault();
  evt.target.disabled = true;
  tripEventsContainer.classList.add('trip-events');
  const tableLink = document.querySelector('#EVENTS');
  const statsLink = document.querySelector('#STATISTICS');
  tableLink.classList.add('trip-tabs__btn--active');
  statsLink.classList.remove('trip-tabs__btn--active');
  filterPresenter.destroy();
  filterPresenter.init(eventsModel.events);
  tripPresenter.destroy();
  if(statsView) {
    remove(statsView);
  }
  clearStats();
  tripPresenter.createEvent();
  tripPresenter.init();
});
