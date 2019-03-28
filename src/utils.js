export const getRandomValue = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min;
export const getRandomDate = (pointDate) => pointDate + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000;
export const getConvertedDate = (dataTask) => new Date(getRandomDate(dataTask));
export const getRandomArrayItem = (array) => array[Math.floor(Math.random() * array.length)];

export const getPointType = (pointType) => {
  const typeArray = Object.keys(pointType);
  return getRandomArrayItem(typeArray);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const shuffle = (arr) => {
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

export const getDescription = (dataPointsDescription) => {
  const pointsDescription = dataPointsDescription.split(`. `);
  const description = shuffle(pointsDescription);
  return description.slice(getRandomValue(3, 1)).join(`. `);
};