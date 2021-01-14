import {COMMENTS_COUNT} from '../const.js';

const commentsIds = new Array(COMMENTS_COUNT).fill().map((item, index) => {
  return index;
});

export default commentsIds;
