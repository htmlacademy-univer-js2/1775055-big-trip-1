export const createTripEventOffer = (offers) => {
  const {title, price} = offers;

  return `<li class="event__offer">
  <span class="event__offer-title">${title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${price}</span>
</li>`;
};
