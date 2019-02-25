export default (filterData, checked = false) => `
  <input type="radio" id="filter-${filterData}" name="filter" value="${filterData}" ${checked ? `checked` : ``}>
  <label class="trip-filter__item" for="filter-${filterData}">${filterData}</label>
`;
