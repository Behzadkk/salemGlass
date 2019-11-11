import React from "react";

const Options = props => (
  <option
    value={
      props.category.prodId ? props.category.prodId : props.category.projId
    }
  >
    {props.category.name}
  </option>
);

export default Options;
