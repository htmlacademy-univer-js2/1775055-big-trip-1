import dayjs from 'dayjs';

const SortType = {
  DAY: { text: 'day', checked: true },
  TIME: { text: 'time', checked: false },
  PRICE: { text: 'price', checked: false },
};

const sortEventDate = (taskA, taskB) => dayjs(taskA.date.dataBeginEvent).diff(dayjs(taskB.date.dataBeginEvent));

const sortEventTime = (taskA, taskB) => {
  const timeOne = dayjs(taskA.date.dataEndEvent).diff(dayjs(taskA.date.dataBeginEvent));
  const timeTwo = dayjs(taskB.date.dataEndEvent).diff(dayjs(taskB.date.dataBeginEvent));
  return timeTwo - timeOne;
};

const sortEventPrice = (taskA, taskB) => taskB.basePrice - taskA.basePrice;

const sortStats = (taskA, taskB) => taskB[1] - taskA[1];

export { sortEventDate, sortEventTime, sortEventPrice, sortStats, SortType };
