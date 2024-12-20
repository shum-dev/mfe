import React, { useRef, useEffect } from "react";

import { mount } from "auth/AuthApp";

import { useHistory } from "react-router-dom";

export default ({ onSignIn }) => {
  const ref = useRef(null);

  const history = useHistory();

  useEffect(() => {
    if (ref.current) {
      const { onParentNavigate } = mount(ref.current, {
        initialPath: history.location.pathname,
        onNavigate: ({ pathname: newPath }) => {
          const { pathname } = history.location;

          // do nothing if we are already on the newPath
          if (pathname === newPath) return;

          history.push(newPath);
        },
        onSignIn: () => {
          onSignIn();
        },
      });

      history.listen(onParentNavigate);
    }
  }, []);

  return <div ref={ref} />;
};
