import { generateRoute } from './mock/point.js';
import TripPresenter from './presentor/trip-presenter.js';
import { RenderPosition, render } from './render.js';

const routeCount = 5;

const routes = Array.from({ length: routeCount }, generateRoute);

const siteNavigationElement = document.querySelector('.trip-controls__navigation');

const siteFilterElement = document.querySelector('.trip-controls__filters');

const tripEvents = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripEvents, siteNavigationElement, siteFilterElement);

tripPresenter.init(routes);
