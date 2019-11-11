import React from "react";
import "./ImageUpload.css";

import CategorySelector from "../CategorySelector/CategorySelector";
import Uploader from "../Uploader/Uploader";
import ProjectSelector from "../ProjectSelector/ProjectSelector";
import AuthContext from "../../context/authContext";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.catEl = React.createRef();
    this.projectEl = React.createRef();
    this.state = { savedFile: [] };
  }
  static contextType = AuthContext;
  _handleSubmit(e) {
    e.preventDefault();

    const category = this.catEl.current.value;
    const project = this.projectEl.current.value;
    const photos = this.state.savedFile.map(photo => {
      return { source: photo, category: category, project: project };
    });
    const requestBody = [...photos];
    const token = this.context.token;
    fetch("/api/gallery", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(res => {
        this.props.uploaded();
      })
      .catch(err => {
        console.log(err);
      });
  }
  imageChangeHandler = imageList => {
    const savedFile = imageList.map(image => image.secure_url);
    this.setState({ savedFile });
  };

  render() {
    return (
      <div className="previewComponent">
        <form onSubmit={e => this._handleSubmit(e)}>
          <div className="col-md-12 text-center">
            <h1 className="h3 mb-3 font-weight-normal">Upload Images</h1>
          </div>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="image">
              Upload Images
            </label>
            <div className="col-sm-9">
              <Uploader submitedImages={this.imageChangeHandler} />
            </div>
          </div>
          <CategorySelector categoryInput={this.catEl} />
          <ProjectSelector projectInput={this.projectEl} />
          <div className="form-group row justify-content-end mt-5 mt-sm-0">
            <div className="col-sm-9">
              <button
                onClick={e => this._handleSubmit(e)}
                className="btn btn-lg btn-primary btn-block"
                type="submit"
              >
                Append Photo
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ImageUpload;
