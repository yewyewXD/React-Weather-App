import React, { useRef, useContext } from "react";
import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

export default function LandingPage() {
  const countryElRef = useRef();
  const { searchCountry } = useContext(GlobalContext);

  async function handleCountrySearch() {
    const country = countryElRef.current.value;
    searchCountry(country);
  }

  return (
    <main className="landing-page all-center-column">
      <div className="container">
        <div className="caption text-center text-white mb-5">
          <div className="display-1">Realtime Weather</div>
          <div className="h4 text-uppercase">
            from anywhere around the world
          </div>
        </div>
        <div className="search-box mx-auto all-center-column w-50">
          <div className="search-bar w-100 all-center">
            <input
              type="text"
              className="form-control"
              placeholder="Enter any country"
              ref={countryElRef}
            />

            <Link
              className="btn btn-lg text-white"
              onClick={handleCountrySearch}
              to="/search"
            >
              <GoSearch />
            </Link>
          </div>

          {/* search filter */}
          <div className="search-filter w-100 text-white flex-start">
            <span role="button">Advanced Search</span>
          </div>
        </div>
      </div>
    </main>
  );
}
