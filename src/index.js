import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GlobalProvider } from "./context/GlobalState";

import "bootstrap/dist/css/bootstrap.css";
import "./styles/global.scss";

ReactDOM.render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
  document.getElementById("root")
);
