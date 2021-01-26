import Observer from '../utils/observer.js';
import dayjs from 'dayjs';

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
          message: comment.comment,
          date: dayjs(comment.date).format(`YY/MM/DD HH:mm`)
        }
    );

    delete adaptedComment.author;
    delete adaptedComment.emotion;
    delete adaptedComment.comment;

    return adaptedComment;
  }

  static adaptToServer(comment) {
    const adaptedComment = Object.assign(
        {},
        comment,
        {
          "comment": comment.message,
          "date": comment.date,
          "emotion": comment.emoji
        }
    );

    delete adaptedComment.message;
    delete adaptedComment.emoji;

    return adaptedComment;
  }
}

export default CommentsModel;
