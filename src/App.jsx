import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";

// styles
import "bootstrap/dist/css/bootstrap.css";
import "./styles/global.scss";
import "./styles/LandingStyles.scss";
import "./styles/SearchStyles.scss";

// pages
import SearchPage from "./pages/SearchPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/search" component={SearchPage} />
        </Switch>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
