import React, { useState } from "react";
import axios from "axios";

export default function AllCity({ countryData }) {
  const [cities, setCities] = useState(null);
  const hotWeather = "cityTemperature hot";
  const coldWeather = "cityTemperature cold";

  async function fetchCityWeather(lon, lat) {
    // console.log("Lon:", lon, ", Lat:", lat);

    const res = await axios.post(
      `http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=50&appid=9a6f2e544e3a8ce2e1271032a1ec02f8&units=metric`
    );

    const citiesData = res.data.list;
    setCities(citiesData);
    console.log(citiesData);
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
      <div className="col-10">
        <div className="row d-flex flex-wrap">
          {cities &&
            cities.map((city, index) => (
              <div
                className="m-3 p-3 bg-light d-flex align-items-center justify-content-center flex-column eachCity"
                key={index}
              >
                <h1>{city.name}</h1>
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
                  <span>
                    <img
                      className="weatherIcon"
                      src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
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
