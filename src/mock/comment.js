import {getRandomItemsAsString} from '../utils/common.js';
import {generateCommentDate} from '../utils/film.js';
import {EMOJI, USERS, DESCRIPTION} from '../const.js';

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateComment = () => {
  return {
    user: getRandomItemsAsString(USERS),
    emoji: getRandomItemsAsString(EMOJI),
    date: generateCommentDate(),
    message: getRandomItemsAsString(DESCRIPTION.split(`.`)),
    id: generateId()
  };
};

export {generateComment};
