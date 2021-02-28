import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// pages
import SearchPage from "./pages/SearchPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/search" component={SearchPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
