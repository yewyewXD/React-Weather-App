import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
  placeData: null,
  nearbyData: null,
  isCountry: true,
  countryName: null,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions
  async function searchPlace(placeName) {
    try {
      // search place
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${placeName}&appid=9a6f2e544e3a8ce2e1271032a1ec02f8&units=metric`
      );
      const { data } = res;

      const newTimezone = data.timezone / 3600;

      const newPlaceData = {
        name: data.name,
        countryCode: data.sys.country,
        longitude: data.coord.lon,
        latitude: data.coord.lat,
        temperature: +data.main.temp,
        weather: data.weather[0].main,
        timezone: `GMT${newTimezone > 0 ? " +" : " "}${newTimezone}`,
      };

      // console.log(data);

      // check if it's a country
      countryCheck(data.sys.country, data.name);

      // search cities
      searchCities(
        newPlaceData.latitude,
        newPlaceData.longitude,
        newPlaceData.name
      );

      dispatch({
        type: "SEARCH_PLACE",
        payload: newPlaceData,
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

  async function searchCities(lat, lon, placeName) {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=20&appid=9a6f2e544e3a8ce2e1271032a1ec02f8&units=metric`
      );
      const { list } = res.data;

      // filter endpoint, remove duplicate, and remove country
      const newCityList = list.map((city) => {
        return {
          name: city.name,
          temperature: city.main.temp,
          weather: city.weather[0].main,
        };
      });
      const removeDuplicate = newCityList.filter(
        (city, index, self) =>
          index === self.findIndex((c) => c.name === city.name)
      );
      const cleanCityList = removeDuplicate.filter(
        (city) => city.name !== placeName && city.name !== state.countryName
      );

      // console.log(cleanCityList);

      dispatch({
        type: "SEARCH_NEARBY",
        payload: cleanCityList,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: "SEARCH_ERROR",
        payload: "Search Error",
      });
    }
  }

  async function searchCity(cityName, temperature, weather) {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9a6f2e544e3a8ce2e1271032a1ec02f8&units=metric`
      );
      const { data } = res;

      const newTimezone = data.timezone / 3600;

      const newCityData = {
        name: data.name,
        countryCode: data.sys.country,
        longitude: data.coord.lon,
        latitude: data.coord.lat,
        temperature: temperature,
        weather: weather,
        timezone: `GMT${newTimezone > 0 ? " +" : " "}${newTimezone}`,
      };

      // check if it's a country
      countryCheck(data.sys.country, data.name);

      // search cities
      searchCities(
        newCityData.latitude,
        newCityData.longitude,
        newCityData.name
      );

      // console.log(data);
      dispatch({
        type: "SEARCH_CITY",
        payload: newCityData,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: "SEARCH_ERROR",
        payload: "Search Error",
      });
    }
  }

  // async function findPlaceImage(placeName) {
  //   try {
  //     const res = await axios.get(
  //       `https://api.unsplash.com/search/photos?page=1&query=${placeName}&orientation=landscape&client_id=6WvOzBG4EgwiZgc-dApUGD0Fi8csesIJI_OL4uYGM50`
  //     );

  //     console.log(res.data);
  //   } catch (err) {
  //     console.log(err);
  //     console.log("invalid place name");
  //   }
  // }

  async function countryCheck(countryCode, placeName) {
    const res = await axios.get(
      `https://restcountries.eu/rest/v2/alpha/${countryCode}`
    );
    const countryName = res.data.name;
    const matchCountry = countryName === placeName;

    dispatch({
      type: "COUNTRY_CHECK",
      payload: { matchCountry, countryName },
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        placeData: state.placeData,
        nearbyData: state.nearbyData,
        isCountry: state.isCountry,
        countryName: state.countryName,
        searchPlace,
        searchCities,
        searchCity,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
