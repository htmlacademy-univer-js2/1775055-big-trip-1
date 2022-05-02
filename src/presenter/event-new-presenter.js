import EditPoint from '../view/edit-point-view.js';
import { nanoid } from 'nanoid';
import { UserAction, UpdateType } from '../const.js';
import { RenderPosition, render, remove } from '../render.js';

export default class EventNewPresenter {
  #eventListContainer = null;
  #changeData = null;
  #eventEditComponent = null;
  #tripEvent =null;
  constructor(eventListContainer, changeData) {
    this.#eventListContainer = eventListContainer;
    this.#changeData = changeData;
  }

  init = (tripEvent) => {
    this.#tripEvent = tripEvent;

    if (this.#eventEditComponent !== null) {
      return;
    }
    this.#eventEditComponent = new EditPoint(this.#tripEvent);

    this.#eventEditComponent.setClickRollupHandler(this.#handleDeleteClick);
    this.#eventEditComponent.setFormSubmitHadler(this.#handleFormSubmit);
    this.#eventEditComponent.setDeleteClickHandler(this.#handleDeleteClick);
    render(this.#eventListContainer, this.#eventEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  destroy = () => {
    if (this.#eventEditComponent === null) {
      return;
    }

    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;

    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }

  #handleDeleteClick = () => {
    this.destroy();
  }

  #handleFormSubmit = (event) => {
    this.#changeData(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      // Пока у нас нет сервера, который бы после сохранения
      // выдывал честный id задачи, нам нужно позаботиться об этом самим
      {id: nanoid(), ...event},
    );
    this.destroy();
  }
}
