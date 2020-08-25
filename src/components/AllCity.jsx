import React, { useState } from "react";
import axios from "axios";

export default function AllCity({ countryData }) {
  async function fetchCityWeather(lon, lat) {
    console.log("Lon:", lon, ", Lat:", lat);

    const res = await axios.post(
      `http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=30&appid=9a6f2e544e3a8ce2e1271032a1ec02f8&units=metric`
    );

    const data = res.data.list;
    console.log(data);
  }

  return (
    <>
      <div className="form-row">
        {countryData &&
          countryData.map((country, index) => (
            <div className="row mt-3" key={index}>
              <button
                className="btn btn-secondary btn-md"
                onClick={(e) => {
                  e.preventDefault();
                  fetchCityWeather(country.lon, country.lat);
                }}
              >
                Fetch more
              </button>
            </div>
          ))}
      </div>
    </>
  );
}
