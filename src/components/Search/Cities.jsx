import React, { useContext } from "react";
import { FaCity } from "react-icons/fa";
import { GlobalContext } from "../../context/GlobalState";

export default function Cities() {
  const { citiesData, searchPlace } = useContext(GlobalContext);

  if (citiesData) {
    console.log(citiesData);
  }

  return (
    <div className="cities text-white">
      {/* First row */}
      <div className="row city-row">
        <div className="city city-title col-xl-3 col-md-6 bg-dark all-center-column">
          <FaCity size="5em" />
          <div className="display-4 mt-3 text-center">Nearby Cities</div>
        </div>
        {citiesData &&
          citiesData.slice(1, 4).map((city) => (
            <div
              className="city col-xl-3 col-md-6 bg-dark p-0"
              key={city.id}
              onClick={() => searchPlace(city.name)}
            >
              <div className="overlay w-100 h-100 all-center-column"></div>
              <div className="caption all-center-column">
                <div className="h5 name">{city.name}</div>
                <div className="display-4 temperature">
                  {Math.round(city.main.temp)}&deg;C
                </div>
                <div className="h5 weather">{city.weather[0].main}</div>
              </div>
            </div>
          ))}
      </div>

      <div className="row city-row">
        {citiesData &&
          citiesData.slice(4, 9).map((city) => (
            <div
              className="city col-xl-3 col-md-6 bg-dark p-0"
              key={city.id}
              onClick={() => searchPlace(city.name)}
            >
              <div className="overlay w-100 h-100 all-center-column"></div>
              <div className="caption all-center-column">
                <div className="h5 name">{city.name}</div>
                <div className="display-4 temperature">
                  {Math.round(city.main.temp)}&deg;C
                </div>
                <div className="h5 weather">{city.weather[0].main}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
