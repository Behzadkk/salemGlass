import React from "react";
import QuillEditor from "../QuillEditor/QuillEditor";

const EditPages = props => (
  <div className="container">
    <div className="row justify-content-center my-5">
      <div className="col-md-12">
        <form>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="section">
              Section Name
            </label>
            <div className="col-sm-9">
              <input
                readOnly={true}
                className="form-control"
                type="text"
                id="section"
                defaultValue={props.data.pageName}
              />
            </div>
          </div>
          {/* <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="image">
              Upload Banner
            </label>
            <div className="col-sm-9">
              <Uploader submitedImages={props.submitedInfoPhoto} />
            </div>
          </div>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="infoPhoto">
              Banner Photo
            </label>
            <div className="col-sm-9">
              <input
                readOnly={true}
                className="form-control"
                type="text"
                id="infoPhoto"
                ref={props.infoPhotoInput}
                defaultValue={props.data.infoPhoto}
              />
            </div>
          </div> */}
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="textOne">
              Text
            </label>
            <div className="col-sm-9">
              <QuillEditor
                text={props.data.pageText}
                editorValue={props.textInput}
              />
            </div>
          </div>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="videos">
              videos
            </label>
            <div className="col-sm-9">
              <input
                className="form-control"
                type="text"
                id="videos"
                ref={props.videosInput}
                defaultValue={props.videos ? props.videos.map(v => v.src) : ""}
              />
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
  </div>
);
export default EditPages;
