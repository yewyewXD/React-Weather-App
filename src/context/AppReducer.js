export default (state, action) => {
  switch (action.type) {
    case "SEARCH_PLACE":
      return {
        ...state,
        placeData: action.payload,
      };
    case "SEARCH_NEARBY":
      return {
        ...state,
        nearbyData: action.payload,
      };
    case "COUNTRY_CHECK":
      return {
        ...state,
        isCountry: action.payload.matchCountry,
        countryName: action.payload.countryName,
      };
    case "SEARCH_CITY":
      return {
        ...state,
        placeData: action.payload,
      };

    default:
      return state;
  }
};
