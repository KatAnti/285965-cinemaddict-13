import FilmsBoard from '../view/films-board.js';
import NoFilms from '../view/no-films.js';
import FilmsList from '../view/films-list.js';
import ButtonShowMore from '../view/show-more-button.js';
import FilmPresenter from '../presenter/film.js';
import {ListsTitles, ListsType, RenderPosition} from '../const.js';
import {render, remove} from '../utils/render.js';
import {updateItem} from '../utils/common.js';

const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_COUNT = 2;

class FilmsBoardPresenter {
  constructor(boardContainer) {
    this._boardFilms = null;
    this._boardContainer = boardContainer;
    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
    this._filmPresenter = {};

    this._filmBoardComponent = new FilmsBoard();
    this._noFilmsComponent = new NoFilms();
    this._mainListComponent = new FilmsList(ListsTitles.MAIN, ListsType.MAIN);
    this._topListComponent = new FilmsList(ListsTitles.TOP, ListsType.ADDITIONAL);
    this._commentedListComponent = new FilmsList(ListsTitles.MOST_COMMENTED, ListsType.ADDITIONAL);
    this._showMoreButtonComponent = new ButtonShowMore();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();

    render(this._boardContainer, this._filmBoardComponent, RenderPosition.BEFOREEND);
    render(this._filmBoardComponent, this._mainListComponent, RenderPosition.BEFOREEND);
    render(this._filmBoardComponent, this._topListComponent, RenderPosition.BEFOREEND);
    render(this._filmBoardComponent, this._commentedListComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _handleFilmChange(updatedFilm) {
    this._boardFilms = updateItem(this._boardFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].forEach((film) => film.update(updatedFilm));
  }

  _renderFilm(film, container) {
    const filmPresenter = new FilmPresenter(container, this._handleFilmChange);
    filmPresenter.init(film);
    if (!this._filmPresenter[film.id]) {
      this._filmPresenter[film.id] = [filmPresenter];
    } else {
      this._filmPresenter[film.id].push(filmPresenter);
    }
    console.log(this._filmPresenter);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._mainListComponent.getContainer(), this._renderedFilmsCount, this._renderedFilmsCount + FILMS_COUNT_PER_STEP);
    this._renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this._renderedFilmsCount >= this._boardFilms.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._mainListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilms(container, from, to) {
    this._boardFilms.slice(from, to).forEach((film) => {
      this._renderFilm(film, container);
    });
  }

  _renderToplList() {
    this._renderFilms(this._topListComponent.getContainer(), 0, Math.min(this._boardFilms.length, EXTRA_FILMS_COUNT));
  }

  _renderCommentedlList() {
    this._renderFilms(this._commentedListComponent.getContainer(), 0, Math.min(this._boardFilms.length, EXTRA_FILMS_COUNT));
  }

  _renderMainList() {
    this._renderFilms(this._mainListComponent.getContainer(), 0, Math.min(this._boardFilms.length, FILMS_COUNT_PER_STEP));

    if (this._boardFilms.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderBoard() {
    if (this._boardFilms.length.length === 0) {
      this.__renderNoFilms();
      return;
    }

    this._renderMainList();
    this._renderCommentedlList();
    this._renderToplList();
  }

  _renderNoFilms() {
    render(this._boardContainer, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }
}

export default FilmsBoardPresenter;
