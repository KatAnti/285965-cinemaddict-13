import AbstractView from '../view/abstract.js';
import {ScreenMode} from '../const.js';

const capitalizeWord = (word) => {
  return word[0].toUpperCase() + word.slice(1);
};

const createFilterItem = (filter, currentFilterType, viewType) => {
  const {type, name, count} = filter;

  return name === `all`
    ? `<a href="#${name}" class="main-navigation__item ${type === currentFilterType && viewType !== ScreenMode.STATS ? `main-navigation__item--active` : ``}">${capitalizeWord(name)} movies</a>`
    : `<a href="#${name}" class="main-navigation__item ${type === currentFilterType && viewType !== ScreenMode.STATS ? `main-navigation__item--active` : ``}">${capitalizeWord(name)} <span class="main-navigation__item-count">${count}</span></a>`;
};

const createFilters = (filterItems, currentFilterType, viewType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItem(filter, currentFilterType, viewType))
    .join(``);
  return `<div class="main-navigation__items">
        ${filterItemsTemplate}
      </div>`;
};

class Filters extends AbstractView {
  constructor(filterItems, currentFilterType, viewType) {
    super();
    this._filterItems = filterItems;
    this._currentFilterType = currentFilterType;
    this._viewType = viewType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilters(this._filterItems, this._currentFilterType, this._viewType);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    if (evt.target !== this.getElement()) {
      const href = evt.target.href ? evt.target.href : evt.target.closest(`a`).href;
      this._callback.filterTypeChange(href.slice(href.indexOf(`#`) + 1, href.length));
    }
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}

export default Filters;
