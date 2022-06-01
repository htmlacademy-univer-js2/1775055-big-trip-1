import dayjs from 'dayjs';
import { getDiffDates } from './date-manipulation.js';

let arrayCities = null;

let dataNewEvent = null;

const arrayTypes = [];

const typeRoutes = {
  ['taxi']: { img: 'img/icons/taxi.png', allOffer: [] },
  ['bus']: { img: 'img/icons/bus.png', allOffer: [] },
  ['drive']: { img: 'img/icons/drive.png', allOffer: [] },
  ['ship']: { img: 'img/icons/ship.png', allOffer: [] },
  ['check-in']: { img: 'img/icons/check-in.png', allOffer: [] },
  ['flight']: { img: 'img/icons/flight.png', allOffer: [] },
  ['restaurant']: { img: 'img/icons/restaurant.png', allOffer: [] },
  ['sightseeing']: { img: 'img/icons/sightseeing.png', allOffer: [] },
  ['train']: { img: 'img/icons/train.png', allOffer: [] }
};

const generateAllOffers = (alloffers) => {
  alloffers.forEach((allOffer) => {
    typeRoutes[allOffer.type].allOffer = allOffer.offers;
    const offer = {
      allOffer: typeRoutes[allOffer.type].allOffer,
      img: typeRoutes[allOffer.type].img,
      selectedOffers: [],
      title: allOffer.type
    };
    arrayTypes.push(offer);
  });
};


const generateCities = (cities) => {
  arrayCities = cities.map((city) => ({ ...city, isShowPhoto: false }));
};

const generateTime = (dataBeginEvent, dataEndEvent) => {
  const duration = getDiffDates(dataBeginEvent, dataEndEvent);
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
    'startTime': `${dayjs(dataBeginEvent).format('HH')}:${dayjs(dataBeginEvent).format('mm')}`,
    'endTime': `${dayjs(dataEndEvent).format('HH')}:${dayjs(dataEndEvent).format('mm')}`,
    'duration': durationFormat,
    'arrayDurationFormat': duration
  };
};

const adaptToClient = (event) => {
  const adaptedTask = {
    id: event.id,
    isCreateEvent: false,
    favorite: event.is_favorite,
    city: {
      currentCity: {
        description: event.destination.description,
        isShowPhoto: true,
        pictures: event.destination.pictures,
        name: event.destination.name
      },
      arrayCity: arrayCities
    },
    date: {
      dataBeginEvent: event.date_from,
      dataEndEvent: event.date_to
    },
    basePrice: event.base_price,
    allPrice: null,
    type: {
      currentType: {
        allOffer: typeRoutes[event.type].allOffer,
        img: typeRoutes[event.type].img,
        selectedOffers: event.offers,
        title: event.type
      },
      arrayType: arrayTypes
    },
    time: generateTime(event.date_from, event.date_to),
    isDisabled: false,
    isDeleting: false,
    isSaving: false,
  };
  return adaptedTask;
};

const createDataNewEvent = () => {
  dataNewEvent = {
    favorite: false,
    isCreateEvent: true,
    city: {
      currentCity: {
        description: 's',
        isShowPhoto: true,
        pictures: [],
        name: ''
      },
      arrayCity: arrayCities
    },
    date: {
      dataBeginEvent: dayjs(),
      dataEndEvent: dayjs().add(1, 'hour')
    },
    basePrice: 0,
    allPrice: null,
    type: {
      currentType: {
        allOffer: typeRoutes['taxi'].allOffer,
        img: typeRoutes['taxi'].img,
        selectedOffers: [],
        title: 'taxi'
      },
      arrayType: arrayTypes
    },
    time: generateTime(dayjs(), dayjs().add(1, 'hour')),
    isDisabled: false,
    isDeleting: false,
    isSaving: false,
  };
};


export { adaptToClient, generateAllOffers, generateCities, createDataNewEvent , dataNewEvent, generateTime };
