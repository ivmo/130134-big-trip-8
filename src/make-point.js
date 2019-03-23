import makeOffers from './make-offers.js';

const getRandomValue = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min;
const getRandomDate = (pointDate) => pointDate + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000;
const getConvertedDate = (dataTask) => new Date(getRandomDate(dataTask));

const getRandomArrayItem = (array) => array[Math.floor(Math.random() * array.length)];
const getPointType = (pointType) => {
  const typeArray = Object.keys(pointType);
  return getRandomArrayItem(typeArray);
};

const getTransport = (dataPointType) => {
  const pointType = getPointType(dataPointType);
  return `<i class="trip-icon">${dataPointType[pointType]}</i>
  <h3 class="trip-point__title">${pointType}`;
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};


class Point {
  constructor(data) {
    this._type = data.type;
    this._city = data.city;
    this._pictures = data.pictures;
    this._offers = data.offers;
    this._description = data.description;
    this._dueDate = data.dueDate;
    this._price = data.price;

    this._element = null;
    this._onEdit = null;
  }

  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  get element() {
    return this._element;
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return `
    <article class="trip-point">
      ${getTransport(this._type)} to ${getRandomArrayItem(this._city)}</h3>
      <p class="trip-point__schedule">
        <span class="trip-point__timetable">${getConvertedDate(this._dueDate).getHours()}:${getConvertedDate(this._dueDate).getMinutes()}&nbsp;&mdash; ${getConvertedDate(this._dueDate).getHours()}:${getConvertedDate(this._dueDate).getMinutes()}</span>
        <span class="trip-point__duration">1h 30m</span>
      </p>
      <p class="trip-point__price">&euro;&nbsp;${getRandomValue(550, 10)}</p>
      <ul class="trip-point__offers">
        ${makeOffers(this._offers)}
      </ul>
    </article>
    `.trim();
  }

  render() {
    this._element = createElement(this.template);
    this.bindEvents();
    return this._element;
  }

  unrender() {
    this.unbindEvents();
    this._element = null;
  }

  bindEvents() {
    this._element.querySelector(`.trip-point__title`).addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  unbindEvents() {
    this._element.querySelector(`.trip-point__title`).removeEventListener(`click`, this._onEditButtonClick.bind(this));
  }


}


export default Point;
