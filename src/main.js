import {FILMS_COUNT, ListsTitles, ListsType, RenderPosition} from './const.js';
import {render, remove} from './utils/render.js';
import AbstractView from './view/abstract.js';
import FilmsBoard from './view/films-board.js';
import NoFilms from './view/no-films.js';
import FilmsList from './view/films-list.js';
import Film from './view/film-card.js';
import ButtonShowMore from './view/show-more-button.js';
import FilmPopup from './view/popup.js';
import FooterStatistic from './view/footer-statistics.js';
import MainNavigation from './view/main-nav.js';
import UserRank from './view/user-rank.js';
import SortBy from './view/sorting.js';
import MainStatistic from './view/main-statistics.js';
import {generateFilm} from './mock/film.js';
import {generateFilter} from "./mock/filter.js";
import {generateUserStats} from "./mock/user-stats.js";

const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_COUNT = 2;
const ESCAPE = `Escape`;
const ESC = `Esc`;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const userStats = generateUserStats(films);

const bodyElement = document.querySelector(`body`);
const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);
const footerElement = bodyElement.querySelector(`.footer`);

const renderPopup = (film) => {
  const popupComponent = new FilmPopup(film);

  const removePopup = () => {
    mainElement.removeChild(popupComponent.getElement());
    popupComponent.removeElement();
    bodyElement.classList.remove(`hide-overflow`);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === ESCAPE || evt.key === ESC) {
      evt.preventDefault();
      removePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  mainElement.appendChild(popupComponent.getElement());
  document.addEventListener(`keydown`, onEscKeyDown);

  popupComponent.setCloseClickHandler(() => {
    removePopup();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
};

const renderFilm = (filmsList, film) => {
  const filmComponent = new Film(film);

  if (filmsList instanceof AbstractView) {
    filmsList = filmsList.getContainer();
  }

  const openPopup = () => {
    renderPopup(film);
    bodyElement.classList.add(`hide-overflow`);
  };

  render(filmsList, filmComponent, RenderPosition.BEFOREEND);

  filmComponent.setPosterClickHandler(() => {
    openPopup();
  });

  filmComponent.setTitleClickHandler(() => {
    openPopup();
  });

  filmComponent.setCommentsClickHandler(() => {
    openPopup();
  });
};

const renderFilmBoard = (boardContainer, boardFilms) => {
  const boardComponent = new FilmsBoard();
  const mainFilmsListComponent = new FilmsList(ListsTitles.MAIN, ListsType.MAIN);
  const topFilmsListComponent = new FilmsList(ListsTitles.TOP, ListsType.ADDITIONAL);
  const commentedFilmsListComponent = new FilmsList(ListsTitles.MOST_COMMENTED, ListsType.ADDITIONAL);

  const renderAdditionalList = (list) => {
    for (let i = 0; i < Math.min(boardFilms.length, EXTRA_FILMS_COUNT); i++) {
      renderFilm(list, boardFilms[i]);
    }
  };

  const renderMainList = () => {
    for (let i = 0; i < Math.min(boardFilms.length, FILMS_COUNT_PER_STEP); i++) {
      renderFilm(mainFilmsListComponent, boardFilms[i]);
    }

    if (films.length > FILMS_COUNT_PER_STEP) {
      let renderedFilmsCount = FILMS_COUNT_PER_STEP;
      const showMoreButtonComponent = new ButtonShowMore();

      render(mainFilmsListComponent, showMoreButtonComponent, RenderPosition.BEFOREEND);

      showMoreButtonComponent.setClickHandler(() => {
        films
          .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
          .forEach((film) => renderFilm(mainFilmsListComponent, film));

        renderedFilmsCount += FILMS_COUNT_PER_STEP;

        if (renderedFilmsCount >= films.length) {
          remove(showMoreButtonComponent);
        }
      });
    }
  };

  render(boardContainer, boardComponent, RenderPosition.BEFOREEND);

  if (boardFilms.length === 0) {
    render(boardContainer, new NoFilms(), RenderPosition.BEFOREEND);
    return;
  }

  render(boardComponent, mainFilmsListComponent, RenderPosition.BEFOREEND);
  render(boardComponent, topFilmsListComponent, RenderPosition.BEFOREEND);
  render(boardComponent, commentedFilmsListComponent, RenderPosition.BEFOREEND);

  renderMainList();
  renderAdditionalList(topFilmsListComponent);
  renderAdditionalList(commentedFilmsListComponent);
};


render(headerElement, new UserRank(userStats), RenderPosition.BEFOREEND);
render(mainElement, new MainNavigation(filters), RenderPosition.BEFOREEND);
render(mainElement, new SortBy(), RenderPosition.BEFOREEND);
renderFilmBoard(mainElement, films);
render(mainElement, new MainStatistic(userStats), RenderPosition.BEFOREEND);
render(footerElement, new FooterStatistic(), RenderPosition.BEFOREEND);
