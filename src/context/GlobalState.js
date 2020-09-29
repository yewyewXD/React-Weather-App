import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
  countryData: null,
  countryDataLoading: true,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions
  async function searchCountry(country) {
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
        temperature: data.main.temp,
        weather: data.weather[0].main,
        weatherDetail: data.weather[0].description,
        timezone: `GMT${newTimezone > 0 ? " +" : " "}${newTimezone}`,
      };

      // console.log(newCountryData);

      dispatch({
        type: "SEARCH_COUNTRY",
        payload: newCountryData,
      });
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
      const { data } = res;

      // const newTimezone = data.timezone / 3600;

      // const newCountryData = {
      //   name: data.name,
      //   longitude: data.coord.lon,
      //   latitude: data.coord.lat,
      //   temperature: data.main.temp,
      //   weather: data.weather[0].main,
      //   weatherDetail: data.weather[0].description,
      //   timezone: `GMT${newTimezone > 0 ? " +" : " "}${newTimezone}`,
      // };

      console.log(data);

      // dispatch({
      //   type: "SEARCH_COUNTRY",
      //   payload: newCountryData,
      // });
    } catch (err) {
      console.log(err);
      alert("Invalid country");
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
        countryDataLoading: state.countryDataLoading,
        searchCountry,
        searchCities,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
