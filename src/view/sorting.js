import AbstractView from '../view/abstract.js';
import {SortType} from '../const.js';

const createSorting = (currentSortType) => {
  return `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button ${currentSortType === SortType.DEFAULT ? `sort__button--active` : ``}">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.BY_DATE}"  class="sort__button ${currentSortType === SortType.BY_DATE ? `sort__button--active` : ``}">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortType.BY_RATING}" class="sort__button ${currentSortType === SortType.BY_RATING ? `sort__button--active` : ``}">Sort by rating</a></li>
    </ul>`;
};

class SortBy extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSorting(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }

  show() {
    this.getElement().classList.remove(`visually-hidden`);
  }

  hide() {
    this.getElement().classList.add(`visually-hidden`);
  }
}

export default SortBy;
