import AbstractView from '../view/abstract.js';

const capitalizeWord = (word) => {
  return word[0].toUpperCase() + word.slice(1);
};

const createFilterItem = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return name === `all`
    ? `<a href="#${name}" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}">${capitalizeWord(name)} movies</a>`
    : `<a href="#${name}" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}">${capitalizeWord(name)} <span class="main-navigation__item-count">${count}</span></a>`;
};

const createMainNav = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItem(filter, currentFilterType))
    .join(``);
  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

class MainNavigation extends AbstractView {
  constructor(filterItems, currentFilterType) {
    super();
    this._filterItems = filterItems;
    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createMainNav(this._filterItems, this._currentFilterType);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    let href = evt.target.href;
    if (!href) {
      href = evt.target.closest(`a`).href;
    }
    this._callback.filterTypeChange(href.slice(href.indexOf(`#`) + 1, href.length));
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}

export default MainNavigation;
