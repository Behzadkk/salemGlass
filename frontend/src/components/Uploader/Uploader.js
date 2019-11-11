import React, { Component } from "react";
import Spinner from "../Spinner/Spinner";
import Images from "./Images";
import Buttons from "./Button";
import AuthContext from "../../context/authContext";
import "./Uploader.css";

export default class Uploader extends Component {
  state = {
    uploading: false,
    images: []
  };
  static contextType = AuthContext;
  onChange = e => {
    const token = this.context.token;
    const files = Array.from(e.target.files);
    const formData = new FormData();
    this.setState({ uploading: true });
    files.forEach((file, i) => {
      formData.append(i, file);
    });
    fetch("/image-upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(images => {
        this.setState({
          uploading: false,
          images
        });
        this.props.submitedImages(this.state.images);
      });
  };
  errorHandling = err => {
    console.log(err);
  };

  removeImage = id => {
    this.setState({
      images: this.state.images.filter(image => image.public_id !== id)
    });
  };

  render() {
    const { uploading, images } = this.state;

    const content = () => {
      switch (true) {
        case uploading:
          return <Spinner />;
        case images.length > 0:
          return (
            <Images
              images={images}
              removeImage={this.removeImage}
              onError={this.errorHandling}
            />
          );
        default:
          return <Buttons onChange={this.onChange} />;
      }
    };

    return (
      <div>
        <div className="buttons">{content()}</div>
      </div>
    );
  }
}
