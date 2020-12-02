import dayjs from 'dayjs';
import AbstractView from '../view/abstract.js';
import {isPropertyActive} from '../utils/film.js';

const createFilmCard = (film) => {
  const mainGenre = film.genres.split(`,`)[0];
  const commentsAmount = `${film.comments.length} comments`;
  const shortDescription = film.description.length > 140 ? film.description.slice(0, 138) + `...` : film.description;
  const isFilmOnWatchlist = isPropertyActive(film.isWatchlist);
  const isFilmMarkedAsWatched = isPropertyActive(film.isWatched);
  const isFilmFavourite = isPropertyActive(film.isFavourite);

  return `<article class="film-card">
      <h3 class="film-card__title">${film.title}</h3>
      <p class="film-card__rating">${film.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${dayjs(film.releaseDate).get(`year`)}</span>
        <span class="film-card__duration">${film.duration}</span>
        <span class="film-card__genre">${mainGenre}</span>
      </p>
      <img src="${film.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${shortDescription}</p>
      <a class="film-card__comments">${commentsAmount}</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isFilmOnWatchlist}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isFilmMarkedAsWatched}" type="button">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFilmFavourite}" type="button">Mark as favorite</button>
      </div>
    </article>`;
};

class Film extends AbstractView {
  constructor(film) {
    super();

    this._film = film;
    this._posterClickHandler = this._posterClickHandler.bind(this);
    this._titleClickHandler = this._titleClickHandler.bind(this);
    this._commentsClickHandler = this._commentsClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCard(this._film);
  }

  _posterClickHandler(evt) {
    evt.preventDefault();
    this._callback.posterClick();
  }

  _titleClickHandler(evt) {
    evt.preventDefault();
    this._callback.titleClick();
  }

  _commentsClickHandler(evt) {
    evt.preventDefault();
    this._callback.commentsClick();
  }

  setPosterClickHandler(callback) {
    this._callback.posterClick = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._posterClickHandler);
  }

  setTitleClickHandler(callback) {
    this._callback.titleClick = callback;
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._titleClickHandler);
  }

  setCommentsClickHandler(callback) {
    this._callback.commentsClick = callback;
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._commentsClickHandler);
  }
}

export default Film;
