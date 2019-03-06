import point from './data.js';
import renderFilter from './make-filter.js';
import renderPoint from './make-point.js';

const FILTERS = [`Everything`, `Future`, `Past`];
const START_POINTS_COUNT = 7;
const DEFAULT_ACTIVE_FILTER_INDEX = 0;

const getRandomValue = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min;

const getFiltersHtml = (filtersData) => {
  return filtersData.map((it, i) => {
    return i === DEFAULT_ACTIVE_FILTER_INDEX ? renderFilter(it, true) : renderFilter(it);
  }).join(``);
};

const filtersListElement = document.querySelector(`.trip-filter`);
filtersListElement.innerHTML = getFiltersHtml(FILTERS);


let pointsDataArray;
const getArrayPoints = (pointItem, pointsCount) => {
  pointsDataArray = new Array(pointsCount).fill(pointItem);
  return pointsDataArray;
};

getArrayPoints(point, START_POINTS_COUNT);

const pointsListElement = document.querySelector(`.trip-day__items`);

const makePoints = (arrayPointsData) => {
  const pointsArray = arrayPointsData.map((it) => renderPoint(it));
  pointsListElement.innerHTML = pointsArray.join(``);
};

makePoints(pointsDataArray);


const filterClickHandler = function (evt) {
  if (evt.target.classList.contains(`trip-filter__item`)) {
    getArrayPoints(point, getRandomValue(10, 1));
    makePoints(pointsDataArray);
  }
};

filtersListElement.addEventListener(`click`, filterClickHandler);
