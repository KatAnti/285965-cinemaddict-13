import SmartView from '../view/smart.js';
import Comment from '../view/comment.js';
import {generateComment} from '../mock/comment.js';

const createComments = (comments) => {
  let template = ``;
  comments.forEach((comment) => {
    template += new Comment(comment).getTemplate();
  });
  return template;
};

const createGenres = (genres) => {
  let template = ``;
  genres.split(`,`).forEach((genre) => {
    template += `<span class="film-details__genre">${genre}</span>`;
  });
  return template;
};

const createFilmPopup = (data) => {
  const {title,
    originalTitle,
    poster,
    description,
    rating,
    director,
    actors,
    screenwriters,
    releaseDate,
    duration,
    country,
    genres,
    ageRestriction,
    comments,
    isWatchlist,
    isWatched,
    isFavourite,
    localReview} = data;

  const genresTitle = genres.split(`,`).length > 1 ? `Genres` : `Genre`;
  const genresList = createGenres(genres);
  const commentsList = createComments(comments);
  const emojiIcon = localReview.emoji ? `<img src=${localReview.emoji} width="55" height="55">` : ``;
  const commentText = localReview.text ? localReview.text : ``;


  return `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class="film-details__age">${ageRestriction}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">${originalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${screenwriters}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genresTitle}</td>
                  <td class="film-details__cell">
                    ${genresList}
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" ${isWatchlist ? `checked` : ``} id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" ${isWatched ? `checked` : ``} id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" ${isFavourite ? `checked` : ``} id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">${commentsList}</ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">${emojiIcon}</div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${commentText}</textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
        </div>
      </form>
    </section>`;
};

class FilmPopup extends SmartView {
  constructor(film) {
    super();
    this._film = film;
    this._data = FilmPopup.parseFilmToData(film);

    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._favouriteClickHandler = this._favouriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._emojiChangeHandler = this._emojiChangeHandler.bind(this);
    this._commentTextareaHandler = this._commentTextareaHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createFilmPopup(this._data);
  }

  resetLocalComment() {
    this.updateData({
      localReview: {
        emoji: this._film.localReview.emoji,
        text: this._film.localReview.text
      }
    }
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseClickHandler(this._callback.closeClick);
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._watchedClickHandler);
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._watchlistClickHandler);
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._favouriteClickHandler);
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`click`, this._emojiChangeHandler);
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`input`, this._commentTextareaHandler);
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`keydown`, this._formSubmitHandler);
  }

  _closeClickHandler(evt) {
    evt.preventDefault();

    this.resetLocalComment();
    this._callback.closeClick(FilmPopup.parseDataToFilm(this._data));
  }

  _favouriteClickHandler(evt) {
    evt.preventDefault();

    this.updateData({
      isFavourite: !this._data.isFavourite
    });
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();

    this.updateData({
      isWatched: !this._data.isWatched
    });
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();

    this.updateData({
      isWatchlist: !this._data.isWatchlist
    });
  }

  _emojiChangeHandler(evt) {
    evt.preventDefault();
    if (evt.target.matches(`img`)) {
      this.updateData({
        localReview: {
          emoji: evt.target.src,
          text: this._data.localReview.text
        }
      });
    }
  }

  _commentTextareaHandler(evt) {
    evt.preventDefault();
    this.updateData({
      localReview: {
        emoji: this._data.localReview.emoji,
        text: evt.target.value
      }
    }, true);
  }

  _formSubmitHandler(evt) {
    if (evt.ctrlKey && evt.key === `Enter`) {
      const newComment = generateComment();
      newComment.emoji = this._data.localReview.emoji;
      newComment.message = this._data.localReview.text;
      this._data.comments.push(newComment);

      this.updateData({
        comments: this._data.comments
      });
      this.resetLocalComment();
    }
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closeClickHandler);
  }

  static parseFilmToData(film) {
    return Object.assign(
        {},
        film
    );
  }

  static parseDataToFilm(data) {
    data = Object.assign({}, data);

    return data;
  }
}

export default FilmPopup;

