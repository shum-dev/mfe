import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Header from "./components/Header";

import MarketingApp from "./components/MarketingApp";
import AuthApp from "./components/AuthApp";

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default () => {
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header />

          <Switch>
            {/* important!!! they are not "exact" */}
            <Route path={"/auth"} component={AuthApp} />
            <Route path={"/"} component={MarketingApp} />
          </Switch>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
