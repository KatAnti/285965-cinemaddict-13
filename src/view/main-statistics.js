
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from '../view/smart.js';
import {TimePeriod} from '../const.js';
import {calculateDurationInHours} from '../utils/film.js';
import {calculateRank, getFilmesWatchedOnPeriod, countGenres, sortedGenres, getTimeWatching} from '../utils/statistic.js';

const renderChart = (statisticCtx, films, timePeriod) => {
  const BAR_HEIGHT = 50;
  const watchedFilmsOnPeriod = getFilmesWatchedOnPeriod(films, timePeriod);
  const Genres = countGenres(watchedFilmsOnPeriod);
  const sortedGenresKeys = sortedGenres(Genres);

  const labelsValues = [];
  sortedGenresKeys.forEach((key) => {
    labelsValues.push(Genres[key]);
  });

  statisticCtx.height = BAR_HEIGHT * sortedGenresKeys.length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: sortedGenresKeys,
      datasets: [{
        data: labelsValues,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 20,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            display: true,
            beginAtZero: true,
            fontColor: `#ffffff`,
            fontSize: 20,
            padding: 50
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createMainStatistics = (films, timePeriod, rank) => {
  const watchedFilmsOnPeriod = getFilmesWatchedOnPeriod(films, timePeriod);
  const Genres = countGenres(watchedFilmsOnPeriod);
  const sortedGenresKeys = sortedGenres(Genres);
  const timeWatching = watchedFilmsOnPeriod.length > 0 ? calculateDurationInHours(getTimeWatching(watchedFilmsOnPeriod), true) : `0`;

  const filmsWatched = watchedFilmsOnPeriod.length;
  const topGenre = sortedGenresKeys[0] ? sortedGenresKeys[0] : ``;

  return `<section class="statistic visually-hidden">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${rank}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${timePeriod === TimePeriod.ALL ? `checked` : ``}>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${timePeriod === TimePeriod.TODAY ? `checked` : ``}>
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${timePeriod === TimePeriod.WEEK ? `checked` : ``}>
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${timePeriod === TimePeriod.MONTH ? `checked` : ``}>
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${timePeriod === TimePeriod.YEAR ? `checked` : ``}>
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${filmsWatched} <span class="statistic__item-description ${filmsWatched === 0 ? `visually-hidden` : ``}">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${timeWatching}</p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`;
};

class MainStatistic extends SmartView {
  constructor(films) {
    super();

    this._data = {
      films,
      timePeriod: TimePeriod.ALL
    };

    this._genresChart = null;
    this._rank = calculateRank(getFilmesWatchedOnPeriod(films, TimePeriod.ALL).length);
    this._dateChangeHandler = this._dateChangeHandler.bind(this);
    this._changeFilterHandler = this._changeFilterHandler.bind(this);

    this.restoreHandlers();
  }

  getTemplate() {
    return createMainStatistics(this._data.films, this._data.timePeriod, this._rank);
  }

  show() {
    this.getElement().classList.remove(`visually-hidden`);
  }

  hide() {
    this.getElement().classList.add(`visually-hidden`);
  }

  restoreHandlers() {
    this._setCharts();
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`click`, this._changeFilterHandler);
  }

  _changeFilterHandler(evt) {
    if (evt.target.getAttribute(`for`) === `statistic-all-time`) {
      this.updateData({
        timePeriod: TimePeriod.ALL
      });
    }

    if (evt.target.getAttribute(`for`) === `statistic-today`) {
      this.updateData({
        timePeriod: TimePeriod.TODAY
      });
    }

    if (evt.target.getAttribute(`for`) === `statistic-week`) {
      this.updateData({
        timePeriod: TimePeriod.WEEK
      });
    }

    if (evt.target.getAttribute(`for`) === `statistic-month`) {
      this.updateData({
        timePeriod: TimePeriod.MONTH
      });
    }

    if (evt.target.getAttribute(`for`) === `statistic-year`) {
      this.updateData({
        timePeriod: TimePeriod.YEAR
      });
    }

    this.getElement().classList.remove(`visually-hidden`);
  }

  _dateChangeHandler(timePeriod) {
    if (!timePeriod) {
      return;
    }

    this.updateData({
      timePeriod
    });
  }

  _setCharts() {
    if (this._genresChart !== null) {
      this._genresChart = null;
    }

    const genresCtx = this.getElement().querySelector(`.statistic__chart`);

    this._daysChart = renderChart(genresCtx, this._data.films, this._data.timePeriod);
  }
}

export default MainStatistic;
