import React from "react";
import ReactDom from "react-dom";

import { createMemoryHistory, createBrowserHistory } from "history";

import App from "./App";

// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory }) => {
  // use default if provided otherwise create a memoryHistory
  const history = defaultHistory ?? createMemoryHistory();

  // whenever some navigation occures this .listening()
  // function executes any function you have passed in
  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDom.render(<App history={history} />, el);

  return {
    onParentNavigate: ({ pathname: newPath }) => {
      const { pathname } = history.location;

      if (pathname === newPath) return;

      history.push(newPath);
    },
  };
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_auth-dev-root");

  // whenever we are in isolation mode
  // we create a browserHistory and pass in to mount() function
  const browserHistory = createBrowserHistory();

  if (devRoot) {
    mount(devRoot, { defaultHistory: browserHistory });
  }
}

// we are running through container
// and we should export the mount
export { mount };
