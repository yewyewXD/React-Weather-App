export default (state, action) => {
  switch (action.type) {
    case "SEARCH_COUNTRY":
      return {
        ...state,
        countryData: action.payload,
      };
    case "SEARCH_CITIES":
      return {
        ...state,
        citiesData: action.payload,
      };

    default:
      return state;
  }
};
