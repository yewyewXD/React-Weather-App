const AppReducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_PLACE":
      return {
        ...state,
        placeData: action.payload,
        isLoadingWeather: false,
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
        isLoadingWeather: false,
      };

    case "UPDATE_LOADING_WEATHER":
      return {
        ...state,
        isLoadingWeather: action.payload,
      };

    case "UPDATE_LOADING_WIKI":
      return {
        ...state,
        isLoadingWiki: action.payload,
      };

    default:
      return state;
  }
};

export default AppReducer;
