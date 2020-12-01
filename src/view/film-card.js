import dayjs from 'dayjs';
import {createElement, isPropertyActive} from "../utils.js";

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

class Film {
  constructor(film) {
    this._film = film;

    this._element = null;
  }

  getTemplate() {
    return createFilmCard(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default Film;
