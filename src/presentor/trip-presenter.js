import MenuView from '../view/menu-view';
import FilterView from '../view/filter-view.js';
import ListEventView from '../view/list-event-view.js';
import SortView from '../view/sort-view.js';
import EventEmpty from '../view/event-empty.js';
import EventPresenter from './event-presenter.js';
import { SortType, sortEventDate, sortEventTime, sortEventPrice } from '../utils/sorting.js';
import { updateItem } from '../utils/common.js';

import { RenderPosition, render } from '../render.js';


export default class TripPresenter {
  #tripContainer = null;
  #menuContainer = null;
  #filterContainer = null;
  #tripEvents = [];
  #eventPresenters = new Map();
  #currentSortType = null;

  #menuComponent = new MenuView();
  #filterComponent = new FilterView();
  #sortComponent = new SortView();
  #listEventComponent = new ListEventView();
  #eventEmptyComponent = new EventEmpty();


  constructor(tripContainer, menuContainer, filterContainer) {
    this.#tripContainer = tripContainer;
    this.#menuContainer = menuContainer;
    this.#filterContainer = filterContainer;
  }

  init = (tripEvents) => {
    this.#tripEvents = [...tripEvents];

    render(this.#menuContainer, this.#menuComponent, RenderPosition.BEFOREEND);
    render(this.#filterContainer, this.#filterComponent, RenderPosition.BEFOREEND);

    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.resetView());
  }

  #handleEventChange = (updatedEvent) => {
    this.#tripEvents = updateItem(this.#tripEvents, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  }

  #sortTasks = (sortType) => {
    switch (sortType) {
      case SortType.DAY.text:
        this.#tripEvents.sort(sortEventDate);
        break;
      case SortType.TIME.text:
        this.#tripEvents.sort(sortEventTime);
        break;
      case SortType.PRICE.text:
        this.#tripEvents.sort(sortEventPrice);
        break;
    }

    this.#currentSortType = sortType;
  }

  #renderSort = () => {
    render(this.#tripContainer, this.#sortComponent, RenderPosition.BEFOREEND);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderListEvent = () => {
    render(this.#tripContainer, this.#listEventComponent, RenderPosition.BEFOREEND);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTasks(sortType);
    this.#clearEventList();
    this.#renderListEvent();
    this.#renderEvents();
  }

  #renderEvent = (tripEvent) => {
    const eventPresenter = new EventPresenter(this.#listEventComponent, this.#handleEventChange, this.#handleModeChange);
    eventPresenter.init(tripEvent);
    this.#eventPresenters.set(tripEvent.id, eventPresenter);
  }

  #renderEvents = () => {
    this.#tripEvents.forEach((tripEvent) => this.#renderEvent(tripEvent));
  }

  #clearEventList = () => {
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.destroy());
    this.#eventPresenters.clear();
  }

  #renderNoEvents = () => {
    render(this.#tripContainer, this.#eventEmptyComponent, RenderPosition.BEFOREEND);
    this.#listEventComponent.element.remove();
    this.#sortComponent.element.remove();
  }

  #renderBoard = () => {
    if (this.#tripEvents.length === 0) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();

    this.#renderListEvent();

    this.#renderEvents();

    this.#handleSortTypeChange('day');
  }
}
