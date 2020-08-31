import React, { useState } from "react";
import axios from "axios";

export default function AllCity({ countryData }) {
  const [cities, setCities] = useState(null);
  const hotWeather = "cityTemperature hot";
  const coldWeather = "cityTemperature cold";

  async function fetchCityWeather(lon, lat) {
    // console.log("Lon:", lon, ", Lat:", lat);

    const res = await axios.post(
      `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=50&appid=9a6f2e544e3a8ce2e1271032a1ec02f8&units=metric`
    );

    const citiesData = res.data.list;
    setCities(citiesData);
    console.log(citiesData);
  }

  return (
    <div className="row d-flex align-items-md-start align-items-center justify-content-center mt-5">
      <div className="col-md-2">
        <h2>Weather in:</h2>

        <div className="list-group d-flex flex-md-column flex-row overflow-auto">
          {countryData &&
            countryData.map((country, index) => (
              <button
                key={index}
                className="list-group-item list-group-item-action border"
                onClick={(e) => {
                  e.preventDefault();
                  fetchCityWeather(country.lon, country.lat);
                }}
              >
                {country.name}
              </button>
            ))}
        </div>
      </div>
      {/* Render Each City */}
      <div className="col-10 ">
        <div className="row d-flex justify-content-center flex-wrap">
          {cities &&
            cities.map((city, index) => (
              <div
                className="m-3 p-3 bg-light d-flex align-items-center justify-content-center flex-column eachCity"
                key={index}
              >
                <h3 className="mb-4">{city.name}</h3>
                <div className="d-flex align-items-center justify-content-center">
                  <p className="m-0 pr-2">Temperature:</p>
                  <span
                    className={city.main.temp > 30 ? hotWeather : coldWeather}
                  >
                    {Math.round(city.main.temp)}
                  </span>
                </div>

                <div className="d-flex align-items-center justify-content-center">
                  <p className="m-0 pr-2">Weather: {city.weather[0].main}</p>
                  <span className="weatherIcon">
                    <img
                      src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                      alt=""
                    />
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
