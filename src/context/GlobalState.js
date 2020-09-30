import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
  placeData: null,
  nearbyData: null,
  isCountry: true,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions
  async function searchPlace(country) {
    try {
      // search place
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=9a6f2e544e3a8ce2e1271032a1ec02f8&units=metric`
      );
      const { data } = res;

      const newTimezone = data.timezone / 3600;

      const newCountryData = {
        name: data.name,
        countryCode: data.sys.country,
        longitude: data.coord.lon,
        latitude: data.coord.lat,
        temperature: +data.main.temp,
        weather: data.weather[0].main,
        timezone: `GMT${newTimezone > 0 ? " +" : " "}${newTimezone}`,
      };

      console.log(data);

      // check if it's a country
      countryCheck(data.sys.country, data.name);

      // search cities
      searchCities(
        newCountryData.latitude,
        newCountryData.longitude,
        newCountryData.name
      );

      dispatch({
        type: "SEARCH_PLACE",
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

  async function searchCities(lat, lon, placeName) {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=20&appid=9a6f2e544e3a8ce2e1271032a1ec02f8&units=metric`
      );
      const cityList = res.data.list;

      const filteredCityList = cityList.filter(
        (city) => city.name !== placeName
      );

      const cleanedCityList = [...new Set(filteredCityList)];

      console.log(cleanedCityList);

      dispatch({
        type: "SEARCH_NEARBY",
        payload: cleanedCityList,
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
        countryCode: data.sys.country,
        longitude: data.coord.lon,
        latitude: data.coord.lat,
        temperature: Math.round(temperature),
        weather: weather,
        timezone: `GMT${newTimezone > 0 ? " +" : " "}${newTimezone}`,
      };

      // console.log(data);
      dispatch({
        type: "SEARCH_CITY",
        payload: newCityData,
      });

      // search cities
      searchCities(
        newCityData.latitude,
        newCityData.longitude,
        newCityData.name
      );
    } catch (err) {
      console.log(err);
      alert("Invalid city");
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

  async function countryCheck(countryCode, countryName) {
    const res = await axios.get(
      `https://restcountries.eu/rest/v2/alpha/${countryCode}`
    );
    const matchCountry = res.data.name === countryName;

    // console.log("match code match:", matchCountry);

    dispatch({
      type: "COUNTRY_CHECK",
      payload: matchCountry,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        placeData: state.placeData,
        nearbyData: state.nearbyData,
        countryCode: state.countryCode,
        isCountry: state.isCountry,
        searchPlace,
        searchCities,
        searchCity,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
