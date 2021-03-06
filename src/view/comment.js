import he from 'he';
import AbstractView from '../view/abstract.js';

const createComment = (comment) => {
  const {user, emoji, date, message, id} = comment;
  return `<li id="${id}" class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(message)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${user}</span>
          <span class="film-details__comment-day">${date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
};

class Comment extends AbstractView {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return createComment(this._comment);
  }
}

export default Comment;
