import React from "react";

import "./Modal.css";

const Modal = props => {
  return (
    <div className="modal-d modals-d">
      <div className="">
        <section className=" item modal__contents">{props.children}</section>
      </div>
    </div>
  );
};

export default Modal;
