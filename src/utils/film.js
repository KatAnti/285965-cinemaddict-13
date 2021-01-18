import dayjs from 'dayjs';
import {getRandomInteger} from './common.js';

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

  if (year === now.get(`year`) && difference < 7 && difference > 0) {
    return `${difference} days ago`;
  } else if (year === now.get(`year`) && difference === 0) {
    return `Today`;
  }

  return randomDate;
};

const sortByDate = (prevFilm, nextFilm) => {
  return dayjs(nextFilm.releaseDate).diff(dayjs(prevFilm.releaseDate));
};

const sortByRating = (prevFilm, nextFilm) => {
  return nextFilm.rating - prevFilm.rating;
};

const sortByCommentsAmount = (prevFilm, nextFilm) => {
  return nextFilm.comments.getComments().length - prevFilm.comments.getComments().length;
};

export {isPropertyActive, generateRandomDate, generateCommentDate, sortByDate, sortByRating, sortByCommentsAmount};
