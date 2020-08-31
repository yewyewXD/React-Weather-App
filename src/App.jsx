import React from "react";
import "./global.css";
import "bootstrap/dist/css/bootstrap.css";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="w-100 text-center p-5">
      <h1>React Weather App</h1>
      <p className="mb-3">Get weather in major cities of a country</p>

      <SearchBar />
    </div>
  );
}

export default App;
