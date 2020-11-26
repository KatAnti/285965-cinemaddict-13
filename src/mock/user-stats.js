import {ranks} from '../const.js';

const calculateRank = (films) => {
  const watchedFilmsCount = films.filter((film) => film.isWatched).length;

  for (const [key, value] of ranks) {
    if (key >= watchedFilmsCount) {
      return value;
    }
  }

  return ranks.get(`more`);
};

const generateUserStats = (films) => {
  return {
    rank: calculateRank(films)
  };
};

export {generateUserStats};
