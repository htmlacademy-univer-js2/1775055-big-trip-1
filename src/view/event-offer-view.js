import {createElement} from '../render.js';

const createTripEventOffer = (offer) => {
  const { title, price } = offer;
  return `<li class="event__offer">
  <span class="event__offer-title">${title.text}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${price}</span>
</li>`;
};

export default class EventOffer {
  #element = null;
  #eventOffer = null;

  constructor(eventOffer) {
    this.#eventOffer = eventOffer;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createTripEventOffer(this.#eventOffer);
  }

  removeElement() {
    this.#element = null;
  }
}
