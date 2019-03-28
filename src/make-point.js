import {getRandomValue, getConvertedDate, getRandomArrayItem, getPointType} from './utils.js';
import Component from './component.js';
import makeOffers from './make-offers.js';


const getTransport = (dataPointType) => {
  const pointType = getPointType(dataPointType);
  return `<i class="trip-icon">${dataPointType[pointType]}</i>
  <h3 class="trip-point__title">${pointType}`;
};


class Point extends Component {
  constructor(data) {
    super();
    this._type = data.type;
    this._city = data.city;
    this._pictures = data.pictures;
    this._offers = data.offers;
    this._description = data.description;
    this._dueDate = data.dueDate;
    this._price = data.price;

    this._onEdit = null;
  }

  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
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


  bindEvents() {
    this._element.addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  unbindEvents() {
    this._element.removeEventListener(`click`, this._onEditButtonClick.bind(this));
  }

}

export default Point;
