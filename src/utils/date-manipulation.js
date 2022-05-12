import dayjs from 'dayjs';

const getDiffDates = (dayOne, dayTwo) => {
  const diffDateUnix = Math.abs(dayjs(dayOne).diff(dayjs(dayTwo)));

  const days = Math.floor(diffDateUnix / (24 * 60 * 60 * 1000));

  const hours = Math.floor(diffDateUnix / (60 * 60 * 1000) - (24 * days));

  const minuts = Math.floor(diffDateUnix / (60 * 1000) - (days * 24 * 60) - (hours * 60));
  return { 'days': days, 'hours': hours, 'minuts': minuts, 'unix': diffDateUnix };
};

const getFormatDates = (unixTime) => {
  const days = Math.floor(unixTime / (24 * 60 * 60 * 1000));

  const hours = Math.floor(unixTime / (60 * 60 * 1000) - (24 * days));

  const minuts =Math.floor( unixTime / (60 * 1000) - (days * 24 * 60) - (hours * 60));

  let durationFormat = '';
  if (days !== 0) {
    durationFormat += `${(`0${days}`).slice(-2)}D ${(`0${hours}`).slice(-2)}H ${(`0${minuts}`).slice(-2)}M`;
  }
  else if (hours !== 0) {
    durationFormat += `${(`0${hours}`).slice(-2)}H ${(`0${minuts}`).slice(-2)}M`;
  }
  else {
    durationFormat += `${(`0${minuts}`).slice(-2)}M`;
  }

  return durationFormat;
};

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');

export { getDiffDates, isDatesEqual, getFormatDates };
