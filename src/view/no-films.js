import AbstractView from '../view/abstract.js';

const createNoFilmsMessage = () => {
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
};

class NoFilms extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createNoFilmsMessage(this._film);
  }
}

export default NoFilms;
