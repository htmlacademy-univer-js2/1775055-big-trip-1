export const createTripEventOffer = (offer) => {
  const { title, price } = offer;
  return `<li class="event__offer">
  <span class="event__offer-title">${title.text}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${price}</span>
</li>`;
};

export const createOfferForEditAndNewPoint = (offer) => {
  const { title, price } = offer;
  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title.id}-1" type="checkbox" name="event-offer-${title.id}">
  <label class="event__offer-label" for="event-offer-${title.id}-1">
    <span class="event__offer-title">${title.text}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </label>
</div>`;
};
