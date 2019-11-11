import React from "react";

const AssetSelector = props => (
  <div className="row justify-content-center my-5">
    <div className="col-md-12 text-center">
      <h1 className="h3 mb-3 font-weight-normal">Select post type</h1>
    </div>
    <div className="col-md-12">
      <form>
        <div className="form-group row justify-content-between">
          <label className="my-2 mx-3" htmlFor="selector">
            Pick a data type
          </label>
          <div className="col-sm-9">
            <select
              className="form-control"
              id="selector"
              value="none"
              onChange={props.assetSelection}
            >
              <option value="none">Please select a data type</option>
              <option value="photo">Photo</option>
              <option value="product">Product</option>
              <option value="project">Project</option>
              <option value="drawing">Drawing</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  </div>
);

export default AssetSelector;
