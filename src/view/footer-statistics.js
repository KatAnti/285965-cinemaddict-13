import {createElement} from "../utils.js";
import {FILMS_COUNT} from '../const.js';

const createFooterStatistics = () => {
  return `<section class="footer__statistics">
        <p>${FILMS_COUNT} movies inside</p>
      </section>`;
};

class FooterStatistic {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFooterStatistics();
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

export default FooterStatistic;
