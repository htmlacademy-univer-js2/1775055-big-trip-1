import dayjs from 'dayjs';

const getRandomNumber = (firstNumber, secondNumber) => {
  const maxNumber = Math.max(firstNumber, secondNumber);
  const minNumber = Math.min(firstNumber, secondNumber);
  return Math.floor(minNumber + Math.random() * (maxNumber - minNumber + 1));
};

const getDiffDates = (dayOne, dayTwo) => {
  const diffDateUnix = Math.abs(dayOne - dayTwo);

  const days = Math.floor(diffDateUnix / (24 * 60 * 60 * 1000));

  const hours = Math.floor(diffDateUnix / (60 * 60 * 1000) - (24 * days));

  const minuts = diffDateUnix / (60 * 1000) - (days * 24 * 60) - (hours * 60);
  return { 'days': days, 'hours': hours, 'minuts': minuts, 'unix': diffDateUnix };
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const SortType = {
  DAY: {text: 'day', checked: true},
  TIME: {text: 'time', checked: false},
  PRICE: {text: 'price', checked: false},
};

const sortEventDate = (taskA, taskB) => {
  return dayjs(taskA.date.dataBeginEvent).diff(dayjs(taskB.date.dataBeginEvent));
};

const sortEventTime = (taskA, taskB) => {
  const timeOne = dayjs(taskA.date.dataEndEvent).diff(dayjs(taskA.date.dataBeginEvent));
  const timeTwo = dayjs(taskB.date.dataEndEvent).diff(dayjs(taskB.date.dataBeginEvent));
  return timeOne - timeTwo;
};

const sortEventPrice = (taskA, taskB) => {
  return taskA.allPrice - taskB.allPrice;
};



export { getRandomNumber, getDiffDates, updateItem, SortType, sortEventDate, sortEventTime, sortEventPrice };
