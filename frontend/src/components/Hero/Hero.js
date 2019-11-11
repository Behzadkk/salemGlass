import React from "react";
import { Markup } from "interweave";

const Hero = props => (
  <div className="bg-dark text-white p-3">
    <div className="container">
      <div className="d-none d-md-block">
        <Markup content={props.text.hero} />
      </div>
      <div className="d-md-none">
        <Markup content={props.text.heroMobile} />
      </div>
    </div>
  </div>
);

export default Hero;
