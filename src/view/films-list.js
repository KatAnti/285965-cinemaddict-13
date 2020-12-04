import AbstractView from '../view/abstract.js';
import {ListsType} from '../const.js';

const createFilmsList = (title, type) => {
  return `<section class="films-list ${type === ListsType.ADDITIONAL ? `films-list--extra` : ``}">
    <h2 class="films-list__title ${type === ListsType.MAIN ? `visually-hidden` : ``}">${title}</h2>
    <div class="films-list__container"></div>
  </section>`;
};

class FilmsList extends AbstractView {
  constructor(title, type) {
    super();
    this._type = type;
    this._title = title;
  }

  getTemplate() {
    return createFilmsList(this._title, this._type);
  }

  getContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}

export default FilmsList;
