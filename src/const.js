const SortType = {
  DEFAULT: `default`,
  BY_DATE: `by-date`,
  BY_RATING: `by-rating`
};

const ranks = new Map();
ranks.set(0, ``);
ranks.set(10, `Novice`);
ranks.set(20, `Fan`);
ranks.set(`more`, `Movie Buff`);

const RenderPosition = {
  AFTER: `after`,
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const ListsTitles = {
  MAIN: `All movies. Upcoming`,
  TOP: `Top rated`,
  MOST_COMMENTED: `Most commented`
};

const ListsType = {
  MAIN: `main`,
  ADDITIONAL: `additional`
};

const PopupMode = {
  OPEN: `OPEN`,
  CLOSE: `CLOSE`
};

const UserAction = {
  UPDATE_FILM: `UPDATE_FILM`,
  ADD_COMMENT: `ADD_COMMENT`,
  DELETE_COMMENT: `DELETE_COMMENT`
};

const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

const FilterType = {
  ALL: `all`,
  WATCHED: `watched`,
  WATCHLIST: `watchlist`,
  FAVORITES: `favorites`
};

const ScreenMode = {
  STATS: `STATS`,
  FILMS: `FILMS`
};

const TimePeriod = {
  ALL: `ALL`,
  TODAY: `TODAY`,
  WEEK: `WEEK`,
  MONTH: `MONTH`,
  YEAR: `YEAR`
};

export {ranks, ListsTitles, ListsType, RenderPosition, SortType, PopupMode, UserAction, UpdateType, FilterType, ScreenMode, TimePeriod};
