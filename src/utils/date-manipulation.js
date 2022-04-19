import dayjs from 'dayjs';

const getDiffDates = (dayOne, dayTwo) => {
  const diffDateUnix = Math.abs(dayjs(dayOne).diff(dayjs(dayTwo)));

  const days = Math.floor(diffDateUnix / (24 * 60 * 60 * 1000));

  const hours = Math.floor(diffDateUnix / (60 * 60 * 1000) - (24 * days));

  const minuts = diffDateUnix / (60 * 1000) - (days * 24 * 60) - (hours * 60);
  return { 'days': days, 'hours': hours, 'minuts': minuts, 'unix': diffDateUnix };
};

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');

export { getDiffDates, isDatesEqual };
