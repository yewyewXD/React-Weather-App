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
        weather: data.weather[0].description,
        temp: data.main.temp,
      });
      return newCountryData;
    });
  }

  // console.log(countryData);
  return (
    <>
      {/* Search Input */}
      <div className="form-row d-flex align-items-center justify-content-center">
        <div className="col-4">
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
          className="btn btn-primary btn-md"
          onClick={handleCountrySearch}
        >
          Search
        </button>
      </div>

      {/* All Country Datalist */}
      <CountryDatalist />

      {/* Get Cities */}
      <AllCity countryData={countryData} />
    </>
  );
}
