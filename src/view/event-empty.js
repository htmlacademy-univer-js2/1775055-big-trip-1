import {createElement} from '../render.js';

const createEventEmpty = () => (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
  
  export default class EventEmpty {
    #element = null;
  
    get element() {
      if(!this.#element){
        this.#element = createElement(this.template);
      }
  
      return this.#element;
    }
  
    get template() {
      return createEventEmpty();
    }
  
    removeElement() {
      this.#element = null;
    }
  }