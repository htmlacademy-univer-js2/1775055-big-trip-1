import EventView from '../view/item-event-view.js';
import EditPoint from '../view/edit-point-view.js';
import { UserAction, UpdateType } from '../const.js';
import { isDatesEqual } from '../utils/date-manipulation.js';
import { RenderPosition, render, replace, remove } from '../render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

export default class EventPresenter {
  #eventListContainer = null;
  #changeData = null;
  #changeMode = null;

  #eventComponent = null;
  #eventEditComponent = null;

  #tripEvent = null;
  #mode = Mode.DEFAULT;

  constructor(eventListContainer, changeData, changeMode) {
    this.#eventListContainer = eventListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (tripEvent) => {
    this.#tripEvent = tripEvent;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView(this.#tripEvent);
    this.#eventEditComponent = new EditPoint(this.#tripEvent);

    this.#eventComponent.setClickRollupHandler(this.#replaceEventToEditPoint);
    this.#eventEditComponent.setClickRollupHandler(this.#replaceEditPointToEvent);
    this.#eventEditComponent.setFormSubmitHadler(this.#handleFormSubmit);
    this.#eventComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#eventEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventListContainer, this.#eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventComponent, prevEventEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditPointToEvent();
    }
  }

  destroy = () => {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceEditPointToEvent();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  }

  setViewState = (state) => {
    if (this.#mode === Mode.DEFAULT) {
      return;
    }

    const resetFormState = () => {
      this.#eventEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    switch (state) {
      case State.SAVING:
        this.#eventEditComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this.#eventEditComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case State.ABORTING:
        this.#eventComponent.shake(resetFormState);
        this.#eventEditComponent.shake(resetFormState);
        break;
    }
  }

  #replaceEventToEditPoint = () => {
    replace(this.#eventEditComponent, this.#eventComponent);
    this.#changeMode();
    this.#mode = Mode.EDITING;
    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  #replaceEditPointToEvent = () => {
    this.#eventEditComponent.reset(this.#tripEvent);
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  }

  #handleFavoriteClick = () => {
    this.#changeData({ ...this.#tripEvent, favorite: !this.#tripEvent.favorite });
    this.#changeData(
      UserAction.UPDATE_EVENT,
      UpdateType.PATCH,
      { ...this.#tripEvent, favorite: !this.#tripEvent.favorite },
    );
  }

  #handleFormSubmit = (update) => {
    const isMinorUpdate =
      !isDatesEqual(this.#tripEvent.date.dataBeginEvent, update.date.dataBeginEvent) ||
      !isDatesEqual(this.#tripEvent.date.dataEndEvent, update.date.dataEndEvent) ||
      this.#tripEvent.basePrice !== update.basePrice;

    this.#changeData(
      UserAction.UPDATE_EVENT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
  }

  #handleDeleteClick = (event) => {
    this.#changeData(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      event,
    );
  }
}
