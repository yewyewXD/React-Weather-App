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

import {
  springBg,
  rainySpringBg,
  summerBg,
  rainySummerBg,
  autumnBg,
  rainyAutumnBg,
  winterBg,
  rainyWinterBg,
} from "../../images/weatherBg";

export default function MainDisplay({ placeData }) {
  function darkAtmosphereCheck(weather) {
    if (
      weather === "Mist" ||
      "Smoke" ||
      "Haze" ||
      "Dust" ||
      "Fog" ||
      "Sand" ||
      "Dust" ||
      "Ash" ||
      "Squall" ||
      "Tornado"
    ) {
      return true;
    } else {
      return false;
    }
  }

  function rainyWeatherCheck(weather) {
    if (
      weather === "Rain" ||
      "Drizzle" ||
      "ThunderStorm" ||
      "Mist" ||
      "Smoke" ||
      "Haze" ||
      "Dust" ||
      "Fog" ||
      "Sand" ||
      "Dust" ||
      "Ash" ||
      "Squall" ||
      "Tornado"
    ) {
      return true;
    } else {
      return false;
    }
  }
  function getBackgroundByTemp() {
    if (placeData) {
      const temp = Math.round(+placeData.temperature);
      const weather = placeData.weather;

      if (temp >= 24) {
        // Summer
        return rainyWeatherCheck(weather) ? rainySummerBg : summerBg;
      } else if (temp >= 15 && temp <= 23) {
        // Autumn
        return rainyWeatherCheck(weather) ? rainyAutumnBg : autumnBg;
      } else if (temp >= 7 && temp <= 14) {
        // Spring
        return rainyWeatherCheck(weather) ? rainySpringBg : springBg;
      } else {
        // Winter
        return rainyWeatherCheck(weather) ? rainyWinterBg : winterBg;
      }
    } else {
      return winterBg;
    }
  }

  function handleGetWeatherIcon(weather) {
    switch (weather) {
      case "Clear":
        return <BiSun />;
      case "Clouds":
        return <FiCloud />;
      case "Rain" || "Drizzle":
        return <FiCloudRain />;
      case "ThunderStorm":
        return <RiThunderstormsLine />;
      case "Tornado":
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
      style={{ backgroundImage: `url(${getBackgroundByTemp()})` }}
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
                {handleGetWeatherIcon(placeData.weather)}
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
