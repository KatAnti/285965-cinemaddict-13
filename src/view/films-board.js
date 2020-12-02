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
}

export default FilmsBoard;
