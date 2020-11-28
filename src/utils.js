import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  return Math.floor(a + Math.random() * (b + 1 - a));
};

const getRandomItemsAsString = (array, amount = 1, separator) => {
  if (amount === 1) {
    return array[getRandomInteger(0, array.length - 1)];
  }

  let result = [];

  for (let i = 0; i < amount; i++) {
    result.push(array[getRandomInteger(0, array.length - 1)].trim());
  }

  result = separator ? Array.from(new Set(result)).join(`${separator} `) : Array.from(new Set(result)).join(`. `) + `.`;

  return result;
};

const isPropertyActive = (property) => {
  return property ? `film-card__controls-item--active` : ``;
};

const generateRandomDate = () => {
  const year = getRandomInteger(1960, dayjs().get(`year`));
  const month = getRandomInteger(0, dayjs().get(`month`));
  const day = getRandomInteger(1, dayjs().get(`date`));
  return dayjs().set(`date`, day).set(`month`, month).set(`year`, year).format(`DD MMMM YYYY`);
};

const generateCommentDate = () => {
  const year = getRandomInteger(2019, dayjs().get(`year`));
  const now = dayjs();
  const randomDate = dayjs(generateRandomDate()).set(`year`, year).format(`YYYY-MM-DD HH:mm`);
  const difference = now.get(`date`) - dayjs(randomDate).get(`date`);

  if (difference < 7 && difference > 0) {
    return `${difference} days ago`;
  } else if (difference === 0) {
    return `Today`;
  }

  return randomDate;
};

export {getRandomInteger, getRandomItemsAsString, isPropertyActive, generateRandomDate, generateCommentDate};
