import { generateEvents } from './mock/event.js';
import { getRandomNumber, getDiffDates } from './mock/utils';
import TripPresenter from './presentor/trip-presenter.js';
import dayjs from 'dayjs';

const eventsCount = 5;

const events = Array.from({ length: eventsCount }, generateEvents);

const siteNavigationElement = document.querySelector('.trip-controls__navigation');

const siteFilterElement = document.querySelector('.trip-controls__filters');

const tripEvents = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripEvents, siteNavigationElement, siteFilterElement);

tripPresenter.init(events);
const dateOne = new Date('' , '', events[0].time.arrayDurationFormat.days,events[0].time.arrayDurationFormat.hours, events[0].time.arrayDurationFormat.minuts);
const dateTwo = new Date('' , '', events[1].time.arrayDurationFormat.days,events[1].time.arrayDurationFormat.hours, events[1].time.arrayDurationFormat.minuts);
console.log(getDiffDates(dateOne, dateTwo));
const date1 = dayjs(events[0].date.dataEndEvent).diff(dayjs(events[0].date.dataBeginEvent));
const date2 = dayjs(events[1].date.dataEndEvent).diff(dayjs(events[1].date.dataBeginEvent));
console.log(dayjs(events[0].date.dataBeginEvent).diff(dayjs(events[1].date.dataBeginEvent)));

export const sortTaskUp = (taskA, taskB) => {
  return dayjs(taskA.date.dataBeginEvent).diff(dayjs(taskB.date.dataBeginEvent));
};
