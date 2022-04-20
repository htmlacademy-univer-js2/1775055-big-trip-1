import { generateEvents } from './mock/event.js';
import TripPresenter from './presentor/trip-presenter.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presentor/filter-presentor.js';
import MenuView from './view/menu-view.js';
import { MenuItem } from './const.js';
import StatisticsView from './view/statistics-view.js';
import { RenderPosition, render } from './render.js';

const eventsCount = 10;

const events = Array.from({ length: eventsCount }, generateEvents);

const siteMainElement = document.querySelector('.page-main').querySelector('.page-body__container');

const siteMenuContainer = document.querySelector('.trip-controls__navigation');

const siteFilterElement = document.querySelector('.trip-controls__filters');

const tripEvents = document.querySelector('.trip-events');

const siteMenuComponent = new MenuView();

const eventsModel = new EventsModel();
eventsModel.events = events;

const filterModel = new FilterModel();

render(siteMenuContainer, siteMenuComponent, RenderPosition.BEFOREEND);
const tripPresenter = new TripPresenter(tripEvents, eventsModel, filterModel, siteMenuComponent);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel);

filterPresenter.init();

tripPresenter.init();

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_EVENT:
      // Скрыть статистику
      // Показать фильтры
      // Показать доску
      // Показать форму добавления новой задачи
      // Убрать выделение с ADD NEW TASK после сохранения
      break;
    case MenuItem.EVENTS:
      filterPresenter.init();
      tripPresenter.init();
      break;
    case MenuItem.STATISTICS:
      // Скрыть фильтры
      // Скрыть доску
      // Показать статистику
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
