import AbstractView from '../view/abstract.js';

const createFilmsBoard = () => {
  return `<section class="films"></section>`;
};

class FilmsBoard extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createFilmsBoard();
  }

  show() {
    this.getElement().classList.remove(`visually-hidden`);
  }

  hide() {
    this.getElement().classList.add(`visually-hidden`);
  }
}

export default FilmsBoard;
