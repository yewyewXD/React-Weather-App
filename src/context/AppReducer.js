export default (state, action) => {
  switch (action.type) {
    case "SEARCH_COUNTRY":
      return {
        ...state,
        countryData: action.payload,
        countryDataLoading: false,
      };

    default:
      return state;
  }
};
