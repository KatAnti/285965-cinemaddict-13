import {FILMS_COUNT, COMMENTS_COUNT} from './const.js';
import FilmsBoardPresenter from './presenter/films-board.js';
import FilmsModel from './model/films.js';
import CommentsModel from './model/comments.js';
import FilterModel from "./model/filters.js";
import {generateFilm} from './mock/film.js';
import {generateComment} from './mock/comment.js';

const bodyElement = document.querySelector(`body`);

const comments = [];
for (let i = 0; i < COMMENTS_COUNT; i++) {
  comments.push(generateComment());
}
const films = new Array(FILMS_COUNT).fill().map(generateFilm);

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const filterModel = new FilterModel();
commentsModel.setComments(comments);
filmsModel.setFilms(films);
const filmsBoardPresenter = new FilmsBoardPresenter(bodyElement, filmsModel, commentsModel, filterModel);

filmsBoardPresenter.init();
