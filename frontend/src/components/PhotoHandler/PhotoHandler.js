import React from "react";

const PhotoHandler = props => (
  <div className="card-deck">
    {props.photos.map((photo, i) => (
      <div key={i} className="col-3">
        <div className="card my-2">
          <img
            src={photo.original}
            className="card-img-top"
            alt={photo.original}
          />
          <div className="card-body">
            <button
              className="btn btn-danger"
              onClick={() => props.deletHandler(photo.original)}
            >
              Delet Photo
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default PhotoHandler;
