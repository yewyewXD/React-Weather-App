import React, { useContext } from "react";
import { FaCity } from "react-icons/fa";
import { GlobalContext } from "../../context/GlobalState";

export default function Cities() {
  const { nearbyData, searchCity } = useContext(GlobalContext);

  if (nearbyData) {
    console.log(nearbyData);
  }

  return (
    <div className="cities text-white">
      {/* First row */}
      <div className="row city-row">
        <div className="city nearby-city col-xl-3 col-md-6 bg-dark all-center-column p-0">
          <FaCity className="icon" />
          <div className="mt-3 text-center title">Nearby Cities</div>
        </div>
        {nearbyData &&
          nearbyData.slice(1, 4).map((city) => (
            <div
              className="city col-xl-3 col-md-6 bg-dark p-0"
              key={city.id}
              onClick={() =>
                searchCity(city.id, city.main.temp, city.weather[0].main)
              }
            >
              <div className="overlay w-100 h-100 all-center-column"></div>
              <div className="caption all-center-column">
                <div className="name subtitle">{city.name}</div>
                <div className="temperature title semi-bold">
                  {Math.round(city.main.temp)}&deg;C
                </div>
                <div className="weather subtitle">{city.weather[0].main}</div>
              </div>
            </div>
          ))}
      </div>

      {/* second row */}
      <div className="row city-row">
        {nearbyData &&
          nearbyData.slice(4, 9).map((city) => (
            <div
              className="city col-xl-3 col-md-6 bg-dark p-0"
              key={city.id}
              onClick={() =>
                searchCity(city.id, city.main.temp, city.weather[0].main)
              }
            >
              <div className="overlay w-100 h-100 all-center-column"></div>
              <div className="caption all-center-column">
                <div className="subtitle name">{city.name}</div>
                <div className="title temperature semi-bold">
                  {Math.round(city.main.temp)}&deg;C
                </div>
                <div className="subtitle weather">{city.weather[0].main}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
