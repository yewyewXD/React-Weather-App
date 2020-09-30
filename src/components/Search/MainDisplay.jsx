import React from "react";

export default function MainDisplay({ placeData }) {
  const background =
    "https://images.unsplash.com/photo-1491002052546-bf38f186af56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1383&q=80";
  return (
    <div
      className="main-display py-5 all-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="overlay w-100 position-absolute"></div>
      <div
        className={`container ${
          placeData
            ? "d-flex justify-content-md-end justify-content-center"
            : "all-center"
        }`}
      >
        <span className="caption text-white text-center all-center-column">
          {/* If we have data */}
          {placeData && (
            <>
              <div className="subtitle light place-name">{placeData.name}</div>
              <div className="title bold temperature">
                {Math.round(placeData.temperature)}&deg;C
              </div>
              <div className="subtitle light weather">{placeData.weather}</div>
            </>
          )}

          {/* If we don't have data */}
          {!placeData && (
            <div className="subtitle semi-bold">The search result is empty</div>
          )}
        </span>
      </div>
    </div>
  );
}
