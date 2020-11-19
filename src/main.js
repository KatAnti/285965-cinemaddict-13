import {createUserRank} from './view/user-rank.js';
import {createMainNav} from './view/main-nav.js';
import {createSorting} from './view/sorting.js';
import {createFilmCard} from './view/film-card.js';
import {createShowMoreButton} from './view/show-more-button.js';
import {createFilmsBoard} from './view/films-board.js';
import {createFilmPopup} from './view/popup.js';
import {createComments} from './view/comments.js';
import {createMainStatistics} from './view/main-statistics.js';
import {createFooterStatistics} from './view/footer-statistics.js';

const ALL_FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;
const bodyElement = document.querySelector(`body`);
const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);
const footerElement = bodyElement.querySelector(`.footer`);

const renderElement = (container, markup, position) => {
  container.insertAdjacentHTML(position, markup);
};

renderElement(headerElement, createUserRank(), `beforeEnd`);
renderElement(mainElement, createMainNav(), `beforeEnd`);
renderElement(mainElement, createSorting(), `beforeEnd`);
renderElement(mainElement, createFilmsBoard(), `beforeEnd`);
renderElement(mainElement, createMainStatistics(), `beforeEnd`);
renderElement(footerElement, createFooterStatistics(), `beforeEnd`);
renderElement(bodyElement, createFilmPopup(), `beforeEnd`);

const popup = bodyElement.querySelector(`.film-details`);
const commentsContainerElement = popup.querySelector(`.film-details__bottom-container`);
const filmsLists = mainElement.querySelectorAll(`.films-list`);
const mainStatisticElement = mainElement.querySelector(`.statistic`);

filmsLists.forEach((list) => {
  const container = list.querySelector(`.films-list__container`);
  const isExtra = list.classList.contains(`films-list--extra`);
  for (let i = 0; i < (isExtra ? EXTRA_FILMS_COUNT : ALL_FILMS_COUNT); i++) {
    renderElement(container, createFilmCard(), `beforeEnd`);
  }
  if (!isExtra) {
    renderElement(list, createShowMoreButton(), `beforeEnd`);
  }
});

renderElement(commentsContainerElement, createComments(), `beforeEnd`);

/* скрываю попап и статистику */
popup.classList.add(`visually-hidden`);
mainStatisticElement.classList.add(`visually-hidden`);

