const ESCAPE = `Escape`;
const ESC = `Esc`;
import {RenderPosition, PopupMode, UserAction, UpdateType} from '../const.js';
import {render, remove, replace} from '../utils/render.js';
import Film from '../view/film-card.js';
import FilmPopup from '../view/popup.js';

const bodyElement = document.querySelector(`body`);
const mainElement = bodyElement.querySelector(`.main`);

class FilmPresenter {
  constructor(filmListContainer, changeData, changePopupMode, commentsModel) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changePopupMode = changePopupMode;
    this._commentsModel = commentsModel;

    this._popupComponent = null;
    this._filmComponent = null;
    this._popupMode = PopupMode.CLOSE;

    this._handlePosterClick = this._handlePosterClick.bind(this);
    this._handleTitleClick = this._handleTitleClick.bind(this);
    this._handleCommentsClick = this._handleCommentsClick.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    this._handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);
    this._handleSubmitForm = this._handleSubmitForm.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._handleFavouriteClick = this._handleFavouriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
  }

  init(film) {
    this._film = film;
    this._filmComponent = new Film(film);
    this._popupComponent = new FilmPopup(film, this._getComments());

    this._setEventHandlers();
    this._renderFilmCard();
  }

  _getComments() {
    return this._commentsModel.getComments();
  }

  update(newFilm) {
    const prevFilmComponent = this._filmComponent;
    const prevPopupComponent = this._popupComponent;

    this._film = newFilm;
    this._filmComponent = new Film(newFilm);
    this._popupComponent = new FilmPopup(newFilm, this._getComments());

    this._setEventHandlers();

    replace(this._filmComponent, prevFilmComponent);
    if (this._popupMode === PopupMode.OPEN) {
      let scroll = prevPopupComponent.getElement().scrollTop;
      replace(this._popupComponent, prevPopupComponent);
      this._popupComponent.getElement().scrollTop = scroll;
    }

    remove(prevFilmComponent);
    remove(prevPopupComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._popupComponent);
  }

  closePopup() {
    if (this._popupMode !== PopupMode.CLOSE) {
      this._removePopup();
    }
  }

  _setEventHandlers() {
    this._filmComponent.setPosterClickHandler(this._handlePosterClick);
    this._filmComponent.setTitleClickHandler(this._handleTitleClick);
    this._filmComponent.setCommentsClickHandler(this._handleCommentsClick);

    this._filmComponent.setFavouriteClickHandler(this._handleFavouriteClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setWatchlistClickHandler(this._handleWatchlistClick);

    this._popupComponent.setCloseClickHandler(this._handleCloseButtonClick);
    this._popupComponent.setDeleteClickHandler(this._handleDeleteButtonClick);
    this._popupComponent.setFormSubmitHandler(this._handleSubmitForm);
  }

  _removePopup() {
    mainElement.removeChild(this._popupComponent.getElement());
    bodyElement.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._popupMode = PopupMode.CLOSE;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === ESCAPE || evt.key === ESC) {
      evt.preventDefault();
      this._removePopup();
    }
  }

  _openPopup() {
    this._changePopupMode();
    this._renderPopup();
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    bodyElement.classList.add(`hide-overflow`);
    this._popupMode = PopupMode.OPEN;
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

  _handleCloseButtonClick(film) {
    this._removePopup();
    this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, film);
  }

  _handleDeleteButtonClick(film, comment) {
    this._commentsModel.deleteComment(UpdateType.COMMENTS, comment);
    this._changeData(UserAction.DELETE_COMMENT, UpdateType.PATCH, film);
  }

  _handleSubmitForm(film, comment) {
    this._commentsModel.addComment(UpdateType.COMMENTS, comment);
    this._changeData(UserAction.ADD_COMMENT, UpdateType.PATCH, film);
  }

  _handleFavouriteClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
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
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
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
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
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

