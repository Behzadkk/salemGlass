import React from "react";
import { Fade } from "react-slideshow-image";
import "./Carousel.css";

const Carousel = props => {
  const fadeImages = props.photos.map(p => p.source);
  const fadeProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true
  };
  return (
    <div className="slide-container">
      <Fade {...fadeProperties}>
        {fadeImages.map((photo, i) => (
          <div key={i} className="each-fade">
            <div className="image-container ">
              <img src={photo} alt={photo} />
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
};
export default Carousel;
