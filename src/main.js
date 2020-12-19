import {FILMS_COUNT, RenderPosition} from './const.js';
import FilmsBoardPresenter from './presenter/films-board.js';
import {generateFilm} from './mock/film.js';

const films = new Array(FILMS_COUNT).fill().map(generateFilm);

const bodyElement = document.querySelector(`body`);

const filmsBoardPresenter = new FilmsBoardPresenter(bodyElement);

filmsBoardPresenter.init(films);

