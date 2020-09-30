import React, { useContext } from "react";
import { FaCity } from "react-icons/fa";
import { GlobalContext } from "../../context/GlobalState";

export default function Cities() {
  const { nearbyData, searchPlace } = useContext(GlobalContext);

  return (
    <div className="cities text-white">
      {/* First row */}
      <div className="row city-row">
        <div className="city nearby-city col-xl-3 col-sm-6 bg-dark all-center-column p-0">
          <FaCity className="icon" />
          <div className="mt-3 text-center title">Nearby Cities</div>
        </div>
        {nearbyData &&
          nearbyData.slice(0, 3).map((city) => (
            <div
              className="city col-xl-3 col-sm-6 bg-dark p-0"
              key={city.name}
              onClick={() => searchPlace(city.name)}
            >
              <div className="overlay w-100 h-100 all-center-column"></div>
              <div className="caption all-center-column">
                <div className="name subtitle">{city.name}</div>
                <div className="temperature title semi-bold">
                  {Math.round(city.temperature)}&deg;C
                </div>
                <div className="weather subtitle">{city.weather}</div>
              </div>
            </div>
          ))}
      </div>

      {/* second row */}
      <div className="row city-row">
        {nearbyData &&
          nearbyData.slice(3, 7).map((city) => (
            <div
              className="city col-xl-3 col-sm-6 bg-dark p-0"
              key={city.name}
              onClick={() => searchPlace(city.name)}
            >
              <div className="overlay w-100 h-100 all-center-column"></div>
              <div className="caption all-center-column">
                <div className="subtitle name">{city.name}</div>
                <div className="title temperature semi-bold">
                  {Math.round(city.temperature)}&deg;C
                </div>
                <div className="subtitle weather">{city.weather}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
