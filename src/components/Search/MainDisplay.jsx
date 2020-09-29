import React from "react";

export default function MainDisplay({ placeData }) {
  return (
    <div
      className={`main-display py-5 all-center ${
        placeData ? "active" : "inactive"
      }`}
    >
      <div
        className={`container ${
          placeData ? "d-flex justify-content-end" : "all-center"
        }`}
      >
        <span className="caption text-white text-center all-center-column">
          {/* If we have data */}
          {placeData && (
            <>
              <div className="h4 date">Wed Dec 04</div>
              <div className="display-1 temperature">
                {Math.round(placeData.temperature)}&deg;C
              </div>
              <div className="h4 weather">Mostly Cloudy</div>
            </>
          )}

          {/* If we don't have data */}
          {!placeData && <h1>The search result is empty</h1>}
        </span>
      </div>
    </div>
  );
}
