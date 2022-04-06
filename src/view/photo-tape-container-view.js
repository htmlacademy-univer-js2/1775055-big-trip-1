import AbstractView from './abstract-view.js';

const photoContainer = () => (
  `<div class="event__photos-container">
  <div class="event__photos-tape">

  </div>
</div>`
);

export default class PhotoContainer extends AbstractView {
  get template() {
    return photoContainer();
  }
}
