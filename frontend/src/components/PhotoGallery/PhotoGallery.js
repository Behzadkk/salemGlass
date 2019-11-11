import React from "react";
import { Link } from "react-router-dom";

const PhotoGallery = props => {
  const dest = props.dest ? props.dest : "photos";
  return (
    <div className="card-group d-flex flex-wrap">
      {props.products.map((product, i) => (
        <div key={i} className="col-sm-6 col-xl-4  px-0 mb-4 d-flex">
          <div className="card mr-2">
            <Link to={`/${dest}/${product.subCat}`}>
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
                <h5 className="card-title d-inline">{product.name}</h5>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;
