import {getRandomItemsAsString} from '../utils/common.js';
import {generateCommentDate} from '../utils/film.js';
import commentsIds from '../utils/comment.js';
import {EMOJI, USERS, DESCRIPTION} from '../const.js';

let commentId = 0;

const generateComment = () => {
  return {
    user: getRandomItemsAsString(USERS),
    emoji: getRandomItemsAsString(EMOJI),
    date: generateCommentDate(),
    message: getRandomItemsAsString(DESCRIPTION.split(`.`)),
    id: commentsIds[commentId++]
  };
};

export {generateComment};
