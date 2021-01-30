import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import {TimePeriod, ranks} from '../const.js';

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);

const calculateRank = (watchedFilmsCount) => {
  for (const [key, value] of ranks) {
    if (key >= watchedFilmsCount) {
      return value;
    }
  }

  return ranks.get(`more`);
};

const calculateUserRank = (films) => {
  return {
    rank: calculateRank(films)
  };
};

const checkDate = (watchingDate, dateFrom) => {
  const dateTo = dayjs();
  if (
    dayjs(watchingDate).isSame(dateFrom, `day`) ||
    dayjs(watchingDate).isBetween(dateFrom, dateTo) ||
    dayjs(watchingDate).isSame(dateTo)
  ) {
    return true;
  }

  return false;
};

const getFilmesWatchedOnPeriod = (films, timePeriod) => {
  return films.filter((film) => {
    let isWatchedInTime = false;

    let dateFrom = dayjs();
    switch (timePeriod) {
      case TimePeriod.TODAY:
        dateFrom = dayjs();
        break;
      case TimePeriod.WEEK:
        const daysToFullWeek = 6;
        dateFrom = dayjs().subtract(daysToFullWeek, `day`);
        break;
      case TimePeriod.MONTH:
        dateFrom = dayjs().subtract(1, `month`);
        break;
      case TimePeriod.YEAR:
        dateFrom = dayjs().subtract(1, `year`);
        break;
    }

    if (timePeriod === TimePeriod.ALL
      && film.isWatched === true ||
      checkDate(film.watchingDate, dateFrom)
      && film.isWatched === true) {
      isWatchedInTime = true;
    }


    return isWatchedInTime;
  });
};

const countGenres = (films) => {
  return films.reduce((genres, currentFilm) => {
    currentFilm.genres.forEach((genre) => {
      if (!genres[genre]) {
        genres[genre] = 1;
      } else {
        genres[genre] = genres[genre] + 1;
      }
    });
    return genres;
  }, {});
};

const sortedGenres = (genresCount) => {
  return Object.keys(genresCount).sort((prevGenre, nextGenre) => {
    return genresCount[nextGenre] - genresCount[prevGenre];
  });
};

const getTimeWatching = (films) => {
  return films.reduce((time, currentFilm) => {
    return time + currentFilm.duration;
  }, 0);
};

export {calculateRank, getFilmesWatchedOnPeriod, countGenres, sortedGenres, getTimeWatching, calculateUserRank};
