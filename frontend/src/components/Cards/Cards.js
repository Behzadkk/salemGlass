import React from "react";

const Cards = () => (
  <div className="row">
    <div className="container my-5">
      <div className="card-deck">
        <div className="card">
          <img
            src="https://cdn.pixabay.com/photo/2017/04/24/13/37/architecture-2256489_960_720.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Quality and Design</h5>
            <p className="card-text">
              XRAY GLAZING brings your home the best quality and design.
            </p>
          </div>
        </div>
        <div className="card">
          <img
            src="https://cdn.pixabay.com/photo/2017/04/24/13/37/architecture-2256489_960_720.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Wide Range</h5>
            <p className="card-text">
              We are one of the UK leading producers of windows and doors
              systems, offering a wide range of products and manufactures to
              your individual requirements.
            </p>
          </div>
        </div>
        <div className="card">
          <img
            src="https://cdn.pixabay.com/photo/2017/04/24/13/37/architecture-2256489_960_720.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Experienced</h5>
            <p className="card-text">
              With over 10 Years experience in design and manufacture, which is
              manufactured in our factory and intalled to your home or building
              with our profesional team of fitters.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Cards;
