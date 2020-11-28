import {FILMS_COUNT} from './const.js';
import {createUserRank} from './view/user-rank.js';
import {createMainNav} from './view/main-nav.js';
import {createSorting} from './view/sorting.js';
import {createFilmCard} from './view/film-card.js';
import {createShowMoreButton} from './view/show-more-button.js';
import {createFilmsBoard} from './view/films-board.js';
import {createFilmPopup} from './view/popup.js';
import {createMainStatistics} from './view/main-statistics.js';
import {createFooterStatistics} from './view/footer-statistics.js';
import {generateFilm} from './mock/film.js';
import {createComment} from './view/comment.js';
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

const renderElement = (container, markup, position) => {
  container.insertAdjacentHTML(position, markup);
};

renderElement(headerElement, createUserRank(userStats), `beforeEnd`);
renderElement(mainElement, createMainNav(filters), `beforeEnd`);
renderElement(mainElement, createSorting(), `beforeEnd`);
renderElement(mainElement, createFilmsBoard(), `beforeEnd`);
renderElement(mainElement, createMainStatistics(userStats), `beforeEnd`);
renderElement(footerElement, createFooterStatistics(), `beforeEnd`);
renderElement(bodyElement, createFilmPopup(films[0]), `beforeEnd`);

const popup = bodyElement.querySelector(`.film-details`);
const commentsListElement = popup.querySelector(`.film-details__comments-list`);
const filmsMainLists = mainElement.querySelector(`.films-list:first-child`);
const filmsExtraLists = mainElement.querySelectorAll(`.films-list--extra`);
const mainStatisticElement = mainElement.querySelector(`.statistic`);
const filmsMainListsContainer = filmsMainLists.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  renderElement(filmsMainListsContainer, createFilmCard(films[i]), `beforeEnd`);
}

if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;

  renderElement(filmsMainLists, createShowMoreButton(), `beforeEnd`);

  const showMoreButton = mainElement.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => renderElement(filmsMainListsContainer, createFilmCard(film), `beforeEnd`));

    renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

filmsExtraLists.forEach((list) => {
  const container = list.querySelector(`.films-list__container`);

  for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
    renderElement(container, createFilmCard(films[i]), `beforeEnd`);
  }
});

films[0].comments.forEach((comment) => {
  renderElement(commentsListElement, createComment(comment), `beforeEnd`);
});

/* скрываю попап и статистику */
popup.classList.add(`visually-hidden`);
mainStatisticElement.classList.add(`visually-hidden`);

