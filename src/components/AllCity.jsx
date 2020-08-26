import React, { useState } from "react";
import axios from "axios";
import City from "./City";

export default function AllCity({ countryData }) {
  const [cities, setCities] = useState(null);

  async function fetchCityWeather(lon, lat) {
    // console.log("Lon:", lon, ", Lat:", lat);

    const res = await axios.post(
      `http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=30&appid=9a6f2e544e3a8ce2e1271032a1ec02f8&units=metric`
    );

    const citiesData = res.data.list;
    setCities(citiesData);
    // console.log(citiesData);
  }

  return (
    <div className="row mt-5">
      <div className="col-2">
        {countryData &&
          countryData.map((country, index) => (
            <div className="form-row mt-3" key={index}>
              <button
                className="btn btn-secondary btn-md mx-2"
                onClick={(e) => {
                  e.preventDefault();
                  fetchCityWeather(country.lon, country.lat);
                }}
              >
                See more in {country.name}
              </button>
            </div>
          ))}
      </div>
      {/* Render Each City */}
      {/* <City cities={cities} /> */}
      <div className="col-10">
        <div className="row">
          {cities &&
            cities.map((city, index) => (
              <div className="col-3 p-3 bg-light" key={index}>
                <p>name: {city.name}</p>
                <p>temperature: {city.main.temp}</p>
                <p>weather: {city.weather[0].main}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
