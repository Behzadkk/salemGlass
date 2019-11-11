import React from "react";
import { MDBCol } from "mdbreact";
import { Link } from "react-router-dom";
const FooterMenu = props => (
  <MDBCol md="3" sm="6" className=" text-left">
    <h5 className="title">{props.data.groupName}</h5>
    <ul className="pl-2">
      {props.data.link1 && (
        <li className="list-unstyled">
          <Link to={props.data.link1}>{props.data.text1}</Link>
        </li>
      )}
      {props.data.link2 && (
        <li className="list-unstyled">
          <Link to={props.data.link2}>{props.data.text2}</Link>
        </li>
      )}
      {props.data.link3 && (
        <li className="list-unstyled">
          <Link to={props.data.link3}>{props.data.text3}</Link>
        </li>
      )}
      {props.data.link4 && (
        <li className="list-unstyled">
          <Link to={props.data.link4}>{props.data.text4}</Link>
        </li>
      )}
      {props.data.link5 && (
        <li className="list-unstyled">
          <Link to={props.data.link5}>{props.data.text5}</Link>
        </li>
      )}
    </ul>
  </MDBCol>
);

export default FooterMenu;
