import {FilterType} from '../const';

const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHED]: (films) => films.filter((film) => film.isWatched),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isWatchlist),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFavourite)
};

export default filter;
