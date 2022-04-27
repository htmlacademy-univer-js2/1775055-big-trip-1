import AbstractObservable from '../utils/abstract-observable.js';
import { generateAllOffers, generateCities, adaptToClient, createDataNewEvent, dataNewEvent } from '../utils/adapter.js';
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
      console.log(dataNewEvent);
    } catch(err) {
      this.#events = [];
      console.log('Не отработал');
    }

    this._notify(UpdateType.INIT);
  }

  get events() {
    return this.#events;
  }

  updateEvent = (updateType, update) => {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      update,
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addEvent = (updateType, update) => {
    this.#events = [
      update,
      ...this.#events,
    ];

    this._notify(updateType, update);
  }

  deleteEvents = (updateType, update) => {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
