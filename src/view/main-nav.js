const capitalizeWord = (word) => {
  return word[0].toUpperCase() + word.slice(1);
};

const createFilterItem = (filter) => {
  const {name, count} = filter;

  return name === `all`
    ? `<a href="#${name}" class="main-navigation__item main-navigation__item--active">${capitalizeWord(name)} movies</a>`
    : `<a href="#${name}" class="main-navigation__item">${capitalizeWord(name)} <span class="main-navigation__item-count">${count}</span></a>`;
};


const createMainNav = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItem(filter, index === 0))
    .join(``);
  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

export {createMainNav};
