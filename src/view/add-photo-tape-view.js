import AbstractView from './abstract-view.js';

const createTripPhoto = (photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`;

export default class TripPhoto extends AbstractView {
  #tripPhoto = null;

  constructor(tripPhoto) {
    super();
    this.#tripPhoto = tripPhoto;
  }

  get template() {
    return createTripPhoto(this.#tripPhoto);
  }
}