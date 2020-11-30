import {FILMS_COUNT, ListsTitles, RenderPosition} from './const.js';
import {render} from './utils.js';
import FilmsBoard from './view/films-board.js';
import NoFilms from './view/no-films.js';
import FilmsList from './view/films-list.js';
import Film from './view/film-card.js';
import ButtonShowMore from './view/show-more-button.js';
import FilmPopup from './view/popup.js';
import Comment from './view/comment.js';
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

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const userStats = generateUserStats(films);

const bodyElement = document.querySelector(`body`);
const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);
const footerElement = bodyElement.querySelector(`.footer`);

const renderPopup = (film) => {
  const popupComponent = new FilmPopup(film);
  const comentListElement = popupComponent.getElement().querySelector(`.film-details__comments-list`);
  const closePopupElement = popupComponent.getElement().querySelector(`.film-details__close-btn`);

  const renderComment = (commentsList, comment) => {
    const commentComponent = new Comment(comment);

    render(commentsList, commentComponent.getElement(), RenderPosition.BEFOREEND);
  };

  const removePopup = () => {
    mainElement.removeChild(popupComponent.getElement());
    popupComponent.removeElement();
    bodyElement.classList.remove(`hide-overflow`);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      removePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  mainElement.appendChild(popupComponent.getElement());
  document.addEventListener(`keydown`, onEscKeyDown);

  for (let i = 0; i < film.comments.length; i++) {
    renderComment(comentListElement, film.comments[i]);
  }

  closePopupElement.addEventListener(`click`, () => {
    removePopup();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
};

const renderFilm = (filmsList, film) => {
  const filmComponent = new Film(film);
  const imgElement = filmComponent.getElement().querySelector(`.film-card__poster`);
  const titleElement = filmComponent.getElement().querySelector(`.film-card__title`);
  const commentsElement = filmComponent.getElement().querySelector(`.film-card__comments`);

  const openPopup = () => {
    renderPopup(film);
    bodyElement.classList.add(`hide-overflow`);
  };

  render(filmsList, filmComponent.getElement(), RenderPosition.BEFOREEND);

  imgElement.addEventListener(`click`, () => {
    openPopup();
  });

  titleElement.addEventListener(`click`, () => {
    openPopup();
  });

  commentsElement.addEventListener(`click`, () => {
    openPopup();
  });
};

const renderFilmBoard = (boardContainer, boardFilms) => {
  const boardComponent = new FilmsBoard();
  const mainFilmsListComponent = new FilmsList(ListsTitles.main, `main`);
  const topFilmsListComponent = new FilmsList(ListsTitles.top);
  const commentedFilmsListComponent = new FilmsList(ListsTitles.mostCommented);

  const returnContainer = (list) => {
    return list.getElement().querySelector(`.films-list__container`);
  };

  const renderAdditionalList = (list) => {
    for (let i = 0; i < Math.min(boardFilms.length, EXTRA_FILMS_COUNT); i++) {
      renderFilm(returnContainer(list), boardFilms[i]);
    }
  };

  const renderMainList = () => {
    for (let i = 0; i < Math.min(boardFilms.length, FILMS_COUNT_PER_STEP); i++) {
      renderFilm(returnContainer(mainFilmsListComponent), boardFilms[i]);
    }

    if (films.length > FILMS_COUNT_PER_STEP) {
      let renderedFilmsCount = FILMS_COUNT_PER_STEP;
      const showMoreButtonComponent = new ButtonShowMore();

      render(mainFilmsListComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

      showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
        evt.preventDefault();
        films
          .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
          .forEach((film) => renderFilm(returnContainer(mainFilmsListComponent), film));

        renderedFilmsCount += FILMS_COUNT_PER_STEP;

        if (renderedFilmsCount >= films.length) {
          showMoreButtonComponent.getElement().remove();
          showMoreButtonComponent.removeElement();
        }
      });
    }
  };

  render(boardContainer, boardComponent.getElement(), RenderPosition.BEFOREEND);

  if (boardFilms.length === 0) {
    render(boardContainer, new NoFilms().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  render(boardComponent.getElement(), mainFilmsListComponent.getElement(), RenderPosition.BEFOREEND);
  render(boardComponent.getElement(), topFilmsListComponent.getElement(), RenderPosition.BEFOREEND);
  render(boardComponent.getElement(), commentedFilmsListComponent.getElement(), RenderPosition.BEFOREEND);

  renderMainList();
  renderAdditionalList(topFilmsListComponent);
  renderAdditionalList(commentedFilmsListComponent);
};


render(headerElement, new UserRank(userStats).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new MainNavigation(filters).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new SortBy().getElement(), RenderPosition.BEFOREEND);
renderFilmBoard(mainElement, films);
render(mainElement, new MainStatistic(userStats).getElement(), RenderPosition.BEFOREEND);
render(footerElement, new FooterStatistic().getElement(), RenderPosition.BEFOREEND);
