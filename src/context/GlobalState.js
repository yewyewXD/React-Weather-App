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
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${placeName}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );
      const { data } = weatherResponse;

      const newTimezone = data.timezone / 3600;

      // get place info from wikipedia
      let placeDescription = "";
      try {
        const wikiResponse = await axios.get(
          `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&origin=*&titles=${placeName}`
        );

        const wikiPageId = Object.keys(wikiResponse.data.query.pages)[0];
        const wikiContent = wikiResponse.data.query.pages[wikiPageId].extract;
        let trimResult = "";
        let level = 0;
        for (var index = 0; index < wikiContent.length; index++) {
          var character = wikiContent.charAt(index);
          if (character === "(") level++;

          if (level === 0) trimResult += character;

          if (character === ")") level--;
        }

        const trimmedContent = trimResult.replace(/\s{2,}/g, " ");
        const secondPeriodIndex = trimmedContent.split(".", 2).join(".").length;
        const finalContent = trimmedContent.substr(0, secondPeriodIndex + 1);
        placeDescription = finalContent;
      } catch {
        console.log(`no wikipedia data for ${placeName}`);
      }

      const newPlaceData = {
        name: data.name,
        description: placeDescription,
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
        `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=20&appid=${process.env.REACT_APP_API_KEY}&units=metric`
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
      // search city
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );
      const { data } = res;

      const newTimezone = data.timezone / 3600;

      // get city info from wikipedia
      let placeDescription = "";
      try {
        const wikiResponse = await axios.get(
          `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&origin=*&titles=${cityName}`
        );

        const wikiPageId = Object.keys(wikiResponse.data.query.pages)[0];
        const wikiContent = wikiResponse.data.query.pages[wikiPageId].extract;
        let trimResult = "";
        let level = 0;
        for (var index = 0; index < wikiContent.length; index++) {
          var character = wikiContent.charAt(index);
          if (character === "(") level++;

          if (level === 0) trimResult += character;

          if (character === ")") level--;
        }

        const trimmedContent = trimResult.replace(/\s{2,}/g, " ");
        const secondPeriodIndex = trimmedContent.split(".", 2).join(".").length;
        const finalContent = trimmedContent.substr(0, secondPeriodIndex + 1);
        placeDescription = finalContent;
      } catch {
        console.log(`no wikipedia data for ${cityName}`);
      }

      const newCityData = {
        name: data.name,
        description: placeDescription,
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
    const matchCountry = countryName.toLowerCase() === placeName.toLowerCase();

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
