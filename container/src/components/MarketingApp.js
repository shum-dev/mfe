import React, { useRef, useEffect } from "react";

import { mount } from "marketing/MarketingApp";

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      mount(ref.current);
    }
  }, []);

  return <div ref={ref} />;
};
