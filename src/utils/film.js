import dayjs from 'dayjs';

const isPropertyActive = (property) => {
  return property ? `film-card__controls-item--active` : ``;
};

const sortByDate = (prevFilm, nextFilm) => {
  return dayjs(nextFilm.releaseDate).diff(dayjs(prevFilm.releaseDate));
};

const sortByRating = (prevFilm, nextFilm) => {
  return nextFilm.rating - prevFilm.rating;
};

const sortByCommentsAmount = (prevFilm, nextFilm) => {
  return nextFilm.comments.length - prevFilm.comments.length;
};

const calculateDurationInHours = (minutes, isStatistic) => {
  if (minutes >= 60 && minutes % 60) {
    return isStatistic
      ? `${Math.floor(minutes / 60)} <span class="statistic__item-description">h</span> ${minutes % 60} <span class="statistic__item-description">m</span>`
      : `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  } else if (minutes >= 60 && !(minutes % 60)) {
    return isStatistic
      ? `${Math.floor(minutes / 60)} <span class="statistic__item-description">h</span>`
      : `${Math.floor(minutes / 60)}h`;
  }
  return isStatistic
    ? `${minutes} <span class="statistic__item-description">m</span>`
    : `${minutes}m`;
};

export {isPropertyActive, sortByDate, sortByRating, sortByCommentsAmount, calculateDurationInHours};
