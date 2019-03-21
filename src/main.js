import pointData from './data.js';
import renderFilter from './make-filter.js';
import Point from './make-point.js';
import EditPoint from './edit-point.js';

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

getArrayPoints(pointData, START_POINTS_COUNT);

const pointsContainer = document.querySelector(`.trip-day__items`);

const getPoint = (pointDataItem) => {
  const pointComponent = new Point(pointDataItem);
  const editPointComponent = new EditPoint(pointDataItem);


  pointComponent.onEdit = () => {
    editPointComponent.render();
    pointsContainer.replaceChild(editPointComponent.element, pointComponent.element);
    pointComponent.unrender();
  };

  editPointComponent.onSubmit = () => {
    pointComponent.render();
    pointsContainer.replaceChild(pointComponent.element, editPointComponent.element);
    editPointComponent.unrender();
  };

  return pointComponent.render();
};

const makePoints = (arrayPointsData) => {
  pointsContainer.innerHTML = ``;
  const fragment = document.createDocumentFragment();
  arrayPointsData.forEach((it) => {
    fragment.appendChild(getPoint(it));
  });
  pointsContainer.appendChild(fragment);
};

makePoints(pointsDataArray);


const filterClickHandler = function (evt) {
  if (evt.target.classList.contains(`trip-filter__item`)) {
    getArrayPoints(pointData, getRandomValue(10, 1));
    makePoints(pointsDataArray);
  }
};

filtersListElement.addEventListener(`click`, filterClickHandler);
