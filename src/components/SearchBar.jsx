import React from "react";

export default function SearchBar() {
  return (
    <div className="form-row">
      <div className="col-8">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a country"
        />
      </div>

      <button className="btn btn-primary btn-md">Search</button>
    </div>
  );
}
