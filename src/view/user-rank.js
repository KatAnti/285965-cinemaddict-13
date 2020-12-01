import {createElement} from "../utils.js";

const createUserRank = (user) => {
  const {rank} = user;
  return `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
};

class UserRank {
  constructor(user) {
    this._user = user;
    this._element = null;
  }

  getTemplate() {
    return createUserRank(this._user);
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

export default UserRank;
