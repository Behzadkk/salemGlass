import React from "react";
import QuillEditor from "../QuillEditor/QuillEditor";
import Uploader from "../Uploader/Uploader";

const EditAboutUsPage = props => (
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
                className="form-control"
                type="text"
                id="section"
                ref={props.sectionInput}
                defaultValue={props.data.sectionName}
              />
            </div>
          </div>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="image">
              Upload banner
            </label>
            <div className="col-sm-9">
              <Uploader submitedImages={props.submitedImages} />
            </div>
          </div>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="bannerPhoto">
              Banner Photo
            </label>
            <div className="col-sm-9">
              <input
                readOnly={true}
                className="form-control"
                type="text"
                id="bannerPhoto"
                ref={props.bannerPhotoInput}
                defaultValue={props.data.banner}
              />
            </div>
          </div>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="textOne">
              First Text
            </label>
            <div className="col-sm-9">
              <QuillEditor
                text={props.data.textOne}
                editorValue={props.textOneInput}
              />
            </div>
          </div>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="image">
              Upload Second Image
            </label>
            <div className="col-sm-9">
              <Uploader submitedImages={props.test} />
            </div>
          </div>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="secondPhoto">
              Second Photo
            </label>
            <div className="col-sm-9">
              <input
                readOnly={true}
                className="form-control"
                type="text"
                id="secondPhoto"
                ref={props.photoInput}
                defaultValue={props.data.photo}
              />
            </div>
          </div>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="text2">
              Second Text
            </label>
            <div className="col-sm-9">
              <QuillEditor
                text={props.data.text2}
                editorValue={props.textTwoInput}
              />
            </div>
          </div>
          {props.data.id > 2 && (
            <div className="form-group row justify-content-between">
              <label className="my-2 mx-3" htmlFor="form heading">
                Contact form heading
              </label>
              <div className="col-sm-9">
                <QuillEditor
                  text={props.data.text2}
                  editorValue={props.formHInput}
                />
              </div>
            </div>
          )}
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

export default EditAboutUsPage;
