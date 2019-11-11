import React from "react";
import QuillEditor from "../QuillEditor/QuillEditor";
import Uploader from "../Uploader/Uploader";

const EditLandPage = props => (
  <div className="container">
    <div className="row justify-content-center my-5">
      <div className="col-md-12">
        <form>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="image">
              Upload Main Photos
            </label>
            <div className="col-sm-9">
              <Uploader submitedImages={props.submitedImages} />
            </div>
          </div>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="carousel">
              Main Photos
            </label>
            <div className="col-sm-9">
              <input
                readOnly={true}
                className="form-control"
                type="text"
                id="carousel"
                ref={props.carouselInput}
                defaultValue={props.photos.map(p => p.source)}
              />
            </div>
          </div>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="hero">
              Main Text
            </label>
            <div className="col-sm-9">
              <QuillEditor
                text={props.data.hero}
                editorValue={props.heroInput}
              />
            </div>
          </div>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="heroMobile">
              Text Mobile
            </label>
            <div className="col-sm-9">
              <QuillEditor
                text={props.data.heroMobile}
                editorValue={props.heroMobileInput}
              />
            </div>
          </div>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="info">
              Info
            </label>
            <div className="col-sm-9">
              <QuillEditor
                text={props.data.info}
                editorValue={props.infoInput}
              />
            </div>
          </div>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="image">
              Upload Info Photo
            </label>
            <div className="col-sm-9">
              <Uploader submitedImages={props.submitedInfoPhoto} />
            </div>
          </div>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="infoPhoto">
              Info Photo
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
          </div>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="about">
              About Us
            </label>
            <div className="col-sm-9">
              <QuillEditor
                text={props.data.about}
                editorValue={props.aboutInput}
              />
            </div>
          </div>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="image">
              Upload About Section Photo
            </label>
            <div className="col-sm-9">
              <Uploader submitedImages={props.submitedAboutPhoto} />
            </div>
          </div>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="aboutPhoto">
              About Photo
            </label>
            <div className="col-sm-9">
              <input
                readOnly={true}
                className="form-control"
                type="text"
                id="aboutPhoto"
                ref={props.aboutPhotoInput}
                defaultValue={props.data.aboutPhoto}
              />
            </div>
          </div>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="videoHeading">
              Products Heading
            </label>
            <div className="col-sm-9">
              <QuillEditor
                text={props.data.productsHeading}
                editorValue={props.productHeadingInput}
              />
            </div>
          </div>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="videoHeading">
              Videos Heading
            </label>
            <div className="col-sm-9">
              <QuillEditor
                text={props.data.videoHeading}
                editorValue={props.videoHeadingInput}
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
                defaultValue={props.videos.map(v => v.src)}
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

export default EditLandPage;
