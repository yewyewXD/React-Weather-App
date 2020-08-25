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
  }

  return (
    <>
      <div className="form-row">
        {countryData &&
          countryData.map((country, index) => (
            <div className="row mt-3" key={index}>
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
      <City cities={cities} />
    </>
  );
}
