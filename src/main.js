import { generateEvents } from './mock/event.js';
import TripPresenter from './presentor/trip-presenter.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presentor/filter-presentor.js';

const eventsCount = 10;

const events = Array.from({ length: eventsCount }, generateEvents);

const siteNavigationElement = document.querySelector('.trip-controls__navigation');

const siteFilterElement = document.querySelector('.trip-controls__filters');

const tripEvents = document.querySelector('.trip-events');

const eventsModel = new EventsModel();
eventsModel.events = events;

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(tripEvents, siteNavigationElement, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel);

filterPresenter.init();

tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});
