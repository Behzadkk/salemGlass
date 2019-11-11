import React from "react";
import QuillEditor from "../QuillEditor/QuillEditor";

const NewProject = props => {
  return (
    <div className="row justify-content-center my-5">
      <div className="col-md-12 text-center">
        <h1 className="h3 mb-3 font-weight-normal">Define A New Project</h1>
      </div>
      <div className="col-md-12">
        <form>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="name">
              Name
            </label>
            <div className="col-sm-9">
              <input
                className="form-control"
                type="text"
                id="name"
                placeholder="Project's name"
                ref={props.projectInput}
              />
            </div>
          </div>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="description">
              Description
            </label>
            <div className="col-sm-9">
              <QuillEditor editorValue={props.getEditorValue} />
            </div>
          </div>
          <div className="form-group row justify-content-end mt-5 mt-sm-0">
            <div className="col-sm-9">
              <button
                onClick={props.onConfirm}
                className="btn btn-lg btn-primary btn-block"
              >
                Submit!
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProject;
