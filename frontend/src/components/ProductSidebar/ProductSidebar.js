import React from "react";
import { Link } from "react-router-dom";

const ProductSidebar = props => (
  <ul className="nav flex-column">
    {props.photos[0] ? (
      <li className="nav-item d-flex border-bottom py-3">
        <Link to={`/photos/${props.product.subCat}`}>
          <div>
            <img
              className="img-thumbnail side-image mr-2"
              src={props.photos[0].original}
              alt={props.product.subCat}
            />
            <p className="d-inline small">{props.product.name} Gallery</p>
          </div>
        </Link>
      </li>
    ) : (
      <Link to="/gallery">
        <div>
          <img
            className="img-thumbnail side-image mr-2"
            src="/xray-logo.jpg"
            alt={props.product.subCat}
          />
          <p className="d-inline small"> Gallery</p>
        </div>
      </Link>
    )}

    {props.product.projects ? (
      <li className="nav-item d-flex border-bottom py-3">
        <Link to={`/${props.product.prodId}/projects`}>
          <div>
            <img
              className="img-thumbnail side-image mr-2"
              src={
                props.photos[1] ? props.photos[1].original : "/xray-logo.jpg"
              }
              alt="gallery"
            />
            <p className="d-inline small">{props.product.name} Projects</p>
          </div>
        </Link>
      </li>
    ) : (
      <li className="nav-item d-flex border-bottom py-3">
        <Link to="/projects">
          <div>
            <img
              className="img-thumbnail side-image mr-2"
              src={
                props.photos[1] ? props.photos[1].original : "/xray-logo.jpg"
              }
              alt="gallery"
            />
            <p className="d-inline small">Recent Projects</p>
          </div>
        </Link>
      </li>
    )}

    <li className="nav-item d-flex border-bottom py-3">
      <Link to="/drawings">
        <div>
          <img
            className="img-thumbnail side-image mr-2"
            src="/images/318355_pdf_icon.jpg"
            alt="drawings"
          />
          {props.product.drawings ? (
            <p className="d-inline small">{props.product.name} Drawings</p>
          ) : (
            <p className="d-inline small">All Drawings</p>
          )}
        </div>
      </Link>
    </li>
  </ul>
);

export default ProductSidebar;
