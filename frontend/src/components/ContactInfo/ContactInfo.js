import React from "react";

const ContactInfo = props => (
  <div>
    <h5 className="title">{props.data.groupName}</h5>
    <ul className="pl-2">
      <li className="list-unstyled">
        <div className="row">
          <div className="col-1">
            <i className="fas fa-map-marker-alt"></i>
          </div>
          <a className="col-10" href={props.data.link1}>
            {props.data.text1}
          </a>
        </div>
      </li>
      <li className="list-unstyled">
        <div className="row">
          <div className="col-1">
            <i className="fas fa-phone"></i>
          </div>
          <a className="col-10" href={props.data.link2}>
            {props.data.text2}
          </a>
        </div>
      </li>
      <li className="list-unstyled">
        <div className="row">
          <div className="col-1">
            <i className="fas fa-mobile-alt"></i>
          </div>
          <a className="col-10" href={props.data.link3}>
            {props.data.text3}
          </a>
        </div>
      </li>
      <li className="list-unstyled">
        <div className="row">
          <div className="col-1">
            <i className="fas fa-at"></i>
          </div>
          <a className="col-10" href={props.data.link4}>
            {props.data.text4}
          </a>
        </div>
      </li>
    </ul>
  </div>
);

export default ContactInfo;
