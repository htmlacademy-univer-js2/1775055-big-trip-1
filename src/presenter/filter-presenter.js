import FilterView from '../view/filter-view.js';
import { render, RenderPosition, replace, remove } from '../render.js';
import { FilterType, UpdateType } from '../const.js';
import { filter } from '../utils/filter.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #eventsModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, eventsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#eventsModel = eventsModel;
  }

  get filters() {
    const events = this.#eventsModel.events;

    return {
      [FilterType.EVERYTHING]: {
        name: 'Everything',
        count: filter[FilterType.EVERYTHING](events).length,
      },
      ['future']: {
        name: 'Future',
        count: filter[FilterType.FUTURE](events).length,
      },
      [FilterType.PAST]: {
        name: 'Past',
        count: filter[FilterType.PAST](events).length,
      },
    };
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(this.#filterModel.filter, filters);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    this.#filterModel.addObserver(this.#handleModelEvent);

    if (prevFilterComponent === null) {
      render(this.#filterContainer, this.#filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  }

  destroy = () => {
    remove(this.#filterComponent);
    this.#filterComponent = null;

    this.#filterModel.removeObserver(this.#handleModelEvent);

    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  }

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}
