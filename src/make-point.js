import makeOffers from './make-offers.js';

const getRandomValue = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min;
const getRandomDate = (pointDate) => pointDate + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000;
const getConvertedDate = (dataTask) => new Date(getRandomDate(dataTask));

const getRandomArrayItem = (array) => array[Math.floor(Math.random() * array.length)];
const getPointType = (pointType) => {
  const typeArray = Object.keys(pointType);
  return getRandomArrayItem(typeArray);
};

const getTransport = (pointData) => {
  const pointType = getPointType(pointData.type);
  return `<i class="trip-icon">${pointData.type[pointType]}</i>
  <h3 class="trip-point__title">${pointType} to ${getRandomArrayItem(pointData.city)}</h3>`;
};

const renderPoint = (pointData) => `
  <article class="trip-point">
    ${getTransport(pointData)}
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">${getConvertedDate(pointData.dueDate).getHours()}:${getConvertedDate(pointData.dueDate).getMinutes()}&nbsp;&mdash; ${getConvertedDate(pointData.dueDate).getHours()}:${getConvertedDate(pointData.dueDate).getMinutes()}</span>
      <span class="trip-point__duration">1h 30m</span>
    </p>
    <p class="trip-point__price">&euro;&nbsp;${getRandomValue(550, 10)}</p>
    <ul class="trip-point__offers">
      ${makeOffers(pointData)}
    </ul>
  </article>
`;

export default renderPoint;
