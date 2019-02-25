import renderFilter from './make-filter.js';
import renderPoint from './make-point.js';

const FILTERS = [`Everything`, `Future`, `Past`];
const START_POINTS_COUNT = 7;
const DEFAULT_ACTIVE_FILTER_INDEX = 0;

const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const getFiltersHtml = (filtersData) => {
  return filtersData.map((it, i) => {
    return i === DEFAULT_ACTIVE_FILTER_INDEX ? renderFilter(it, true) : renderFilter(it);
  }).join(``);
};

const filtersListElement = document.querySelector(`.trip-filter`);
filtersListElement.innerHTML = getFiltersHtml(FILTERS);

const pointsListElement = document.querySelector(`.trip-day__items`);
const putPoints = (getPoint, pointsCount) => {
  const points = new Array(pointsCount).fill().map(getPoint);
  pointsListElement.innerHTML = points.join(``);
};

putPoints(renderPoint, START_POINTS_COUNT);

const filterClickHandler = function (evt) {
  if (evt.target.classList.contains(`trip-filter__item`)) {
    putPoints(renderPoint, getRandomValue(1, 10));
  }
};

filtersListElement.addEventListener(`click`, filterClickHandler);
