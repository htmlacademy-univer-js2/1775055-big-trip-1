import { typeEvent } from '../const.js';

export const moneyAllType = {
  [typeEvent.TAXI]: 0,
  [typeEvent.BUS]: 0,
  [typeEvent.DRIVE]: 0,
  [typeEvent.FLIGHT]: 0,
  [typeEvent.TRAIN]: 0,
  [typeEvent.SHIP]: 0,
  [typeEvent.RESTAURANT]: 0,
  [typeEvent.SIGHTSEEING]: 0,
  [typeEvent.CHECKIN]: 0,
};

export const countType = {
  [typeEvent.TAXI]: 0,
  [typeEvent.BUS]: 0,
  [typeEvent.DRIVE]: 0,
  [typeEvent.FLIGHT]: 0,
  [typeEvent.TRAIN]: 0,
  [typeEvent.SHIP]: 0,
  [typeEvent.RESTAURANT]: 0,
  [typeEvent.SIGHTSEEING]: 0,
  [typeEvent.CHECKIN]: 0,
};

export const timeDuration = {
  [typeEvent.TAXI]: 0,
  [typeEvent.BUS]: 0,
  [typeEvent.DRIVE]: 0,
  [typeEvent.FLIGHT]: 0,
  [typeEvent.TRAIN]: 0,
  [typeEvent.SHIP]: 0,
  [typeEvent.RESTAURANT]: 0,
  [typeEvent.SIGHTSEEING]: 0,
  [typeEvent.CHECKIN]: 0,
};

export const countingStats = (events) => {
  events.forEach((event) => {
    moneyAllType[event.type.currentType.title] += Number(event.basePrice);
    timeDuration[event.type.currentType.title] += event.time.arrayDurationFormat.unix;
    countType[event.type.currentType.title] += 1;
  });
};

export const clearStats = () => {
  const typeEventValue =  Object.values(typeEvent);
  typeEventValue.forEach((eventValue) => {
    moneyAllType[eventValue] = 0;
    timeDuration[eventValue] = 0;
    countType[eventValue] = 0;
  });
};
