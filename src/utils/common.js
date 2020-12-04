const getRandomInteger = (a = 0, b = 1) => {
  return Math.floor(a + Math.random() * (b + 1 - a));
};

const getRandomItemsAsString = (array, amount = 1, separator) => {
  if (amount === 1) {
    return array[getRandomInteger(0, array.length - 1)];
  }

  let result = [];

  for (let i = 0; i < amount; i++) {
    result.push(array[getRandomInteger(0, array.length - 1)].trim());
  }

  result = separator ? Array.from(new Set(result)).join(`${separator} `) : Array.from(new Set(result)).join(`. `) + `.`;

  return result;
};


export {getRandomInteger, getRandomItemsAsString};
