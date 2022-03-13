import dayjs from 'dayjs';

let allOffersPrice = 0;

const randomNumber = (firstNumber, secondNumber) => {
  let maxNumber = Math.max(firstNumber,secondNumber);
  let minNumber = Math.min(firstNumber, secondNumber);
  return Math.floor(minNumber + Math.random() * (maxNumber - minNumber + 1));
};

const generateDate = () => {
  const maxDaysGag = 7;
  const daysGap = randomNumber(0, maxDaysGag);

  return dayjs().add(daysGap, 'day').toDate();
};

const generateOffers = () => {
  const offersTitleArray = ['Add luggage','Switch to comfort','Add meal','Choose seats','Travel by train'];
  const countOffers = randomNumber(0,5);
  const offersArray = [];
  for(let i = 0; i < countOffers; i++) {
    const elementTitleArray = randomNumber(0, offersTitleArray.length);
    const offerTitleArray = offersTitleArray[elementTitleArray];
    offersTitleArray.splice(elementTitleArray,1);

    const offer = {
      title: offerTitleArray,
      price: randomNumber(10,100)
    };
    allOffersPrice += offer.price;
    offersArray.push(offer);
  }

  return offersArray;
};


const typeRoutes = [{title: 'Taxi', img: 'img/icons/taxi.png'},{title: 'Bus', img: 'img/icons/bus.png'},{title: 'Drive', img: 'img/icons/drive.png'},{title: 'Check-in', img: 'img/icons/check-in.png'},{title: 'Flight', img: 'img/icons/flight.png'},{title: 'Restaurant', img: 'img/icons/restaurant.png'},{title: 'Sightseeing', img: 'img/icons/sightseeing.png'},{title: 'Train', img: 'img/icons/train.png'}];

const cityes = ['Paris', 'London', 'LA'];

export const generateRoute = () => {
  const time = null;
  const date = generateDate();
  const offers = generateOffers();
  const allPrice = allOffersPrice + randomNumber(10,30);
  const type = typeRoutes[randomNumber(0,7)];
  allOffersPrice = 0;
  return {
    date,
    type,
    city: cityes[randomNumber(0,2)],
    time,
    offers,
    description: null,
    allPrice,
    favorite: Boolean(randomNumber(0,1))
  };
};
