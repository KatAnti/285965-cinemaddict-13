import {FILMS_COUNT, RenderPosition} from './const.js';
import {render} from './utils/render.js';
import FooterStatistic from './view/footer-statistics.js';
import MainNavigation from './view/main-nav.js';
import UserRank from './view/user-rank.js';
import SortBy from './view/sorting.js';
import MainStatistic from './view/main-statistics.js';
import FilmsBoardPresenter from './presenter/films-board.js';
import {generateFilm} from './mock/film.js';
import {generateFilter} from "./mock/filter.js";
import {generateUserStats} from "./mock/user-stats.js";

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const userStats = generateUserStats(films);

const bodyElement = document.querySelector(`body`);
const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);
const footerElement = bodyElement.querySelector(`.footer`);

const filmsBoardPresenter = new FilmsBoardPresenter(mainElement);

render(headerElement, new UserRank(userStats), RenderPosition.BEFOREEND);
render(mainElement, new MainNavigation(filters), RenderPosition.BEFOREEND);
render(mainElement, new SortBy(), RenderPosition.BEFOREEND);
render(footerElement, new FooterStatistic(), RenderPosition.BEFOREEND);

filmsBoardPresenter.init(films);

render(mainElement, new MainStatistic(userStats), RenderPosition.BEFOREEND);

