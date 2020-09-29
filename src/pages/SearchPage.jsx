import React from "react";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";

export default function SearchPage() {
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
          Europe
        </Link>
      </div>

      {/* main display */}
      <div className="main-display py-5 all-center">
        <div className="container d-flex justify-content-end">
          <span className="caption text-white text-center all-center-column">
            <div className="h4 date">Wed Dec 04</div>
            <div className="display-1 temperature">3&deg;C</div>
            <div className="h4 weather">Mostly Cloudy</div>
          </span>
        </div>
      </div>

      {/* country overview  */}
      <div className="country-overview p-5 bg-dark text-white">
        <h1>Switzerland</h1>
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
          <div className="city city-title col-lg-3 col-md-6 bg-dark all-center-column">
            <h1>testing</h1>
          </div>
          <div className="city col-lg-3 col-md-6 bg-dark all-center-column">
            testing
          </div>
          <div className="city col-lg-3 col-md-6 bg-dark all-center-column">
            testing
          </div>
          <div className="city col-lg-3 col-md-6 bg-dark all-center-column">
            testing
          </div>
        </div>

        <div className="row city-row">
          <div className="city col-lg-3 col-md-6 bg-dark all-center-column">
            testing
          </div>
          <div className="city col-lg-3 col-md-6 bg-dark all-center-column">
            testing
          </div>
          <div className="city col-lg-3 col-md-6 bg-dark all-center-column">
            testing
          </div>
          <div className="city col-lg-3 col-md-6 bg-dark all-center-column">
            testing
          </div>
        </div>
      </div>

      <SearchBar />
    </main>
  );
}
