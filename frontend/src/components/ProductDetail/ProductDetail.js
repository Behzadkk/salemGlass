import React from "react";
import { Markup } from "interweave";

const ProductDetail = props => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="my-5">
          <div id="exTab2">
            <ul className="nav nav-tabs justify-content-between justify-content-sm-start">
              <li className="nav-item">
                <a
                  href="#description"
                  data-toggle="tab"
                  className="nav-link active p-2"
                >
                  Descriptions
                </a>
              </li>
              {props.product.keyFeatures && (
                <li className="nav-item">
                  <a
                    href="#ketFeatures"
                    data-toggle="tab"
                    className="nav-link p-2"
                  >
                    Key Features
                  </a>
                </li>
              )}
              {props.product.moreDetails && (
                <li className="nav-item">
                  <a
                    href="#moreDetails"
                    data-toggle="tab"
                    className="nav-link p-2"
                  >
                    More Details
                  </a>
                </li>
              )}
            </ul>
            <div className="tab-content product-tabs">
              <div className="tab-pane active" id="description">
                {props.product.mainPhotos && (
                  <img
                    className="img-thumbnail float-left mr-3 detail-photo"
                    src={props.product.mainPhotos}
                    alt={props.product.subCat}
                  />
                )}
                <Markup content={props.product.description} />
              </div>
              <div className="tab-pane" id="ketFeatures">
                <Markup content={props.product.keyFeatures} />
              </div>
              <div className="tab-pane" id="moreDetails">
                <Markup content={props.product.moreDetails} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
