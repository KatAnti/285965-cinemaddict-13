import dayjs from 'dayjs';
import Observer from '../utils/observer.js';

class FilmsModel extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          title: film.film_info.title,
          originalTitle: film.film_info.alternative_title,
          poster: film.film_info.poster,
          description: film.film_info.description,
          rating: film.film_info.total_rating,
          director: film.film_info.director,
          actors: film.film_info.actors,
          screenwriters: film.film_info.writers,
          duration: film.film_info.runtime,
          genres: film.film_info.genre,
          ageRestriction: film.film_info.age_rating,
          releaseDate: dayjs(film.film_info.release.date).format(`DD MMMM YYYY`),
          country: film.film_info.release.release_country,
          comments: film.comments,
          isWatchlist: film.user_details.watchlist,
          isWatched: film.user_details.already_watched,
          isFavourite: film.user_details.favorite,
          watchingDate: film.user_details.watching_date
        }
    );

    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          "film_info": {
            "title": film.title,
            "alternative_title": film.originalTitle,
            "total_rating": film.rating,
            "poster": film.poster,
            "age_rating": film.ageRestriction,
            "director": film.director,
            "writers": film.screenwriters,
            "actors": film.actors,
            "release": {
              "date": film.releaseDate,
              "release_country": film.country
            },
            "runtime": film.duration,
            "genre": film.genres,
            "description": film.description
          },
          "user_details": {
            "watchlist": film.isWatchlist,
            "already_watched": film.isWatched,
            "watching_date": film.watchingDate,
            "favorite": film.isFavourite
          }
        }
    );

    delete adaptedFilm.isWatchlist;
    delete adaptedFilm.isWatched;
    delete adaptedFilm.watchingDate;
    delete adaptedFilm.isFavourite;
    delete adaptedFilm.title;
    delete adaptedFilm.originalTitle;
    delete adaptedFilm.rating;
    delete adaptedFilm.poster;
    delete adaptedFilm.ageRestriction;
    delete adaptedFilm.director;
    delete adaptedFilm.screenwriters;
    delete adaptedFilm.actors;
    delete adaptedFilm.releaseDate;
    delete adaptedFilm.country;
    delete adaptedFilm.duration;
    delete adaptedFilm.genres;
    delete adaptedFilm.description;
    return adaptedFilm;
  }
}

export default FilmsModel;
