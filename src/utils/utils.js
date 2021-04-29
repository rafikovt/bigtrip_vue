export const getOffers = (type, offers, checkedOffers) => {
  const offersForPoint = offers.find((offer) => offer.type == type).offers;

  offersForPoint.forEach((offer) => {
    offer.checked = checkedOffers.some((elem) => elem.title === offer.title);
  });

  return offersForPoint;
};
