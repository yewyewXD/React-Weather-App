import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
  placeData: null,
  nearbyData: null,
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
        temperature: +data.main.temp,
        weather: data.weather[0].main,
        timezone: `GMT${newTimezone > 0 ? " +" : " "}${newTimezone}`,
      };

      // console.log(data);
      dispatch({
        type: "SEARCH_PLACE",
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
        type: "SEARCH_NEARBY",
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

  async function searchCity(cityId, temperature, weather) {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=9a6f2e544e3a8ce2e1271032a1ec02f8&units=metric`
      );
      const { data } = res;

      const newTimezone = data.timezone / 3600;

      const newCityData = {
        name: data.name,
        longitude: data.coord.lon,
        latitude: data.coord.lat,
        temperature: Math.round(temperature),
        weather: weather,
        timezone: `GMT${newTimezone > 0 ? " +" : " "}${newTimezone}`,
      };

      // console.log(data);
      dispatch({
        type: "SEARCH_PLACE",
        payload: newCityData,
      });

      // search cities
      searchCities(newCityData.latitude, newCityData.longitude);
    } catch (err) {
      console.log(err);
      alert("Invalid city");
      dispatch({
        type: "SEARCH_ERROR",
        payload: "Search Error",
      });
    }
  }

  async function findPlaceImage(placeName) {
    try {
      const res = await axios.get(
        `https://api.unsplash.com/search/photos?page=1&query=${placeName}&orientation=landscape&client_id=6WvOzBG4EgwiZgc-dApUGD0Fi8csesIJI_OL4uYGM50`
      );

      console.log(res.data);
    } catch (err) {
      console.log(err);
      console.log("invalid place name");
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        placeData: state.placeData,
        nearbyData: state.nearbyData,
        searchCountry,
        searchCities,
        searchCity,
        findPlaceImage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
