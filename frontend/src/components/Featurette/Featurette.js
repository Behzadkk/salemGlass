import React from "react";
import AboutUs from "./AboutUs/AboutUs";
import "./Featurette.css";
import Info from "./Info/Info";
import ProjVideos from "./ProjVideos/ProjVideos";
import { Link } from "react-router-dom";
import { Markup } from "interweave";

const Featurette = props => (
  <div className="container marketing mt-5">
    <Info details={props.details} />
    <hr className="featurette-divider" />
    <AboutUs details={props.details} />
    <hr className="featurette-divider" />
    <div className="my-5">
      <Markup content={props.details.productsHeading} />
    </div>
    <div className="d-flex flex-wrap">
      {props.products.map((product, i) => (
        <div key={i} className="col-6 col-xl-4  px-0 mb-4 d-flex">
          <div className="card mx-2">
            <Link to={`/products/${product.subCat}`}>
              <img
                className="card-img-top height-inherit"
                src={
                  product.mainPhotos
                    ? product.mainPhotos
                    : "/images/noImage.jpg"
                }
                alt={product.name}
              />
              <div className="card-body text-center">
                <h5 className="d-none card-title d-sm-inline">
                  {product.name}
                </h5>
                <p className="card-title d-sm-none">{product.name}</p>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
    <hr className="featurette-divider" />
    <ProjVideos
      videos={props.videos}
      videosHeading={props.details.videoHeading}
    />
  </div>
);

export default Featurette;
