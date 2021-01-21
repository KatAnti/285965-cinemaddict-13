import Filters from "../view/filters.js";
import {render, replace, remove} from "../utils/render.js";
import filter from "../utils/filters.js";
import {FilterType, UpdateType, RenderPosition} from "../const.js";

class FilterPresenter {
  constructor(filterContainer, filterModel, filmsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._currentFilter = null;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new Filters(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  getContainer() {
    return this._filterComponent.getElement;
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return [
      {
        type: FilterType.ALL,
        name: `all`,
        count: filter[FilterType.ALL](films).length
      },
      {
        type: FilterType.WATCHED,
        name: `watched`,
        count: filter[FilterType.WATCHED](films).length
      },
      {
        type: FilterType.WATCHLIST,
        name: `watchlist`,
        count: filter[FilterType.WATCHLIST](films).length
      },
      {
        type: FilterType.FAVORITES,
        name: `favorites`,
        count: filter[FilterType.FAVORITES](films).length
      }
    ];
  }
}

export default FilterPresenter;
