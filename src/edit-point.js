const getRandomValue = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min;
// const getRandomDate = (pointDate) => pointDate + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000;
// const getConvertedDate = (dataTask) => new Date(getRandomDate(dataTask));
//
// const getRandomArrayItem = (array) => array[Math.floor(Math.random() * array.length)];
// const getPointType = (pointType) => {
//   const typeArray = Object.keys(pointType);
//   return getRandomArrayItem(typeArray);
// };

const shuffle = (arr) => {
  let j;
  let temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

const getDescription = (dataPointsDescription) => {
  const pointsDescription = dataPointsDescription.split(`. `);
  const description = shuffle(pointsDescription);
  return description.slice(getRandomValue(3, 1)).join(`. `);
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const getPictures = (links) => {
  const pictureItems = links.map((it) => `<img src="${it}" alt="picture from place" class="point__destination-image">)`).join(``);
  return pictureItems;
};

class EditPoint {
  constructor(data) {
    this._type = data.type;
    this._city = data.city;
    this._pictures = data.pictures;
    this._offers = data.offers;
    this._description = data.description;
    this._dueDate = data.dueDate;
    this._price = data.price;

    this._element = null;
    this._onSubmit = null;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onSubmit === `function`) {
      this._onSubmit();
    }
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get element() {
    return this._element;
  }

  get template() {
    return `
    <article class="point">
      <form action="" method="get">
        <header class="point__header">
          <label class="point__date">
            choose day
            <input class="point__input" type="text" placeholder="MAR 18" name="day">
          </label>

          <div class="travel-way">
            <label class="travel-way__label" for="travel-way__toggle">✈️</label>

            <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

            <div class="travel-way__select">
              <div class="travel-way__select-group">
                <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-taxi" name="travel-way" value="taxi">
                <label class="travel-way__select-label" for="travel-way-taxi">🚕 taxi</label>

                <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-bus" name="travel-way" value="bus">
                <label class="travel-way__select-label" for="travel-way-bus">🚌 bus</label>

                <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-train" name="travel-way" value="train">
                <label class="travel-way__select-label" for="travel-way-train">🚂 train</label>

                <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-flight" name="travel-way" value="train" checked>
                <label class="travel-way__select-label" for="travel-way-flight">✈️ flight</label>
              </div>

              <div class="travel-way__select-group">
                <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-check-in" name="travel-way" value="check-in">
                <label class="travel-way__select-label" for="travel-way-check-in">🏨 check-in</label>

                <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing" name="travel-way" value="sight-seeing">
                <label class="travel-way__select-label" for="travel-way-sightseeing">🏛 sightseeing</label>
              </div>
            </div>
          </div>

          <div class="point__destination-wrap">
            <label class="point__destination-label" for="destination">Flight to</label>
            <input class="point__destination-input" list="destination-select" id="destination" value="Chamonix" name="destination">
            <datalist id="destination-select">
              <option value="airport"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
              <option value="hotel"></option>
            </datalist>
          </div>

          <label class="point__time">
            choose time
            <input class="point__input" type="text" value="00:00 — 00:00" name="time" placeholder="00:00 — 00:00">
          </label>

          <label class="point__price">
            write price
            <span class="point__price-currency">€</span>
            <input class="point__input" type="text" value="160" name="price">
          </label>

          <div class="point__buttons">
            <button class="point__button point__button--save" type="submit">Save</button>
            <button class="point__button" type="reset">Delete</button>
          </div>

          <div class="paint__favorite-wrap">
            <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
            <label class="point__favorite" for="favorite">favorite</label>
          </div>
        </header>

        <section class="point__details">
          <section class="point__offers">
            <h3 class="point__details-title">offers</h3>

            <div class="point__offers-wrap">
              <input class="point__offers-input visually-hidden" type="checkbox" id="add-luggage" name="offer" value="add-luggage">
              <label for="add-luggage" class="point__offers-label">
                <span class="point__offer-service">Add luggage</span> + €<span class="point__offer-price">30</span>
              </label>

              <input class="point__offers-input visually-hidden" type="checkbox" id="switch-to-comfort-class" name="offer" value="switch-to-comfort-class">
              <label for="switch-to-comfort-class" class="point__offers-label">
                <span class="point__offer-service">Switch to comfort class</span> + €<span class="point__offer-price">100</span>
              </label>

              <input class="point__offers-input visually-hidden" type="checkbox" id="add-meal" name="offer" value="add-meal">
              <label for="add-meal" class="point__offers-label">
                <span class="point__offer-service">Add meal </span> + €<span class="point__offer-price">15</span>
              </label>

              <input class="point__offers-input visually-hidden" type="checkbox" id="choose-seats" name="offer" value="choose-seats">
              <label for="choose-seats" class="point__offers-label">
                <span class="point__offer-service">Choose seats</span> + €<span class="point__offer-price">5</span>
              </label>
            </div>

          </section>
          <section class="point__destination">
            <h3 class="point__details-title">Destination</h3>
            <p class="point__destination-text">${getDescription(this._description)}</p>
            <div class="point__destination-images">
              ${getPictures(this._pictures)}
            </div>
          </section>
          <input type="hidden" class="point__total-price" name="total-price" value="">
        </section>
      </form>
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
    this._element.querySelector(`form`).addEventListener(`submit`, this._onSubmitButtonClick.bind(this));
    this._element.querySelector(`form`).addEventListener(`reset`, this._onSubmitButtonClick.bind(this));
  }

  unbindEvents() {
    this._element.querySelector(`form`).removeEventListener(`submit`, this._onSubmitButtonClick.bind(this));
    this._element.querySelector(`form`).removeEventListener(`reset`, this._onSubmitButtonClick.bind(this));
  }

}

export default EditPoint;
