const ESCAPE = `Escape`;
const ESC = `Esc`;
import {RenderPosition} from '../const.js';
import {render, remove, replace} from '../utils/render.js';
import Film from '../view/film-card.js';
import FilmPopup from '../view/popup.js';

const bodyElement = document.querySelector(`body`);
const mainElement = bodyElement.querySelector(`.main`);

class FilmPresenter {
  constructor(filmListContainer, changeData) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;

    this._popupComponent = null;
    this._filmComponent = null;

    this._handlePosterClick = this._handlePosterClick.bind(this);
    this._handleTitleClick = this._handleTitleClick.bind(this);
    this._handleCommentsClick = this._handleCommentsClick.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._handleFavouriteClick = this._handleFavouriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
  }

  init(film) {
    this._film = film;
    this._filmComponent = new Film(film);
    this._popupComponent = new FilmPopup(film);

    this._setEventHandlers();
    this._renderFilmCard();
  }

  update(newFilm) {
    const prevFilmComponent = this._filmComponent;
    const prevPopupComponent = this._popupComponent;

    this._film = newFilm;
    this._filmComponent = new Film(newFilm);
    this._popupComponent = new FilmPopup(newFilm);

    this._setEventHandlers();

    if (this._filmListContainer.contains(prevFilmComponent.getElement())) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (mainElement.contains(prevPopupComponent.getElement())) {
      replace(this._popupComponent, prevPopupComponent);
    }

    remove(prevFilmComponent);
    remove(prevPopupComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._popupComponent);
  }

  _setEventHandlers() {
    this._filmComponent.setPosterClickHandler(this._handlePosterClick);
    this._filmComponent.setTitleClickHandler(this._handleTitleClick);
    this._filmComponent.setCommentsClickHandler(this._handleCommentsClick);

    this._filmComponent.setFavouriteClickHandler(this._handleFavouriteClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setWatchlistClickHandler(this._handleWatchlistClick);

    this._popupComponent.setFavouriteClickHandler(this._handleFavouriteClick);
    this._popupComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._popupComponent.setWatchlistClickHandler(this._handleWatchlistClick);

    this._popupComponent.setCloseClickHandler(this._handleCloseButtonClick);
  }

  _removePopup() {
    mainElement.removeChild(this._popupComponent.getElement());
    bodyElement.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === ESCAPE || evt.key === ESC) {
      evt.preventDefault();
      this._removePopup();
    }
  }

  _openPopup() {
    this._renderPopup();
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    bodyElement.classList.add(`hide-overflow`);
  }

  _renderPopup() {
    mainElement.appendChild(this._popupComponent.getElement());
  }

  _renderFilmCard() {
    render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
  }

  _handlePosterClick() {
    this._openPopup();
  }

  _handleTitleClick() {
    this._openPopup();
  }

  _handleCommentsClick() {
    this._openPopup();
  }

  _handleCloseButtonClick() {
    this._removePopup();
  }

  _handleFavouriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavourite: !this._film.isFavourite
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        )
    );
  }

  _handleWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatchlist: !this._film.isWatchlist
            }
        )
    );
  }
}

export default FilmPresenter;

