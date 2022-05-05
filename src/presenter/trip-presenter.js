import ListEventView from '../view/list-event-view.js';
import SortView from '../view/sort-view.js';
import EventEmpty from '../view/event-empty.js';
import EventPresenter, {State as EventPresenterViewState} from './event-presenter.js';
import EventNewPresenter from './event-new-presenter.js';
import { UserAction, UpdateType, FilterType } from '../const.js';
import { filter } from '../utils/filter.js';
import { clearStats } from '../utils/statistic.js';
import { dataNewEvent } from '../utils/adapter.js';
import LoadingView from '../view/loading-view.js';
import EventsInfoView from '../view/trip-info-view.js';
import { SortType, sortEventDate, sortEventTime, sortEventPrice } from '../utils/sorting.js';

import { RenderPosition, render, remove } from '../render.js';
const tripMainContainer = document.querySelector('.trip-main');

export default class TripPresenter {
  #tripContainer = null;
  #eventPresenters = new Map();
  #loadingComponent = new LoadingView();
  #eventNewPresenter = null;
  #currentSortType = SortType.DAY.text;
  #eventsModel = null;
  #filterModel = null;

  #infoTrip = null;
  #sortComponent = null;
  #listEventComponent = new ListEventView();
  #eventEmptyComponent = null;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;


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

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventPresenters.get(update.id).setViewState(EventPresenterViewState.SAVING);
        this.#eventsModel.updateEvent(updateType, update);
        try {
          await this.#eventsModel.updateEvent(updateType, update);
        } catch(err) {
          this.#eventPresenters.get(update.id).setViewState(EventPresenterViewState.ABORTING);
        }
        break;
      case UserAction.ADD_EVENT:
        this.#eventNewPresenter.setSaving();
        try {
          await this.#eventsModel.addEvent(updateType, update);
        } catch(err) {
          this.#eventNewPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_EVENT:
        this.#eventPresenters.get(update.id).setViewState(EventPresenterViewState.DELETING);
        this.#eventsModel.deleteEvents(updateType, update);
        try {
          await this.#eventsModel.deleteEvents(updateType, update);
        } catch(err) {
          this.#eventPresenters.get(update.id).setViewState(EventPresenterViewState.ABORTING);
        }
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  }

  init = () => {
    this.#renderBoard();

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  createEvent = () => {
    this.#handleModeChange();
    this.#currentSortType = SortType.DAY.text;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    clearStats();
    dataNewEvent.type.currentType.selectedOffers = [];
    dataNewEvent.city.currentCity.isShowPhoto = true;
    this.#eventNewPresenter.init(dataNewEvent);
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
    this.#clearBoard({ resetSortType: true });

    remove(this.#listEventComponent);

    this.#eventsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  #renderListEvent = () => {
    render(this.#tripContainer, this.#listEventComponent, RenderPosition.BEFOREEND);
  }

  #renderLoading = () => {
    render(this.#tripContainer, this.#loadingComponent, RenderPosition.AFTERBEGIN);
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
  }

  renderInfoTrip = () => {
    if(this.events.length > 0 ) {
      this.#infoTrip = new EventsInfoView(this.events);
      render(tripMainContainer,this.#infoTrip , RenderPosition.AFTERBEGIN);
    }
  }

  #clearBoard = ({ resetSortType = false } = {}) => {
    this.#eventNewPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
    remove(this.#sortComponent);
    remove(this.#eventEmptyComponent);
    remove(this.#loadingComponent);
    remove(this.#infoTrip);

    if (this.#eventEmptyComponent) {
      remove(this.#eventEmptyComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY.text;
    }
  }

  #renderBoard = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.events.length === 0) {
      this.#renderNoEvents();
      return;
    }

    const events = this.events.slice();

    this.#renderSort();

    this.#renderListEvent();

    this.renderInfoTrip();
    this.#renderEvents(events);

    this.#handleSortTypeChange(this.#currentSortType);
  }
}
