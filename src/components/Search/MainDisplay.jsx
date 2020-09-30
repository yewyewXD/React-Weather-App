import React from "react";
import { BiSun } from "react-icons/bi";
// 01
import { FiCloud, FiCloudRain } from "react-icons/fi";
// 02, 03, 04 // 09,10
import {
  RiTornadoLine,
  RiThunderstormsLine,
  RiSnowyLine,
} from "react-icons/ri";
// 50 // 11 // 13 d

export default function MainDisplay({ placeData }) {
  const background =
    "https://images.unsplash.com/photo-1491002052546-bf38f186af56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1383&q=80";

  function getWeatherIcon(weather) {
    switch (weather) {
      case "Clear":
        return <BiSun />;
      case "Clouds":
        return <FiCloud />;
      case "Rain" || "Drizzle":
        return <FiCloudRain />;
      case "ThunderStorm":
        return <RiThunderstormsLine />;
      case "Atmosphere":
        return <RiTornadoLine />;
      case "Snow":
        return <RiSnowyLine />;
      default:
        return "";
    }
  }

  return (
    <div
      className="main-display py-5 all-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="overlay w-100 position-absolute"></div>
      <div
        className={`container ${
          placeData
            ? "d-flex justify-content-md-end justify-content-center"
            : "all-center"
        }`}
      >
        <span className="caption text-white text-center all-center-column">
          {/* If we have data */}
          {placeData && (
            <>
              <div className="subtitle light place-name">{placeData.name}</div>
              <div className="title bold temperature">
                {Math.round(placeData.temperature)}&deg;C
              </div>
              <div className="subtitle light weather all-center">
                {getWeatherIcon(placeData.weather)}
                <span className="m-0 ml-2">{placeData.weather}</span>
              </div>
            </>
          )}

          {/* If we don't have data */}
          {!placeData && (
            <div className="subtitle semi-bold">The search result is empty</div>
          )}
        </span>
      </div>
    </div>
  );
}
