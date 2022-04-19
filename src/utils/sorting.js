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
  return timeOne - timeTwo;
};

const sortEventPrice = (taskA, taskB) => taskA.allPrice - taskB.allPrice;

export { sortEventDate, sortEventTime, sortEventPrice, SortType };
