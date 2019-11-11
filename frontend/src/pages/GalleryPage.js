import React, { Component } from "react";
import PhotoGallery from "../components/PhotoGallery/PhotoGallery";
import { Markup } from "interweave";
import AuthContext from "../context/authContext";
import EditPages from "../components/EditPages/EditPages";
import ProjVideos from "../components/Featurette/ProjVideos/ProjVideos";

class GalleryPage extends Component {
  constructor(props) {
    super(props);
    this.videosEl = React.createRef();
  }
  state = {
    isEditing: false,
    edit: {},
    videos: null
  };
  static contextType = AuthContext;
  editingPage = () => {
    this.setState(prevState => {
      return { isEditing: !prevState.isEditing };
    });
  };
  componentDidMount() {
    this.findVideos();
    window.scrollTo(0, 0);
  }
  findVideos = () => {
    const videos =
      this.props.pageDetails.videos &&
      JSON.parse(
        "[" +
          this.props.pageDetails.videos.replace(new RegExp("'", "g"), '"') +
          "]"
      );
    this.setState({ videos });
  };
  textEl = value => {
    this.setState(prevState => {
      const edit = prevState.edit;
      edit.pageText = value;
      return { edit };
    });
  };
  editHandler = e => {
    e.preventDefault();
    const videoLinks = this.videosEl.current.value;
    let videos = null;
    if (videoLinks.length > 3) {
      videos = videoLinks
        .split(",")
        .map(v => {
          return JSON.stringify({ src: v });
        })
        .join(",")
        .replace(new RegExp('"', "g"), "'");
    }
    const edit = this.state.edit;
    edit["videos"] = videos;
    const requestBody = { ...edit };
    const token = this.context.token;
    fetch(`/api/pages/${this.props.pageDetails.pageId}`, {
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
    this.setState({ isEditing: false });
  };

  render() {
    return (
      <div className="container">
        {this.context.token && (
          <div className="container">
            <button
              className="btn btn-sm btn-warning"
              onClick={this.editingPage}
            >
              Edit {this.props.pageDetails.pageName} page
            </button>
          </div>
        )}
        {this.state.isEditing && (
          <EditPages
            data={this.props.pageDetails}
            textInput={this.textEl}
            onConfirm={this.editHandler}
            videos={this.state.videos}
            videosInput={this.videosEl}
          />
        )}
        <div className="my-5">
          <Markup content={this.props.pageDetails.pageText} />
        </div>

        <PhotoGallery products={this.props.products} />
        {this.state.videos && (
          <div className="container">
            <ProjVideos
              videos={this.state.videos}
              videosHeading={this.props.products.videoHeading}
            />
          </div>
        )}
      </div>
    );
  }
}

export default GalleryPage;
