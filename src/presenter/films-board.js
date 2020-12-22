import FilmsBoard from '../view/films-board.js';
import NoFilms from '../view/no-films.js';
import FilmsList from '../view/films-list.js';
import ButtonShowMore from '../view/show-more-button.js';
import FilmPresenter from '../presenter/film.js';
import SortBy from '../view/sorting.js';
import FooterStatistic from '../view/footer-statistics.js';
import MainNavigation from '../view/main-nav.js';
import UserRank from '../view/user-rank.js';
import MainStatistic from '../view/main-statistics.js';
import {generateFilter} from "../mock/filter.js";
import {generateUserStats} from "../mock/user-stats.js";
import {ListsTitles, ListsType, RenderPosition, SortType} from '../const.js';
import {render, remove} from '../utils/render.js';
import {updateItem} from '../utils/common.js';
import {sortByDate, sortByRating, sortByCommentsAmount} from '../utils/film.js';

const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_COUNT = 2;


class FilmsBoardPresenter {
  constructor(boardContainer) {
    this._boardFilms = null;
    this._topFilms = null;
    this._commentedFilms = null;
    this._filters = null;
    this._userStats = null;
    this._boardContainer = boardContainer;
    this._boardContainerHeader = boardContainer.querySelector(`.header`);
    this._boardContainerMain = boardContainer.querySelector(`.main`);
    this._boardContainerFooter = boardContainer.querySelector(`.footer`);
    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
    this._filmPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._userRankComponent = null;
    this._filmBoardComponent = new FilmsBoard();
    this._mainNavComponent = null;
    this._sortComponent = new SortBy();
    this._noFilmsComponent = new NoFilms();
    this._mainListComponent = new FilmsList(ListsTitles.MAIN, ListsType.MAIN);
    this._topListComponent = new FilmsList(ListsTitles.TOP, ListsType.ADDITIONAL);
    this._commentedListComponent = new FilmsList(ListsTitles.MOST_COMMENTED, ListsType.ADDITIONAL);
    this._showMoreButtonComponent = new ButtonShowMore();
    this._footerStatsComponent = new FooterStatistic();
    this._mainStatsComponent = null;

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handlePopupModeChange = this._handlePopupModeChange.bind(this);
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();
    this._sourcedBoardFilms = boardFilms.slice();
    this._topFilms = boardFilms.slice().sort(sortByRating);
    this._commentedFilms = boardFilms.slice().sort(sortByCommentsAmount);
    this._filters = generateFilter(this._boardFilms);
    this._userStats = generateUserStats(this._boardFilms);

    this._renderUserRank(this._userStats);
    this._renderMainNav(this._filters);
    this._renderSort();
    this._renderFooterStats();
    render(this._boardContainerMain, this._filmBoardComponent, RenderPosition.BEFOREEND);
    render(this._filmBoardComponent, this._mainListComponent, RenderPosition.BEFOREEND);
    render(this._filmBoardComponent, this._topListComponent, RenderPosition.BEFOREEND);
    render(this._filmBoardComponent, this._commentedListComponent, RenderPosition.BEFOREEND);

    this._renderMainStats(this._userStats);
    this._renderBoard();
  }

  _handleFilmChange(updatedFilm) {
    this._boardFilms = updateItem(this._boardFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].forEach((film) => film.update(updatedFilm));
  }

  _sortTasks(sortType) {
    switch (sortType) {
      case SortType.BY_DATE:
        this._boardFilms.sort(sortByDate);
        break;
      case SortType.BY_RATING:
        this._boardFilms.sort(sortByRating);
        break;
      default:
        this._boardFilms = this._sourcedBoardFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _clearFilmList() {
    Object.values(this._filmPresenter).forEach((presenters) => {
      presenters.forEach((presenter) => {
        presenter.destroy();
      });
    });
    this._filmPresenter = {};
    this._renderedTaskCount = FILMS_COUNT_PER_STEP;
    remove(this._showMoreButtonComponent);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortTasks(sortType);
    this._clearFilmList();
    this._renderMainList();
    this._renderToplList();
    this._renderCommentedlList();
  }

  _handlePopupModeChange() {
    Object.values(this._filmPresenter).forEach((presenters) => {
      presenters.forEach((presenter) => {
        presenter.closePopup();
      });
    });
  }

  _renderFilm(film, container) {
    const filmPresenter = new FilmPresenter(container, this._handleFilmChange, this._handlePopupModeChange);
    filmPresenter.init(film);
    if (!this._filmPresenter[film.id]) {
      this._filmPresenter[film.id] = [filmPresenter];
    } else {
      this._filmPresenter[film.id].push(filmPresenter);
    }
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmsCount, this._renderedFilmsCount + FILMS_COUNT_PER_STEP);
    this._renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this._renderedFilmsCount >= this._boardFilms.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._mainListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilms(from, to) {
    this._boardFilms.slice(from, to).forEach((film) => {
      this._renderFilm(film, this._mainListComponent.getContainer());
    });
  }

  _renderTopFilms(from, to) {
    this._topFilms.slice(from, to).forEach((film) => {
      this._renderFilm(film, this._topListComponent.getContainer());
    });
  }

  _renderCommentedFilms(from, to) {
    this._commentedFilms.slice(from, to).forEach((film) => {
      this._renderFilm(film, this._commentedListComponent.getContainer());
    });
  }

  _renderUserRank(userStats) {
    this._userRankComponent = new UserRank(userStats);
    render(this._boardContainerHeader, this._userRankComponent, RenderPosition.BEFOREEND);
  }

  _renderMainNav(filters) {
    this._mainNavComponent = new MainNavigation(filters);
    render(this._boardContainerMain, this._mainNavComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    render(this._boardContainerMain, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderToplList() {
    this._renderTopFilms(0, Math.min(this._boardFilms.length, EXTRA_FILMS_COUNT));
  }

  _renderCommentedlList() {
    this._renderCommentedFilms(0, Math.min(this._boardFilms.length, EXTRA_FILMS_COUNT));
  }

  _renderMainList() {
    this._renderFilms(0, Math.min(this._boardFilms.length, FILMS_COUNT_PER_STEP));

    if (this._boardFilms.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderMainStats(userStats) {
    this._mainStatsComponent = new MainStatistic(userStats);
    render(this._boardContainerMain, this._mainStatsComponent, RenderPosition.BEFOREEND);
  }

  _renderFooterStats() {
    render(this._boardContainerFooter, this._footerStatsComponent, RenderPosition.BEFOREEND);
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
    render(this._boardContainerMain, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

}

export default FilmsBoardPresenter;
