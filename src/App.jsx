import React from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center flex-column">
        <SearchBar />
      </div>
    </div>
  );
}

export default App;
