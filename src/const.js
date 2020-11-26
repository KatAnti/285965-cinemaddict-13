const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.
Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`;

const TITLES = [
  `The Green Mile`,
  `Forrest Gump`,
  `Back to the Future`,
  `Shutter Island`,
  `Django Unchained`,
  `Green Book`,
  `One Flew Over the Cuckoo's Nest`,
  `Mulholland Drive`,
  `The Help`,
  `Inside Out`,
  `Gone Girl`,
  `The Blind Side`,
  `The Fifth Element`,
  `Knives Out`,
  `Jojo Rabbit`
];

const DIRECTORS = [
  `David Lynch`,
  `Pedro Almodovar`,
  `Christopher Nolan`,
  `Darren Aronofsky`,
  `Anthony Mann`
];

const ACTORS = [
  `Tom Hanks`,
  `David Morse`,
  `Bonnie Hunt`,
  `Naomi Watts`,
  `Laura Elena Harring`,
  `Justin Theroux`,
  `Henry Cavill`,
  `Jack Nicholson`,
  `Shelley Duvall`,
  `Taissa Farmiga`,
  `Jessica Lange`
];

const SCREENWRITERS = [
  `David Lynch`,
  `Pedro Almodovar`,
  `Christopher Nolan`,
  `Darren Aronofsky`,
  `Anthony Mann`,
  `Jack Nicholson`,
  `Shelley Duvall`,
  `Taissa Farmiga`,
  `Jessica Lange`
];

const COUNTRIES = [
  `USA`,
  `Canada`,
  `Russia`,
  `Germany`,
  `France`,
  `Iceland`,
  `England`
];

const GENRES = [
  `Adventure`,
  `Comedy`,
  `Crime`,
  `Drama`,
  `Fantasy`,
  `Historical`,
  `Horror`
];

const POSTERS = [
  `images/posters/made-for-each-other.png`,
  `images/posters/popeye-meets-sinbad.png`,
  `images/posters/sagebrush-trail.jpg`,
  `images/posters/santa-claus-conquers-the-martians.jpg`,
  `images/posters/the-dance-of-life.jpg`,
  `images/posters/the-great-flamarion.jpg`,
  `images/posters/the-man-with-the-golden-arm.jpg`
];

const EMOJI = [
  `images/emoji/angry.png`,
  `images/emoji/puke.png`,
  `images/emoji/sleeping.png`,
  `images/emoji/smile.png`
];

const USERS = [
  `Tim Macoveev`,
  `John Doe`,
  `Jhonny Ards`,
  `Pipa Lupa`
];

const ranks = new Map();
ranks.set(0, ``);
ranks.set(10, `Novice`);
ranks.set(20, `Fan`);
ranks.set(`more`, `Movie Buff`);

const FILMS_COUNT = 25;

export {DESCRIPTION, TITLES, DIRECTORS, ACTORS, SCREENWRITERS, COUNTRIES, GENRES, POSTERS, EMOJI, USERS, FILMS_COUNT, ranks};
