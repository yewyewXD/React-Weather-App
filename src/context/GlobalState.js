import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
  countryData: null,
  citiesData: null,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions
  async function searchPlace(country) {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=9a6f2e544e3a8ce2e1271032a1ec02f8&units=metric`
      );
      const { data } = res;

      const newTimezone = data.timezone / 3600;

      const newCountryData = {
        name: data.name,
        longitude: data.coord.lon,
        latitude: data.coord.lat,
        temperature: Math.round(+data.main.temp),
        weather: data.weather[0].main,
        weatherDetail: data.weather[0].description,
        timezone: `GMT${newTimezone > 0 ? " +" : " "}${newTimezone}`,
      };

      // console.log(data);
      dispatch({
        type: "SEARCH_COUNTRY",
        payload: newCountryData,
      });

      // search cities
      searchCities(newCountryData.latitude, newCountryData.longitude);
    } catch (err) {
      console.log(err);
      alert("Invalid country");
      dispatch({
        type: "SEARCH_ERROR",
        payload: "Search Error",
      });
    }
  }

  async function searchCities(lat, lon) {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=8&appid=9a6f2e544e3a8ce2e1271032a1ec02f8&units=metric`
      );
      const data = res.data.list;

      // console.log(data);

      dispatch({
        type: "SEARCH_CITIES",
        payload: data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: "SEARCH_ERROR",
        payload: "Search Error",
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        countryData: state.countryData,
        citiesData: state.citiesData,
        searchPlace,
        searchCities,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
