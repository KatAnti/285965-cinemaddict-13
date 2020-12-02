import AbstractView from '../view/abstract.js';
import {FILMS_COUNT} from '../const.js';

const createFooterStatistics = () => {
  return `<section class="footer__statistics">
        <p>${FILMS_COUNT} movies inside</p>
      </section>`;
};

class FooterStatistic extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createFooterStatistics();
  }
}

export default FooterStatistic;
