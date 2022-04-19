import { FilterType } from '../const';
import dayjs from 'dayjs';

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => dayjs().isBefore(dayjs(event.date.dataBeginEvent))),
  [FilterType.PAST]: (events) => events.filter((event) => dayjs().isAfter(dayjs(event.date.dataBeginEvent))),
};
