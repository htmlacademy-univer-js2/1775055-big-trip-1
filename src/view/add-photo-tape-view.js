import {createElement} from '../render.js';

const createTripPhoto = (photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`;

export default class TripPhoto {
    #element = null;
    #tripPhoto = null;
  
    constructor(tripPhoto) {
      this.#tripPhoto = tripPhoto;
    }
  
    get element() {
      if (!this.#element) {
        this.#element = createElement(this.template);
      }
  
      return this.#element;
    }
  
    get template() {
      return createTripEditPoint(this.#tripPhoto);
    }
  
    removeElement() {
      this.#element = null;
    }
  }