import Observer from '../utils/observer.js';

class CommentsModel extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
  }

  addComment(updateType, update) {
    this._comments = [
      update,
      ...this._comments
    ];

    this._notify(updateType, update);
  }

  deleteComment(updateType, update) {
    const index = this._comments.findIndex((comment) => comment.id === update);

    if (index === -1) {
      throw new Error(`Can't delete unexisting comment`);
    }

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(comment) {
    const adaptedComment = Object.assign(
        {},
        comment,
        {
          user: comment.author,
          emoji: comment.emotion,
          message: comment.comment
        }
    );

    delete adaptedComment.author;
    delete adaptedComment.emotion;
    delete adaptedComment.comment;

    return adaptedComment;
  }

  static adaptToServer(film) {
    const adaptedTask = Object.assign(
        {},
        film,
        {
          "due_date": film.dueDate instanceof Date ? film.dueDate.toISOString() : null, // На сервере дата хранится в ISO формате
          "is_archived": film.isArchive,
          "is_favorite": film.isFavorite,
          "repeating_days": film.repeating
        }
    );

    delete adaptedTask.dueDate;
    delete adaptedTask.isArchive;
    delete adaptedTask.isFavorite;
    delete adaptedTask.repeating;

    return adaptedTask;
  }
}

export default CommentsModel;
