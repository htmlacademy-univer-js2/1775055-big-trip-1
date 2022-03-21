import { createTripMenu } from './view/menu-view.js';
import { createTripFilter } from './view/filter-view.js';
import { createTripListEvents } from './view/list-event-view.js';
import { createTripEvent } from './view/item-event-view.js';
import { createTripEventOffer, createOfferForEditAndNewPoint } from './view/event-offer-view.js';
import { createTripSort } from './view/sort-view.js';
import { createTripEditPoint } from './view/edit-point-view.js';
import { generateRoute } from './mock/point.js';
import { createTripPhoto } from './view/add-photo-tape-view.js';
import { renderTemplate, RenderPosition } from './render.js';

const routeCount = 15;

const routes = Array.from({ length: routeCount }, generateRoute);

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

for (let i = 0; i < routeCount; i++) {
  renderTemplate(siteList, createTripEvent(routes[i]), RenderPosition.BEFOREEND);
}

const selectedOffers = document.querySelectorAll('.event__selected-offers');

for (let i = 0; i < routeCount; i++) {
  for (let j = 0; j < routes[i].offers.length; j++) {
    renderTemplate(selectedOffers[i], createTripEventOffer(routes[i].offers[j]), RenderPosition.BEFOREEND);
  }
}

renderTemplate(siteList, createTripEditPoint(routes[0]), RenderPosition.AFTERBEGIN);
const availableOffers = document.querySelector('.event__available-offers');
for (let i = 0; i < routes[0].offers.length; i++) {
  renderTemplate(availableOffers, createOfferForEditAndNewPoint(routes[0].offers[i]), RenderPosition.BEFOREEND);
}

const photosTape = document.querySelector('.event__photos-tape');

for (let i = 0; i < routes[0].photos.length; i++) {
  renderTemplate(photosTape, createTripPhoto(routes[0].photos[i]), RenderPosition.AFTERBEGIN);
}
