import dayjs from 'dayjs';
import AbstractView from './abstract-view.js';

const createTripEventOffer = (offer) => {
  const { title, price } = offer;
  return `<li class="event__offer">
  <span class="event__offer-title">${title.text}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${price}</span>
</li>`;
};

const createTripEvent = (event) => {
  const { date, type, city,allPrice, favorite, time } = event;

  const dataDayMonth = dayjs(date.dataBeginEvent).format('D MMM');
  let offersView = '';

  if(type.currentType.selectedOffer) {
    type.currentType.selectedOffer.forEach((offer) => {
      const offerCurrent = createTripEventOffer(offer);
      offersView += offerCurrent;
    });
  }

  let favoriteClass = '';
  const title = type.currentType.title;
  const img = type.currentType.img;

  if (favorite === true) {
    favoriteClass = 'event__favorite-btn--active';
  }

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="2019-03-18">${dataDayMonth}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="${img}" alt="Event type icon">
    </div>
    <h3 class="event__title">${title} ${city.currentCity.titleCity}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">${time.startTime}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T11:00">${time.endTime}</time>
      </p>
      <p class="event__duration">${time.duration}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${allPrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${offersView}
    </ul>
    <button class="event__favorite-btn ${favoriteClass}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};

export default class EventView extends AbstractView {
  #events = null;

  constructor(event) {
    super();
    this.#events = event;
  }

  get template() {
    return createTripEvent(this.#events);
  }

  setClickRollupHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }
}
