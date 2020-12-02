import AbstractView from '../view/abstract.js';

const createUserRank = (user) => {
  const {rank} = user;
  return `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
};

class UserRank extends AbstractView {
  constructor(user) {
    super();

    this._user = user;
  }

  getTemplate() {
    return createUserRank(this._user);
  }
}

export default UserRank;
