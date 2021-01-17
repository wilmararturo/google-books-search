import React from "react";
import "./style.css";

function Hero({ children }) {
  return <div className="jumbotron mt-4 hero">{children}</div>;
}

export default Hero;
