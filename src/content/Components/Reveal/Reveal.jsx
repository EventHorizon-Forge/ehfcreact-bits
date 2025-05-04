import React, { useEffect, useRef, useState } from "react";
import "./Reveal.css";

/**
 * Reveal component: animates its children in with a fade and slide-up effect.
 */
const Reveal = ({ children, className = "", delay = 0, ...props }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`reveal-animate${
        visible ? " reveal-animate--visible" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Reveal;
