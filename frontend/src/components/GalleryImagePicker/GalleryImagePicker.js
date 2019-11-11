import React, { Component } from "react";
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";

class GalleryImagePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };

    this.onPick = this.onPick.bind(this);
  }

  onPick(image) {
    this.setState({ image });
  }

  render() {
    return (
      <div>
        <div className="selector-container">
          <ImagePicker
            images={this.props.photos.map((image, i) => ({
              imageId: image._id,
              src: image.original,
              value: i
            }))}
            onPick={this.onPick}
          />
        </div>

        <button
          className="btn btn-lg btn-success btn-block my-2"
          type="button"
          onClick={() => this.props.selectedImages(this.state.image)}
        >
          Confirm the photo
        </button>
      </div>
    );
  }
}

export default GalleryImagePicker;
