import React from "react";
import { Markup } from "interweave";

const Info = props => (
  <div className="row featurette justify-content-around">
    <div className="col-lg-6">
      <div className="lead my-5">
        <Markup content={props.details.info} />
      </div>
    </div>
    <div className="col-lg-5">
      <img
        className="w-100 mt-4"
        src={props.details.infoPhoto}
        alt="about xray glazing"
      />
    </div>
  </div>
);
export default Info;
