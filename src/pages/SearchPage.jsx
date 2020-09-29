import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MainDisplay from "../components/Search/MainDisplay";
import { GlobalContext } from "../context/GlobalState";
import Cities from "../components/Search/Cities";

export default function SearchPage() {
  const { countryData } = useContext(GlobalContext);

  return (
    <main className="search-page bg-dark">
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
      <Cities />
    </main>
  );
}
