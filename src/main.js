import {createTripMenu} from './view/menu-view.js';
import {createTripFilter} from './view/filter-view.js';
import {createTripListEvents} from './view/list-event-view.js';
import {createTripEvent} from './view/item-event-view.js';
import {createTripEventOffer} from './view/event-offer-view.js';
import {createTripSort} from './view/sort-view.js';
import {createTripAddNewPoint} from './view/add-new-point-view.js';
import {createTripEditPoint} from './view/edit-point-view.js';
import {generateRoute} from './mock/point.js';
import {renderTemplate, RenderPosition} from './render.js';

const routeCount = 15;

const routes = Array.from({length: routeCount}, generateRoute);

const siteHeader = document.querySelector('.page-header');
const siteNavigationElement = siteHeader.querySelector('.trip-controls__navigation');

renderTemplate(siteNavigationElement, createTripMenu(), RenderPosition.BEFOREEND);

const siteFilterElement = siteHeader.querySelector('.trip-controls__filters');

renderTemplate(siteFilterElement, createTripFilter(), RenderPosition.BEFOREEND);

const siteMain = document.querySelector('.page-main');
const siteMainElement = siteMain.querySelector('.page-body__container');

renderTemplate(siteMainElement, createTripSort(), RenderPosition.BEFOREEND);

renderTemplate(siteMainElement, createTripListEvents(), RenderPosition.BEFOREEND);

const siteList = document.querySelector('.trip-events__list');

for(let i = 0; i < routeCount; i++) {
  renderTemplate(siteList, createTripEvent(routes[i]), RenderPosition.BEFOREEND);
}

const selectedOffers = document.querySelectorAll('.event__selected-offers');

for(let i = 0; i < routeCount; i++) {
  const {offers} = routes[i];
  for(let j = 0; j < offers.length; j++){
    renderTemplate(selectedOffers[i], createTripEventOffer(offers[j]), RenderPosition.BEFOREEND);
  }
}

renderTemplate(siteList, createTripAddNewPoint(), RenderPosition.AFTERBEGIN);

renderTemplate(siteList, createTripEditPoint(), RenderPosition.AFTERBEGIN);

