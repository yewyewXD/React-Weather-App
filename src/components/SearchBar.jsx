import React, { useRef, useState } from "react";
import axios from "axios";
import CountryDatalist from "./CountryDatalist";

export default function SearchBar() {
  const [countryList, setCountryList] = useState(null);
  const countryEl = useRef();

  async function handleCountrySearch() {
    const selectedCountry = countryEl.current.value.toLowerCase();
    console.log("Selected Country:", selectedCountry);

    const res = await axios.post(
      `https://api.openweathermap.org/data/2.5/weather?q=${selectedCountry}&appid=9a6f2e544e3a8ce2e1271032a1ec02f8&units=metric`
    );
    const data = res.data;
    // console.log(data);

    const newCountryList = [
      {
        lon: data.coord.lon,
        lat: data.coord.lat,
        weather: data.weather[0].description,
        temp: data.main.temp,
      },
    ];
    setCountryList(newCountryList);
  }

  function fetchCityWeather(lon, lat) {
    console.log("Lon:", lon, ", Lat:", lat);
  }

  console.log(countryList);
  return (
    <div className="form-row">
      {/* Search Input */}
      <div className="col-8">
        <input
          type="search"
          className="form-control"
          placeholder="Enter a country"
          list="countries"
          ref={countryEl}
        />
      </div>

      {/* All Country Datalist */}
      <CountryDatalist />

      {/* Search Button */}
      <button className="btn btn-primary btn-md" onClick={handleCountrySearch}>
        Search
      </button>

      {/* Get Cities */}
      {countryList &&
        countryList.map((country, index) => (
          <button
            key={index}
            className="btn btn-secondary btn-md"
            onClick={(e) => {
              e.preventDefault();
              fetchCityWeather(country.lon, country.lat);
            }}
          >
            Fetch more
          </button>
        ))}
    </div>
  );
}
