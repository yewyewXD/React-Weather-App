import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MainDisplay from "../components/Search/MainDisplay";
import { GlobalContext } from "../context/GlobalState";
import Cities from "../components/Search/Cities";

export default function SearchPage() {
  const { placeData, isCountry } = useContext(GlobalContext);

  return (
    <main className="search-page bg-dark">
      {/* banner */}
      <div className="banner bg-dark text-white py-4">
        <div className="container">
          <Link className="text-light" to="/">
            Weather Search
          </Link>
          <span className="mx-2">/</span>
          <Link className="text-light" to="/search">
            {placeData ? placeData.name : ""}
          </Link>
        </div>
      </div>

      {/* main display */}
      <MainDisplay placeData={placeData} />

      {/* country overview  */}
      <div className="country-overview py-5 bg-dark text-white">
        <div className="container">
          <div className="title light mb-2">
            {" "}
            {placeData ? placeData.name : ""}
            {isCountry ? "" : `, ${placeData.countryCode}`}
          </div>
          <div className="subtitle semi-bold mb-3 text-muted">
            Timezone: {placeData ? placeData.timezone : ""}
          </div>
          {placeData?.description && (
            <p className="description text-light">{placeData.description}</p>
          )}
        </div>
      </div>

      {/* cities */}
      <Cities />
    </main>
  );
}
