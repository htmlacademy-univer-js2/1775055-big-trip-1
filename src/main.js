import { generateEvents } from './mock/event.js';
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

const tripEvents = document.querySelector('.trip-events');

const siteMenuComponent = new MenuView();

const AUTHORIZATION = 'Basic gjgtrhgrughei313';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

const eventsModel = new EventsModel(new ApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
eventsModel.init();

render(siteMenuContainer, siteMenuComponent, RenderPosition.BEFOREEND);
const tripPresenter = new TripPresenter(tripEvents, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel);

filterPresenter.init();

tripPresenter.init();

let statsView = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.EVENTS:
      filterPresenter.init();
      tripPresenter.init();
      remove(statsView);
      clearStats();
      break;
    case MenuItem.STATISTICS:
      countingStats(eventsModel.events);
      statsView = new StatisticsView();
      render(siteMainElement, statsView, RenderPosition.BEFOREEND);
      filterPresenter.destroy();
      tripPresenter.destroy();
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  const tableLink = document.querySelector('#EVENTS');
  const statsLink = document.querySelector('#STATISTICS');
  tableLink.classList.add('trip-tabs__btn--active');
  statsLink.classList.remove('trip-tabs__btn--active');
  filterPresenter.destroy();
  filterPresenter.init();
  tripPresenter.destroy();
  tripPresenter.init();
  tripPresenter.createEvent();
});
