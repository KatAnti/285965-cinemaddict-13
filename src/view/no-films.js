import {createElement} from "../utils.js";

const createNoFilmsMessage = () => {
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
};

class NoFilms {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoFilmsMessage(this._film);
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

export default NoFilms;
