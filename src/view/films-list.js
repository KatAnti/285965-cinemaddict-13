import AbstractView from '../view/abstract.js';

const createFilmsList = (title, isMain) => {
  return `<section class="films-list ${isMain ? `` : `films-list--extra`}">
    <h2 class="films-list__title ${isMain ? `visually-hidden` : ``}">${title}</h2>
    <div class="films-list__container">
    </div>
  </section>`;
};

class FilmsList extends AbstractView {
  constructor(isMain, title) {
    super();
    this._isMain = isMain;
    this._title = title;
  }

  getTemplate() {
    return createFilmsList(this._isMain, this._title);
  }
}

export default FilmsList;
