import FilmsBoard from '../view/films-board.js';
import NoFilms from '../view/no-films.js';
import FilmsList from '../view/films-list.js';
import ButtonShowMore from '../view/show-more-button.js';
import FilmPresenter from '../presenter/film.js';
import FilterPresenter from './filter.js';
import SortBy from '../view/sorting.js';
import FooterStatistic from '../view/footer-statistics.js';
import UserRank from '../view/user-rank.js';
import MainStatistic from '../view/main-statistics.js';
import filter from "../utils/filters.js";
import {generateUserStats} from "../mock/user-stats.js";
import {ListsTitles, ListsType, RenderPosition, SortType, UserAction, UpdateType} from '../const.js';
import {render, remove} from '../utils/render.js';
import {sortByDate, sortByRating, sortByCommentsAmount} from '../utils/film.js';

const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_COUNT = 2;


class FilmsBoardPresenter {
  constructor(boardContainer, filmsModel, comentsModel, filterModel) {
    this._boardFilms = null;
    this._filters = null;
    this._userStats = null;
    this._filmsModel = filmsModel;
    this._comentsModel = comentsModel;
    this._filterModel = filterModel;
    this._boardContainer = boardContainer;
    this._boardContainerHeader = boardContainer.querySelector(`.header`);
    this._boardContainerMain = boardContainer.querySelector(`.main`);
    this._boardContainerFooter = boardContainer.querySelector(`.footer`);
    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
    this._filmPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._sortComponent = null;
    this._showMoreButtonComponent = null;

    this._userRankComponent = null;
    this._filmBoardComponent = new FilmsBoard();
    this._mainNavComponent = null;
    this._noFilmsComponent = new NoFilms();
    this._mainListComponent = new FilmsList(ListsTitles.MAIN, ListsType.MAIN);
    this._topListComponent = new FilmsList(ListsTitles.TOP, ListsType.ADDITIONAL);
    this._commentedListComponent = new FilmsList(ListsTitles.MOST_COMMENTED, ListsType.ADDITIONAL);
    this._footerStatsComponent = new FooterStatistic();
    this._filterPresenter = new FilterPresenter(this._boardContainerMain, this._filterModel, this._filmsModel);
    this._mainStatsComponent = null;

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handlePopupModeChange = this._handlePopupModeChange.bind(this);
  }

  init() {
    this._filterPresenter.init();
    this._userStats = generateUserStats(this._filmsModel.getFilms());
    render(this._boardContainerMain, this._filmBoardComponent, RenderPosition.BEFOREEND);
    render(this._filmBoardComponent, this._mainListComponent, RenderPosition.BEFOREEND);
    render(this._filmBoardComponent, this._topListComponent, RenderPosition.BEFOREEND);
    render(this._filmBoardComponent, this._commentedListComponent, RenderPosition.BEFOREEND);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._comentsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderBoard();
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[filterType](films);
    switch (this._currentSortType) {
      case SortType.BY_DATE:
        return filtredFilms.sort(sortByDate);
      case SortType.BY_RATING:
        return filtredFilms.sort(sortByRating);
    }

    return filtredFilms;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._filmsModel.updateFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, update) {
    switch (updateType) {
      case UpdateType.COMMENTS:
        break;
      case UpdateType.PATCH:
        this._updateCurrentFilm(update);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _updateCurrentFilm(newFilm) {
    if (this._filmPresenter[newFilm.id]) {
      this._filmPresenter[newFilm.id].forEach((presenter) => {
        presenter.update(newFilm);
      });
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard();
    this._renderBoard();
  }

  _handlePopupModeChange() {
    Object.values(this._filmPresenter).forEach((presenters) => {
      presenters.forEach((presenter) => {
        presenter.closePopup();
      });
    });
  }

  _renderFilm(film, container) {
    const filmPresenter = new FilmPresenter(container, this._handleViewAction, this._handlePopupModeChange, this._comentsModel);
    filmPresenter.init(film);
    if (!this._filmPresenter[film.id]) {
      this._filmPresenter[film.id] = [filmPresenter];
    } else {
      this._filmPresenter[film.id].push(filmPresenter);
    }
  }

  _handleShowMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmsCount + FILMS_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmsCount, newRenderedFilmCount);

    this._renderFilms(films);
    this._renderedFilmsCount = newRenderedFilmCount;

    if (this._renderedFilmsCount >= filmCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ButtonShowMore();
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);

    render(this._mainListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _renderFilms(films) {
    films.forEach((film) => {
      this._renderFilm(film, this._mainListComponent.getContainer());
    });
  }

  _renderTopFilms() {
    const topFilms = this._filmsModel.getFilms().slice().sort(sortByRating);
    topFilms.slice(0, Math.min(topFilms.length, EXTRA_FILMS_COUNT)).forEach((film) => {
      this._renderFilm(film, this._topListComponent.getContainer());
    });
  }

  _renderCommentedFilms() {
    const commentedFilms = this._filmsModel.getFilms().slice().sort(sortByCommentsAmount);
    commentedFilms.slice(0, Math.min(commentedFilms.length, EXTRA_FILMS_COUNT)).forEach((film) => {
      this._renderFilm(film, this._commentedListComponent.getContainer());
    });
  }

  _renderUserRank() {
    this._userRankComponent = new UserRank(this._userStats);
    render(this._boardContainerHeader, this._userRankComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortBy(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._boardContainerMain, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderToplList() {
    this._renderTopFilms();
  }

  _renderCommentedlList() {
    this._renderCommentedFilms();
  }

  _renderMainStats() {
    this._mainStatsComponent = new MainStatistic(this._userStats);
    render(this._boardContainerMain, this._mainStatsComponent, RenderPosition.BEFOREEND);
  }

  _renderFooterStats() {
    render(this._boardContainerFooter, this._footerStatsComponent, RenderPosition.BEFOREEND);
  }

  _clearBoard({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    Object.values(this._filmPresenter).forEach((presenters) => {
      presenters.forEach((presenter) => {
        presenter.destroy();
      });
    });
    this._filmPresenter = {};

    remove(this._userRankComponent);
    remove(this._noFilmsComponent);
    remove(this._showMoreButtonComponent);
    remove(this._sortComponent);
    remove(this._footerStatsComponent);
    remove(this._mainStatsComponent);

    if (resetRenderedFilmCount) {
      this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderBoard() {
    const films = this._getFilms();
    const filmCount = films.length;
    if (filmCount === 0) {
      this.__renderNoFilms();
      return;
    }

    this._renderUserRank();
    this._renderSort();
    this._renderToplList();
    this._renderCommentedlList();
    this._renderFooterStats();
    this._renderMainStats();

    this._renderFilms(films.slice(0, Math.min(filmCount, this._renderedFilmsCount)));

    if (filmCount > this._renderedFilmsCount) {
      this._renderShowMoreButton();
    }
  }

  _renderNoFilms() {
    render(this._boardContainerMain, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

}

export default FilmsBoardPresenter;
