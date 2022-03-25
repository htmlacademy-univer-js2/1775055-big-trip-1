import {createElement} from '../render.js';

const createTripListEvents = () => (
  `<ul class="trip-events__list">

  </ul>`
);

export default class ListEventView {
  #element = null;

  get element() {
    if(!this.#element){
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createTripListEvents();
  }

  removeElement() {
    this.#element = null;
  }
}