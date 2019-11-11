import React from "react";
import { Markup } from "interweave";

const AboutUs = props => (
  <div className="row featurette justify-content-around">
    <div className="col-lg-6 order-lg-2">
      <div className="lead my-3">
        <Markup content={props.details.about} />
      </div>
    </div>
    <div className="col-lg-5 order-lg-1">
      <img
        className="w-100 mt-4"
        src={props.details.aboutPhoto}
        alt="about xray glazing"
      />
    </div>
  </div>
);
export default AboutUs;
