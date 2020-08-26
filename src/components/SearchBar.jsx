import React, { useRef, useState } from "react";
import axios from "axios";
import CountryDatalist from "./CountryDatalist";
import AllCity from "./AllCity.jsx";

export default function SearchBar() {
  const [countryData, setCountryData] = useState([]);
  const countryEl = useRef();

  async function handleCountrySearch() {
    const selectedCountry = countryEl.current.value.toLowerCase();
    // console.log("Selected Country:", selectedCountry);

    const res = await axios.post(
      `https://api.openweathermap.org/data/2.5/weather?q=${selectedCountry}&appid=9a6f2e544e3a8ce2e1271032a1ec02f8&units=metric`
    );
    const data = res.data;
    console.log(data);

    setCountryData((prevData) => {
      const newCountryData = [...prevData];
      newCountryData.push({
        name: data.name,
        lon: data.coord.lon,
        lat: data.coord.lat,
      });
      return newCountryData;
    });
  }

  // console.log(countryData);
  return (
    <>
      {/* Search Input */}
      <form>
        <div className="form-row d-flex align-items-center justify-content-center">
          <div className="col-md-4">
            <input
              type="search"
              className="form-control"
              placeholder="Enter a country"
              list="countries"
              ref={countryEl}
            />
          </div>
          {/* Search Button */}
          <button
            className="btn btn-primary btn-md mr-md-0 mr-auto ml-md-0 ml-1 mt-md-0 mt-3"
            onClick={(e) => {
              e.preventDefault();
              handleCountrySearch();
            }}
          >
            Search
          </button>
        </div>
      </form>
      {/* All Country Datalist */}
      <CountryDatalist />

      {/* Weather Condition */}
      <div className="row mt-3 d-flex align-items-md-start align-items-center justify-content-center overflow-auto">
        <span className="p-2 border-dark">
          Clear Sky{" "}
          <img src={`http://openweathermap.org/img/wn/01d@2x.png`} alt="" />
        </span>

        <span className="p-2 border-dark">
          Clouds{" "}
          <img src={`http://openweathermap.org/img/wn/02d@2x.png`} alt="" />
        </span>

        <span className="p-2 border-dark">
          Mist{" "}
          <img src={`http://openweathermap.org/img/wn/50d@2x.png`} alt="" />
        </span>

        <span className="p-2 border-dark">
          Snow{" "}
          <img src={`http://openweathermap.org/img/wn/13d@2x.png`} alt="" />
        </span>

        <span className="p-2 border-dark">
          Drizzle{" "}
          <img src={`http://openweathermap.org/img/wn/09d@2x.png`} alt="" />
        </span>

        <span className="p-2 border-dark">
          Rain{" "}
          <img src={`http://openweathermap.org/img/wn/10d@2x.png`} alt="" />
        </span>

        <span className="p-2 border-dark">
          Thunderstorm{" "}
          <img src={`http://openweathermap.org/img/wn/11d@2x.png`} alt="" />
        </span>
      </div>

      {/* Get Cities */}
      <AllCity countryData={countryData} />
    </>
  );
}
