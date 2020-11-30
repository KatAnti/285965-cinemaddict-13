import {createElement} from "../utils.js";

const createFilmsList = (title, isMain) => {
  return `<section class="films-list ${isMain ? `` : `films-list--extra`}">
    <h2 class="films-list__title ${isMain ? `visually-hidden` : ``}">${title}</h2>
    <div class="films-list__container">
    </div>
  </section>`;
};

class FilmsList {
  constructor(isMain, title) {
    this._isMain = isMain;
    this._title = title;
    this._element = null;
  }

  getTemplate() {
    return createFilmsList(this._isMain, this._title);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default FilmsList;
