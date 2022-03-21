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
  return { 'days': days, 'hours': hours, 'minuts': minuts };
};

export { getRandomNumber, getDiffDates };
