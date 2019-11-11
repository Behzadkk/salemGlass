import React from "react";
import "./image-gallery.css";
import "./image-gallery-no-icon.css";

import ImageGallery from "react-image-gallery";

const ProductGallery = props => {
  return (
    <div className="gallery-container">
      <ImageGallery items={props.photos} />
    </div>
  );
};

export default ProductGallery;
