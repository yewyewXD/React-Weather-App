import React, { useRef } from "react";
import CountryDatalist from "./CountryDatalist";

export default function SearchBar() {
  const countryEl = useRef();

  async function handleCountrySearch() {
    const selectedCountry = countryEl.current.value;
    console.log("Selected Country:", selectedCountry);

    const res = await fetch(
      "https://parseapi.back4app.com/classes/Continentscountriescities_City?limit=4&order=cityId,country,name&keys=name,country,cityId",
      {
        headers: {
          "X-Parse-Application-Id": "OnFZE2MGDk9qVwzeOxLS7oeBR9Oc0ZyrzRBGy2Vc",
          "X-Parse-REST-API-Key": "QtabV9ysL0bRYBFQQJpnJaJmwo9S2ctaT2Z3RCva",
        },
      }
    );
    console.log(res.data);
  }

  return (
    <div className="form-row">
      {/* Search Input */}
      <div className="col-8">
        <input
          type="search"
          className="form-control"
          placeholder="Enter a country"
          list="countries"
          ref={countryEl}
        />
      </div>

      {/* All Country Datalist */}
      <CountryDatalist />

      {/* Search Button */}
      <button className="btn btn-primary btn-md" onClick={handleCountrySearch}>
        Search
      </button>
    </div>
  );
}
