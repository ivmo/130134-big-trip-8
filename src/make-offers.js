const getOfferHtml = (offerTitle, price) => `
  <li>
    <button class="trip-point__offer">${offerTitle} +&euro;&nbsp;${price}</button>
  </li>
`;

const getRandomValue = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min;

const getOffersTitle = (offerData) => {
  const offers = Array.from(offerData.offers);
  const newOffers = [];
  for (let i = 0; i < getRandomValue(3); i++) {
    const randomIndex = Math.floor(Math.random() * offers.length);
    newOffers.push(offers[randomIndex]);
    offers.splice(randomIndex, 1);
  }
  return newOffers;
};

const makeOffers = (pointData) => {
  const offersTitleArray = getOffersTitle(pointData);
  const price = getRandomValue(550, 10);
  return offersTitleArray.map((it) => {
    return getOfferHtml(it, price);
  }).join(``);
};

export default makeOffers;
