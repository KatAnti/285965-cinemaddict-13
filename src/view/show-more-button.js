import AbstractView from '../view/abstract.js';

const createShowMoreButton = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

class ButtonShowMore extends AbstractView {
  constructor() {
    super();

    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createShowMoreButton();
  }

  _clickHandler(evt) {
    evt.preventDefault();

    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}

export default ButtonShowMore;
