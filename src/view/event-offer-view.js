import AbstractView from './abstract-view.js';

const createTripEventOffer = (offer) => {
  const { title, price } = offer;
  return `<li class="event__offer">
  <span class="event__offer-title">${title.text}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${price}</span>
</li>`;
};

export default class EventOffer extends AbstractView {
  #eventOffer = null;

  constructor(eventOffer) {
    super();
    this.#eventOffer = eventOffer;
  }

  get template() {
    return createTripEventOffer(this.#eventOffer);
  }
}
