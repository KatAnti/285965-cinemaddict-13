import AbstractView from '../view/abstract.js';

const createMainNav = () => {
  return `<nav class="main-navigation">
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

class MainNavigation extends AbstractView {
  constructor(viewType) {
    super();

    this._viewType = viewType;
    this._statsClickHandler = this._statsClickHandler.bind(this);
  }

  getTemplate() {
    return createMainNav(this._viewType);
  }

  getStatsButton() {
    return this.getElement().querySelector(`.main-navigation__additional`);
  }

  _statsClickHandler(evt) {
    evt.preventDefault();
    this._callback.statsClick();
    this.getStatsButton().classList.add(`main-navigation__item--active`);
  }

  setStatsClickHandler(callback) {
    this._callback.statsClick = callback;
    this.getStatsButton().addEventListener(`click`, this._statsClickHandler);
  }
}

export default MainNavigation;
