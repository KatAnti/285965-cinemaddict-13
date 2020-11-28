import {FILMS_COUNT} from '../const.js';

const createFooterStatistics = () => {
  return `<section class="footer__statistics">
        <p>${FILMS_COUNT} movies inside</p>
      </section>`;
};

export {createFooterStatistics};
