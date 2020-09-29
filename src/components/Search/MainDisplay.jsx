import React from "react";

export default function MainDisplay({ countryData }) {
  return (
    <div
      className={`main-display py-5 all-center ${
        countryData ? "active" : "inactive"
      }`}
    >
      <div
        className={`container ${
          countryData ? "d-flex justify-content-end" : "all-center"
        }`}
      >
        <span className="caption text-white text-center all-center-column">
          {/* If we have data */}
          {countryData && (
            <>
              <div className="h4 date">Wed Dec 04</div>
              <div className="display-1 temperature">
                {countryData.temperature}&deg;C
              </div>
              <div className="h4 weather">Mostly Cloudy</div>
            </>
          )}

          {/* If we don't have data */}
          {!countryData && <h1>The search result is empty</h1>}
        </span>
      </div>
    </div>
  );
}
