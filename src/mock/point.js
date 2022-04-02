/* eslint-disable no-unused-vars */
import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import { getRandomNumber, getDiffDates } from './utils.js';

let allOffersPrice = 0;

const typeRoutes = [{ title: 'Taxi', img: 'img/icons/taxi.png' }, { title: 'Bus', img: 'img/icons/bus.png' }, { title: 'Drive', img: 'img/icons/drive.png' }, { title: 'Check-in', img: 'img/icons/check-in.png' }, { title: 'Flight', img: 'img/icons/flight.png' }, { title: 'Restaurant', img: 'img/icons/restaurant.png' }, { title: 'Sightseeing', img: 'img/icons/sightseeing.png' }, { title: 'Train', img: 'img/icons/train.png' }];

const cityes = ['Amsterdam', 'Geneva', 'Chamonix'];


const generateDate = () => {
  const maxDaysGag = 7;
  const daysGap = getRandomNumber(0, maxDaysGag);
  const daysAddition = daysGap + getRandomNumber(0, 2);
  const startHoursAddition = getRandomNumber(1, 6);
  const endHoursAddition = getRandomNumber(startHoursAddition, startHoursAddition + 10);
  const startMinutesAddition = getRandomNumber(0, 59);
  const endMinutesAddition = getRandomNumber(startMinutesAddition, startMinutesAddition + 59);
  return {
    'dataBeginEvent': dayjs().add(daysGap, 'day').add(startHoursAddition, 'hour').add(startMinutesAddition, 'minute').toDate(),
    'dataEndEvent': dayjs().add(daysAddition, 'day').add(endHoursAddition, 'hour').add(endMinutesAddition, 'minute').toDate()
  };
};

const generateTime = (date) => {
  const dateBegin = new Date('', dayjs(date.dataBeginEvent).format('M'), dayjs(date.dataBeginEvent).format('D'), dayjs(date.dataBeginEvent).format('H'), dayjs(date.dataBeginEvent).format('m'));
  const dateEnd = new Date('', dayjs(date.dataEndEvent).format('M'), dayjs(date.dataEndEvent).format('D'), dayjs(date.dataEndEvent).format('H'), dayjs(date.dataEndEvent).format('m'));
  const duration = getDiffDates(dateBegin, dateEnd);
  let durationFormat = '';
  if (duration.days !== 0) {
    durationFormat += `${(`0${duration.days}`).slice(-2)}D ${(`0${duration.hours}`).slice(-2)}H ${(`0${duration.minuts}`).slice(-2)}M`;
  }
  else if (duration.hours !== 0) {
    durationFormat += `${(`0${duration.hours}`).slice(-2)}H ${(`0${duration.minuts}`).slice(-2)}M`;
  }
  else {
    durationFormat += `${(`0${duration.minuts}`).slice(-2)}M`;
  }

  return {
    'startTime': `${dayjs(date.dataBeginEvent).format('HH')}:${dayjs(date.dataBeginEvent).format('mm')}`,
    'endTime': `${dayjs(date.dataEndEvent).format('HH')}:${dayjs(date.dataEndEvent).format('mm')}`,
    'duration': durationFormat
  };
};

const generateDescription = () => {
  const descriptionArray = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'.split('.');
  const countDescription = getRandomNumber(1, descriptionArray.length);
  let description = '';
  for (let i = 0; i < countDescription; i++) {
    const elementNumber = getRandomNumber(0, descriptionArray.length - 1);
    const descriptionArrayElement = descriptionArray[elementNumber];
    descriptionArray.splice(elementNumber, 1);
    description += descriptionArrayElement;
  }

  return description;
};

const generateOffers = () => {
  const offersTitleArray = [{ 'text': 'Add luggage', 'id': 'luggage' }, { 'text': 'Switch to comfort', 'id': 'comfort' }, { 'text': 'Add meal', 'id': 'meal' }, { 'text': 'Choose seats', 'id': 'seats' }, { 'text': 'Travel by train', 'id': 'train' }];
  const countOffers = getRandomNumber(0, 5);
  const offersArray = [];
  for (let i = 0; i < countOffers; i++) {
    const numberElement = getRandomNumber(0, offersTitleArray.length - 1);
    const offerTitleArray = offersTitleArray[numberElement];
    offersTitleArray.splice(numberElement, 1);

    const offer = {
      title: offerTitleArray,
      price: getRandomNumber(10, 100)
    };
    allOffersPrice += offer.price;
    offersArray.push(offer);
  }

  return offersArray;
};

const generatePhoto = () => {
  const photos = [];
  let numberPhoto = 0;
  const countPhotos = getRandomNumber(3, 6);
  for (let i = 0; i < countPhotos; i++) {
    numberPhoto += getRandomNumber(1, 10);
    photos.push(`http://picsum.photos/248/152?r=${numberPhoto}`);
  }

  return photos;
};

const generateRoute = () => {
  const date = generateDate();
  const time = generateTime(date);
  const offers = generateOffers();
  const allPrice = allOffersPrice + getRandomNumber(10, 30);
  const type = typeRoutes[getRandomNumber(0, 7)];
  allOffersPrice = 0;
  return {
    id: nanoid(),
    date,
    type,
    city: cityes[getRandomNumber(0, 2)],
    time,
    offers,
    description: generateDescription(),
    allPrice,
    favorite: Boolean(getRandomNumber(0, 1)),
    photos: generatePhoto()
  };
};

export { generateRoute };
