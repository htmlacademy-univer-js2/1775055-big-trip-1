import AbstractView from './abstract-view.js';

const createTripListEvents = () => (
  `<ul class="trip-events__list">

  </ul>`
);

export default class ListEventView extends AbstractView {
  get template() {
    return createTripListEvents();
  }
}
