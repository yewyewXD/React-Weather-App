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

    default:
      return state;
  }
};
