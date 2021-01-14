import {DESCRIPTION, TITLES, DIRECTORS, ACTORS, SCREENWRITERS, COUNTRIES, GENRES, POSTERS} from '../const.js';
import {getRandomInteger, getRandomItemsAsString} from '../utils/common.js';
import {generateRandomDate} from '../utils/film.js';
import commentsIds from '../utils/comment.js';

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);
const existingComments = [];

const generateFilm = () => {
  const COMENTS_COUNT = getRandomInteger(0, 5);
  const comments = [];
  for (let i = 0; i < COMENTS_COUNT; i++) {
    const randomId = getRandomInteger(0, commentsIds.length - 1);
    if (!existingComments.includes(randomId)) {
      comments.push(randomId);
      existingComments.push(randomId);
    }
  }
  const filmTitle = getRandomItemsAsString(TITLES);
  const generateDescription = getRandomItemsAsString(DESCRIPTION.split(`.`), getRandomInteger(1, DESCRIPTION.split(`.`).length));
  return {
    id: generateId(),
    title: filmTitle,
    originalTitle: `Original: ${filmTitle}`,
    poster: getRandomItemsAsString(POSTERS),
    description: generateDescription,
    rating: `${getRandomInteger(1, 9)}.${getRandomInteger(1, 9)}`,
    director: getRandomItemsAsString(DIRECTORS),
    actors: getRandomItemsAsString(ACTORS, getRandomInteger(1, 3), `,`),
    screenwriters: getRandomItemsAsString(SCREENWRITERS, getRandomInteger(1, 3), `,`),
    releaseDate: generateRandomDate(),
    duration: `${getRandomInteger(1, 4)}h ${getRandomInteger(1, 59)}m`,
    country: getRandomItemsAsString(COUNTRIES),
    genres: getRandomItemsAsString(GENRES, getRandomInteger(1, 3), `,`),
    ageRestriction: `${getRandomInteger(0, 18)}+`,
    comments,
    isWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavourite: Boolean(getRandomInteger(0, 1))
  };
};

export {generateFilm};
