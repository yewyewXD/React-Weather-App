import React, { useRef, useContext } from "react";
import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

export default function LandingPage() {
  const countryElRef = useRef();
  const { searchPlace } = useContext(GlobalContext);

  async function handlePlaceSearch() {
    const country = countryElRef.current.value;
    searchPlace(country);
  }

  function runPlaceSearch(e) {
    if (e.keyCode === 13) {
      document.getElementById("searchPlaceBtn").click();
    }
  }

  return (
    <main className="landing-page all-center-column">
      <div className="container">
        <div className="caption text-center text-white mb-5">
          <div className="title light">Realtime Weather</div>
          <div className="subtitle bold text-uppercase">
            from anywhere around the world
          </div>
        </div>

        <div className="search-box mx-auto all-center-column">
          <div className="search-bar w-100 all-center">
            <input
              type="text"
              className="form-control semi-bold mr-sm-3 mr-2"
              placeholder="Enter a country or city"
              ref={countryElRef}
              onKeyUp={runPlaceSearch}
            />

            <Link
              className="btn btn-lg text-white p-0"
              onClick={handlePlaceSearch}
              to="/search"
              id="searchPlaceBtn"
            >
              <GoSearch />
            </Link>
          </div>

          {/* search filter */}
          <div className="search-filter w-100 text-white flex-start">
            {/* <span role="button">Advanced Search</span> */}
          </div>
        </div>
      </div>
    </main>
  );
}
