import React, { Component } from "react";
import AuthContext from "../../context/authContext";
import { Redirect } from "react-router-dom";
class PhotoHandler extends Component {
  constructor(props) {
    super(props);
    this.state = { photos: this.props.photos, ordered: false };
  }
  static contextType = AuthContext;

  frontHandler = (photo, num) => {
    const photos = this.state.photos;
    let index = photos.findIndex(p => p.original === photo);
    photos.splice(index - num, 0, photos.splice(index, 1)[0]);
    this.setState({ photos: photos });
  };
  backHandler = (photo, num) => {
    const photos = this.state.photos;
    let index = photos.findIndex(p => p.original === photo);
    photos.splice(index + num, 0, photos.splice(index, 1)[0]);
    this.setState({ photos: photos });
  };
  deletImageHandler = photo => {
    const photos = this.state.photos;
    let index = photos.findIndex(p => p.original === photo);
    photos.splice(index, 1);
    this.setState({ photos: photos });
    const source = photo.substring(7);
    const token = this.context.token;
    fetch(`/api/photos/projects${source}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => this.setState({ deleted: true }))
      .catch(err => {
        console.log(err);
      });
  };

  submitHandler = () => {
    const photos = this.state.photos.map(photo => photo.original);
    const token = this.context.token;
    const requestBody = { photos };
    fetch(`/api/photos/reorder`, {
      method: "PUT",
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
      .catch(err => {
        console.log(err);
      });
    this.setState({ ordered: true });
  };

  render() {
    return (
      <div className='card-deck'>
        {this.state.photos.map((photo, i) => (
          <div key={i} className='col-3'>
            <div className='card my-2'>
              <img
                src={photo.original}
                className='card-img-top'
                alt={photo.original}
              />
              <div className='card-body d-flex'>
                {i > 9 && (
                  <button
                    className='btn btn-secondary'
                    onClick={() => this.frontHandler(photo.original, 10)}
                  >
                    {"<10"}
                  </button>
                )}

                {i !== 0 && (
                  <button
                    className='btn btn-secondary'
                    onClick={() => this.frontHandler(photo.original, 1)}
                  >
                    {"<"}
                  </button>
                )}
                <button
                  className='btn btn-danger'
                  onClick={() => this.deletImageHandler(photo.original)}
                >
                  Delete Photo
                </button>
                {i !== this.state.photos.length - 1 && (
                  <button
                    className='btn btn-secondary'
                    onClick={() => this.backHandler(photo.original, 1)}
                  >
                    {">"}
                  </button>
                )}
                {i < this.state.photos.length - 10 && (
                  <button
                    className='btn btn-secondary'
                    onClick={() => this.backHandler(photo.original, 10)}
                  >
                    {"10>"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        <button
          className='btn btn-primary btn-lg btn-block'
          onClick={this.submitHandler}
        >
          Submit Photos Order
        </button>
        {this.state.ordered && <Redirect to='/' exact />}
      </div>
    );
  }
}

export default PhotoHandler;
