import AbstractView from './abstract-view.js';
import { MenuItem } from '../const.js';

const createTripMenu = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" id="${MenuItem.EVENTS}" data-value="${MenuItem.EVENTS}">Table</a>
  <a class="trip-tabs__btn" href="#" id="${MenuItem.STATISTICS}"  data-value="${MenuItem.STATISTICS}">Stats</a>
</nav>`
);

export default class MenuView extends AbstractView {
  get template() {
    return createTripMenu();
  }

  setMenuClickHandler = (callback) => {
    const linkContainer = document.querySelector('.trip-controls__trip-tabs');
    this._callback.menuClick = callback;
    linkContainer.addEventListener('click', this.#menuClickHandler);
  }

  #menuClickHandler = (evt) => {
    const currentLink = document.querySelector(`#${evt.target.dataset.value}`);
    const prevLink = document.querySelector('.trip-tabs__btn--active');
    if (prevLink !== currentLink) {
      currentLink.classList.add('trip-tabs__btn--active');
      prevLink.classList.remove('trip-tabs__btn--active');

      this._callback.menuClick(evt.target.dataset.value);
    }
  }
}
