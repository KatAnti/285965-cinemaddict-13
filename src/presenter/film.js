import dayjs from 'dayjs';
import {render, remove, replace} from '../utils/render.js';
import Film from '../view/film-card.js';
import FilmPopup from '../view/popup.js';
import api from '../utils/api.js';
import CommentsModel from '../model/comments.js';
import {RenderPosition, PopupMode, UserAction, UpdateType} from '../const.js';
const ESCAPE = `Escape`;
const ESC = `Esc`;
const bodyElement = document.querySelector(`body`);
const mainElement = bodyElement.querySelector(`.main`);

class FilmPresenter {
  constructor(filmListContainer, changeData, changePopupMode) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changePopupMode = changePopupMode;

    this._popupComponent = null;
    this._filmComponent = null;
    this._popupMode = PopupMode.CLOSE;
    this._commentsModel = null;

    this._handlePosterClick = this._handlePosterClick.bind(this);
    this._handleTitleClick = this._handleTitleClick.bind(this);
    this._handleCommentsClick = this._handleCommentsClick.bind(this);
    this._handleClosePopupButtonClick = this._handleClosePopupButtonClick.bind(this);
    this._handleDeleteCommentButtonClick = this._handleDeleteCommentButtonClick.bind(this);
    this._handleSubmitCommentForm = this._handleSubmitCommentForm.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._handleFavouriteClick = this._handleFavouriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleFavouritePopupButtonClick = this._handleFavouritePopupButtonClick.bind(this);
    this._handleWatchedPopupButtonClick = this._handleWatchedPopupButtonClick.bind(this);
    this._handleWatchlistPopupButtonClick = this._handleWatchlistPopupButtonClick.bind(this);
  }

  init(film) {
    this._film = film;
    this._filmComponent = new Film(film);

    this._setCardEventHandlers();
    this._renderFilmCard();
  }

  update(newFilm) {
    const prevFilmComponent = this._filmComponent;
    const prevPopupComponent = this._popupComponent;

    this._film = newFilm;
    this._filmComponent = new Film(newFilm);

    this._setCardEventHandlers();

    replace(this._filmComponent, prevFilmComponent);
    if (this._popupMode === PopupMode.OPEN) {
      const scroll = prevPopupComponent.getElement().scrollTop;
      this.closePopup();
      this._openPopup(this._film);
      this._popupComponent.getElement().scrollTop = scroll;
    }

    remove(prevFilmComponent);
  }

  destroy() {
    remove(this._filmComponent);
  }

  closePopup() {
    if (this._popupMode !== PopupMode.CLOSE) {
      this._removePopup();
    }
  }

  _setCardEventHandlers() {
    this._filmComponent.setPosterClickHandler(this._handlePosterClick);
    this._filmComponent.setTitleClickHandler(this._handleTitleClick);
    this._filmComponent.setCommentsClickHandler(this._handleCommentsClick);

    this._filmComponent.setFavouriteClickHandler(this._handleFavouriteClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setWatchlistClickHandler(this._handleWatchlistClick);
  }

  _setPopupEventHandlers() {
    this._popupComponent.setCloseClickHandler(this._handleClosePopupButtonClick);
    this._popupComponent.setDeleteClickHandler(this._handleDeleteCommentButtonClick);
    this._popupComponent.setFormSubmitHandler(this._handleSubmitCommentForm);

    this._popupComponent.setFavouriteClickHandler(this._handleFavouritePopupButtonClick);
    this._popupComponent.setWatchedClickHandler(this._handleWatchedPopupButtonClick);
    this._popupComponent.setWatchlistClickHandler(this._handleWatchlistPopupButtonClick);
  }

  _removePopup() {
    mainElement.removeChild(this._popupComponent.getElement());
    remove(this._popupComponent);
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

  _loadComments(film) {
    return api.getComments(film).then((comments) => {
      const commentsModel = new CommentsModel();
      commentsModel.setComments(comments);
      return commentsModel;
    });
  }

  _openPopup(film) {
    this._loadComments(film).then((commentsModel) => {
      this._changePopupMode();
      this._commentsModel = commentsModel;
      this._popupComponent = new FilmPopup(film, this._commentsModel);
      this._setPopupEventHandlers();
      this._renderPopup();
      document.addEventListener(`keydown`, this._escKeyDownHandler);
      bodyElement.classList.add(`hide-overflow`);
      this._popupMode = PopupMode.OPEN;
    });
  }

  _renderPopup() {
    mainElement.appendChild(this._popupComponent.getElement());
  }

  _renderFilmCard() {
    render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
  }

  _handlePosterClick() {
    this._openPopup(this._film);
  }

  _handleTitleClick() {
    this._openPopup(this._film);
  }

  _handleCommentsClick() {
    this._openPopup(this._film);
  }

  _handleWatchlistPopupButtonClick(film) {
    this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, film);
  }

  _handleWatchedPopupButtonClick(film) {
    this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, film);
  }

  _handleFavouritePopupButtonClick(film) {
    this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, film);
  }

  _handleClosePopupButtonClick(film) {
    this._removePopup();
    this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, film);
  }

  _handleDeleteCommentButtonClick(film, comment) {
    const commentId = comment.id;
    const currentDeleteButton = comment.querySelector(`.film-details__comment-delete`);

    api.deleteComment(commentId).then(() => {
      this._commentsModel.deleteComment(UserAction.PATCH, commentId);
      this._changeData(UserAction.DELETE_COMMENT, UpdateType.PATCH, film);
      this._removePopup();
      this._openPopup(film);
    })
    .catch(() => {
      comment.classList.add(`shake`);
      currentDeleteButton.disabled = false;
      currentDeleteButton.innerText = `Delete`;
    });
  }

  _handleSubmitCommentForm(film, newComment, form) {
    api.addComment(newComment, film.id).then(() => {
      this._commentsModel.addComment(UserAction.PATCH, newComment);
      this._changeData(UserAction.ADD_COMMENT, UpdateType.PATCH, film);
      this._popupComponent.resetLocalComment();
      this._removePopup();
      this._openPopup(film);
    })
    .catch(() => {
      form.classList.add(`shake`);
      form.disabled = false;
    });
  }

  _handleFavouriteClick() {
    const newFilm = Object.assign(
        {},
        this._film,
        {
          isFavourite: !this._film.isFavourite
        }
    );
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        newFilm
    );
    if (this._popupMode === PopupMode.OPEN) {
      this._removePopup();
      this._openPopup(newFilm);
    }
  }

  _handleWatchedClick() {
    const newFilm = Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched,
          watchingDate: !this._film.isWatched ? dayjs() : null
        }
    );
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        newFilm
    );
    if (this._popupMode === PopupMode.OPEN) {
      this._removePopup();
      this._openPopup(newFilm);
    }
  }

  _handleWatchlistClick() {
    const newFilm = Object.assign(
        {},
        this._film,
        {
          isWatchlist: !this._film.isWatchlist
        }
    );
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        newFilm
    );
    if (this._popupMode === PopupMode.OPEN) {
      this._removePopup();
      this._openPopup(newFilm);
    }
  }
}

export default FilmPresenter;

