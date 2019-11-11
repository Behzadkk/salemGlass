import React from "react";
import { NavLink } from "react-router-dom";

const DropDown = props => {
  const navItems = props.products.map((product, i) => {
    return (
      <NavLink
        key={i}
        to={"/products/" + product.subCat}
        className="dropdown-item"
      >
        {product.name}
      </NavLink>
    );
  });
  return (
    <li className="nav-item dropdown">
      <NavLink
        className="nav-link dropdown-toggle"
        id="dropdown01"
        to={props.link ? "/category/" + props.link : "/category/" + props.name}
      >
        {props.name}
      </NavLink>
      <div
        className="dropdown-menu dropdown-content m-0 p-0"
        onClick={props.clickHandler}
      >
        {navItems}
      </div>
    </li>
  );
};

export default DropDown;
