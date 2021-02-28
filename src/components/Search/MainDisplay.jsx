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

export default function MainDisplay({ placeData, isLoadingWeather }) {
  const extremeWeather = [
    "Mist",
    "Smoke",
    "Haze",
    "Dust",
    "Fog",
    "Sand",
    "Dust",
    "Ash",
    "Squall",
    "Tornado",
  ];

  const rainyWeather = ["Rain", "Drizzle"];

  function handleDarkWeatherCheck(weather) {
    return rainyWeather.includes(weather) || extremeWeather.includes(weather);
  }

  function getBackgroundByTemp() {
    if (placeData) {
      const temp = Math.round(+placeData.temperature);
      const weather = placeData.weather;

      if (temp >= 24) {
        // Summer
        return handleDarkWeatherCheck(weather) ? rainySummerBg : summerBg;
      } else if (temp >= 15 && temp <= 23) {
        // Autumn
        return handleDarkWeatherCheck(weather) ? rainyAutumnBg : autumnBg;
      } else if (temp >= 7 && temp <= 14) {
        // Spring
        return handleDarkWeatherCheck(weather) ? rainySpringBg : springBg;
      } else {
        // Winter
        return handleDarkWeatherCheck(weather) ? rainyWinterBg : winterBg;
      }
    } else {
      return winterBg;
    }
  }

  function handleGetWeatherIcon(weather) {
    if (weather === "Clear") {
      return <BiSun />;
    } else if (weather === "Clouds") {
      return <FiCloud />;
    } else if (rainyWeather.includes(weather)) {
      return <FiCloudRain />;
    } else if (weather === "ThunderStorm") {
      return <RiThunderstormsLine />;
    } else if (extremeWeather.includes(weather)) {
      return <RiTornadoLine />;
    } else if (weather === "Snow") {
      return <RiSnowyLine />;
    } else {
      return "";
    }
  }

  return (
    <div className="main-display py-5 all-center position-relative">
      <div
        className="background h-100 w-100 position-absolute"
        style={{
          backgroundImage: `url(${getBackgroundByTemp()})`,
          filter: isLoadingWeather ? "blur(5px)" : "none",
        }}
      ></div>

      <div className="overlay h-100 w-100 position-absolute"></div>

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
