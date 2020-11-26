import {getRandomItemsAsString, generateCommentDate} from '../utils.js';
import {EMOJI, USERS, DESCRIPTION} from '../const.js';

const generateComment = () => {
  return {
    user: getRandomItemsAsString(USERS),
    emoji: getRandomItemsAsString(EMOJI),
    date: generateCommentDate(),
    message: getRandomItemsAsString(DESCRIPTION.split(`.`))
  };
};

export {generateComment};
