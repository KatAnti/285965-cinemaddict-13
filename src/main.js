import FilmsBoardPresenter from './presenter/films-board.js';
import FilmsModel from './model/films.js';
import FilterModel from './model/filters.js';
import api from './utils/api.js';
import {UpdateType} from './const.js';

const bodyElement = document.querySelector(`body`);
const filmsModel = new FilmsModel();
const filterModel = new FilterModel();

const filmsBoardPresenter = new FilmsBoardPresenter(bodyElement, filmsModel, filterModel, api);
filmsBoardPresenter.init();

api.getFilms().then((films) => {
  filmsModel.setFilms(UpdateType.INIT, films);
})
.catch(() => {
  filmsModel.setFilms(UpdateType.INIT, []);
});
