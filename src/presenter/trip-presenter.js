import ListEventView from '../view/list-event-view.js';
import SortView from '../view/sort-view.js';
import EventEmpty from '../view/event-empty.js';
import EventPresenter from './event-presenter.js';
import EventNewPresenter from './event-new-presenter.js';
import { UserAction, UpdateType, FilterType } from '../const.js';
import { filter } from '../utils/filter.js';
import { generateEvents } from '../mock/event.js';
import { clearStats } from '../utils/statistic.js';
import { SortType, sortEventDate, sortEventTime, sortEventPrice } from '../utils/sorting.js';

import { RenderPosition, render, remove } from '../render.js';

export default class TripPresenter {
  #tripContainer = null;
  #eventPresenters = new Map();
  #eventNewPresenter = null;
  #currentSortType = SortType.DAY.text;
  #eventsModel = null;
  #filterModel = null;

  #sortComponent = null;
  #listEventComponent = new ListEventView();
  #eventEmptyComponent = null;
  #filterType = FilterType.EVERYTHING;


  constructor(tripContainer, eventsModel, filterModel) {
    this.#tripContainer = tripContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;

    this.#eventNewPresenter = new EventNewPresenter(this.#listEventComponent, this.#handleViewAction);
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    const filteredEvents = filter[this.#filterType](events);

    switch (this.#currentSortType) {
      case SortType.DAY.text:
        return filteredEvents.sort(sortEventDate);
      case SortType.TIME.text:
        return filteredEvents.sort(sortEventTime);
      case SortType.PRICE.text:
        return filteredEvents.sort(sortEventPrice);
    }

    return filteredEvents;
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvents(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  }

  init = () => {
    this.#renderBoard();

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  createEvent = () => {
    const event = generateEvents();
    event.city.currentCity.isShowPhoto = true;
    const createEventData = {...event, isCreateEvent : true};
    this.#handleModeChange();
    this.#currentSortType = SortType.DAY.text;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    clearStats();
    this.#eventNewPresenter.init(createEventData);
  }

  #handleModeChange = () => {
    this.#eventNewPresenter.destroy();
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.resetView());
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    render(this.#tripContainer, this.#sortComponent, RenderPosition.BEFOREEND);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  destroy = () => {
    this.#clearBoard({ resetSortType: true});

    remove(this.#listEventComponent);

    this.#eventsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  #renderListEvent = () => {
    render(this.#tripContainer, this.#listEventComponent, RenderPosition.BEFOREEND);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();

  }

  #renderEvent = (tripEvent) => {
    const eventPresenter = new EventPresenter(this.#listEventComponent, this.#handleViewAction, this.#handleModeChange);
    eventPresenter.init(tripEvent);
    this.#eventPresenters.set(tripEvent.id, eventPresenter);
  }

  #renderEvents = (events) => {
    events.forEach((tripEvent) => this.#renderEvent(tripEvent));
  }

  #renderNoEvents = () => {
    this.#eventEmptyComponent = new EventEmpty(this.#filterType);
    render(this.#tripContainer, this.#eventEmptyComponent, RenderPosition.BEFOREEND);
    this.#listEventComponent.element.remove();
    this.#sortComponent.element.remove();
  }

  #clearBoard = ({ resetSortType = false } = {}) => {
    this.#eventNewPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
    remove(this.#sortComponent);
    remove(this.#eventEmptyComponent);

    if (this.#eventEmptyComponent) {
      remove(this.#eventEmptyComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY.text;
    }
  }

  #renderBoard = () => {
    if (this.events.length === 0) {
      this.#renderNoEvents();
      return;
    }

    const events = this.events.slice();

    this.#renderSort();

    this.#renderListEvent();

    this.#renderEvents(events);

    this.#handleSortTypeChange(this.#currentSortType);
  }
}