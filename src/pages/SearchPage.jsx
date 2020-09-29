import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MainDisplay from "../components/Search/MainDisplay";
import { FaCity } from "react-icons/fa";
import { GlobalContext } from "../context/GlobalState";

export default function SearchPage() {
  const { countryData, searchCities } = useContext(GlobalContext);

  if (countryData) {
    searchCities(countryData.latitude, countryData.longitude);
  }

  return (
    <main className="search-page">
      {/* banner */}
      <div className="banner bg-dark text-white pl-5 py-4">
        <Link className="text-light" to="/">
          Weather App
        </Link>
        <span className="mx-2">/</span>
        <Link className="text-light" to="/search">
          Search
        </Link>
        <span className="mx-2">/</span>
        <Link className="text-light" to="/search">
          {countryData ? countryData.name : ""}
        </Link>
      </div>

      {/* main display */}
      <MainDisplay countryData={countryData} />

      {/* country overview  */}
      <div className="country-overview p-5 bg-dark text-white">
        <h1> {countryData ? countryData.name : ""}</h1>
        <p className="text-muted">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          assumenda nobis maiores error, necessitatibus, maxime dolores libero,
          quo natus nam labore neque atque dignissimos unde delectus consequatur
          recusandae animi. Ducimus. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Voluptates quidem modi necessitatibus molestiae
          totam nisi est error culpa alias eius? Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Officia natus repellat consequatur qui
          dolorum magni unde error eveniet pariatur ullam, exercitationem eius,
          libero ad porro quis! Quis autem ipsam possimus doloremque animi
          soluta, officiis consequatur laboriosam eveniet itaque minus placeat.
        </p>
      </div>

      {/* cities */}
      <div className="cities text-white">
        <div className="row city-row">
          <div className="city city-title col-xl-3 col-md-6 bg-dark all-center-column">
            <FaCity size="5em" />
            <div className="display-4 mt-3">Cities</div>
          </div>
          <div className="city col-xl-3 col-md-6 bg-dark all-center-column">
            testing
          </div>
          <div className="city col-xl-3 col-md-6 bg-dark all-center-column">
            testing
          </div>
          <div className="city col-xl-3 col-md-6 bg-dark all-center-column">
            testing
          </div>
        </div>

        <div className="row city-row">
          <div className="city col-xl-3 col-md-6 bg-dark all-center-column">
            testing
          </div>
          <div className="city col-xl-3 col-md-6 bg-dark all-center-column">
            testing
          </div>
          <div className="city col-xl-3 col-md-6 bg-dark all-center-column">
            testing
          </div>
          <div className="city col-xl-3 col-md-6 bg-dark all-center-column">
            testing
          </div>
        </div>
      </div>
    </main>
  );
}
