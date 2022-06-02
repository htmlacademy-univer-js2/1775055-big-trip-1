import AbstractObservable from '../utils/abstract-observable.js';
import { generateAllOffers, generateCities, adaptToClient, createDataNewEvent } from '../utils/adapter.js';
import { UpdateType } from '../const.js';

export default class EventsModel extends AbstractObservable {
  #apiService = null;
  #events = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  init = async () => {
    try {
      const offers = await this.#apiService.offers;
      generateAllOffers(offers);
      const cities = await this.#apiService.cities;
      generateCities(cities);
      const events = await this.#apiService.events;
      this.#events = events.map((event) => adaptToClient(event));
      createDataNewEvent();
    } catch (err) {
      this.#events = [];
      createDataNewEvent();
      throw new Error('Can\'t init event');
    }

    this._notify(UpdateType.INIT);
  }

  get events() {
    return this.#events;
  }

  updateEvent = async (updateType, update) => {
    let index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }
    try {
      const response = await this.#apiService.updateEvent(update);
      const updatedEvent = adaptToClient(response);
      index = this.#events.findIndex((event) => event.id === update.id);
      this.#events = [
        ...this.#events.slice(0, index),
        update,
        ...this.#events.slice(index + 1),
      ];

      this._notify(updateType, updatedEvent);
    } catch (err) {
      throw new Error('Can\'t update event');
    }
  }

  addEvent = async (updateType, update) => {
    try {
      const response = await this.#apiService.addEvent(update);
      const newEvent = adaptToClient(response);
      this.#events = [newEvent, ...this.#events];
      this._notify(updateType, newEvent);
    } catch(err) {
      throw new Error('Can\'t add event');
    }
  }

  deleteEvents = async (updateType, update) => {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    try {
      await this.#apiService.deleteEvent(update);
      this.#events = [
        ...this.#events.slice(0, index),
        ...this.#events.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete event');
    }
  }
}

