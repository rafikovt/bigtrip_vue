import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const addZeroToNumber = (number) => {
  return number < 10 ? `0${number}` : number;
};

export const getEventDuration = (diffInMs) => {
  const timeDuration = dayjs.duration(diffInMs);
  const days = timeDuration.days();
  const hours = timeDuration.hours();
  const minutes = timeDuration.minutes();

  return `${(days > 0 && addZeroToNumber(days) + `D`) || ``}
    ${((days > 0 || hours > 0) && addZeroToNumber(hours) + `H`) || ``}
    ${addZeroToNumber(minutes)}M`;
};

export const getDurationDays = (diffInMs) => {
  const timeDuration = dayjs.duration(diffInMs);
  const days = timeDuration.days();
  const hours = timeDuration.hours();

  return `${addZeroToNumber(days) + `D`}
    ${((days > 0 || hours > 0) && addZeroToNumber(hours) + `H`) || ``}`;
};

export const getOffers = (type, offers, checkedOffers) => {
  const offersForPoint = offers.find((offer) => offer.type == type).offers;

  offersForPoint.forEach((offer) => {
    offer.checked = checkedOffers.some((elem) => elem.title === offer.title);
  });

  return offersForPoint;
};

export const getTotalPrice = (events) => {
  let totalCoast = 0;
  const totalPrice = events.reduce((acc, event) => acc + +event.base_price, 0);
  const totalPriceOffers = events.reduce(
    (acc1, { offers }) =>
      acc1 + offers.reduce((acc, { price }) => acc + +price, 0),
    0
  );
  totalCoast = totalPrice + totalPriceOffers;
  return totalCoast;
};
