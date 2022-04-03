import { generateEvents } from './mock/event.js';
import TripPresenter from './presentor/trip-presenter.js';

const eventsCount = 5;

const events = Array.from({ length: eventsCount }, generateEvents);

const siteNavigationElement = document.querySelector('.trip-controls__navigation');

const siteFilterElement = document.querySelector('.trip-controls__filters');

const tripEvents = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripEvents, siteNavigationElement, siteFilterElement);

tripPresenter.init(events);
