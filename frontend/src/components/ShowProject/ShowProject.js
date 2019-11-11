import React, { Component } from "react";
import { Markup } from "interweave";
import EditProject from "../EditProject/EditProject";
import ProductGallery from "../ProductGallery/ProductGallery";
import { Redirect } from "react-router-dom";
import AuthContext from "../../context/authContext";
import Spinner from "../Spinner/Spinner";
import ProjVideos from "../Featurette/ProjVideos/ProjVideos";
import PhotoHandler from "../PhotoHandler/PhotoHandler";
class ShowProject extends Component {
  constructor(props) {
    super(props);
    this.projectEl = React.createRef();
    this.videosEl = React.createRef();
    this.state = {
      isLoading: true,
      isEditing: false,
      editingPhotos: false,
      photos: "",
      projects: [],
      products: [],
      projDesc: "",
      deleted: false,
      images: null,
      shortDescription: null
    };
  }
  static contextType = AuthContext;

  componentDidMount() {
    this.fetchProjects();
  }

  fetchProjects() {
    window.scrollTo(0, 0);
    this.setState({ isLoading: true });
    fetch("/api/projects/" + this.props.match.params.id)
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        const images = [];
        const photos = resData.projects[1].photos;
        const videos =
          resData.projects[0].videos &&
          JSON.parse(
            "[" +
              resData.projects[0].videos.replace(new RegExp("'", "g"), '"') +
              "]"
          );
        photos.map(photo => {
          return images.push({
            original: photo.source,
            thumbnail: photo.source
          });
        });
        this.setState({
          isLoading: false,
          projects: resData.projects[0],
          images,
          videos
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: true });
      });
  }

  editingProject = () => {
    this.setState(prevState => {
      return { isEditing: !prevState.isEditing };
    });
  };

  editingPhotos = () => {
    this.setState(prevState => {
      return { editingPhotos: !prevState.editingPhotos };
    });
  };
  imageHandler = image => {
    image
      ? this.setState({ photos: image.src })
      : alert("please select an image");
  };
  productSelectHandler = productsList => {
    const productIds = productsList.map(p => p.value);
    this.setState({ products: productIds });
  };
  ProjDescHandler = value => {
    this.setState({ projDesc: value });
  };
  shortDescHandler = value => {
    this.setState({ shortDescription: value });
  };
  confirmEdit = e => {
    e.preventDefault();
    const name = this.projectEl.current.value;
    const description = this.state.projDesc;
    const photos = this.state.photos;
    const products = this.state.products;
    const shortDescription = this.state.shortDescription;
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

    const requestBody = {
      name,
      description,
      photos,
      products,
      videos,
      shortDescription
    };
    const token = this.context.token;
    console.log(requestBody);

    fetch(`/api/projects/${this.state.projects.projId}`, {
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

  deleteProjectHandler = () => {
    const id = this.state.projects.projId;
    const token = this.context.token;
    fetch(`/api/projects/${id}`, {
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
  deletImageHandler = image => {
    const source = image.substring(7);
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
  render() {
    return (
      <div className='container'>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div>
            <h3 className='text-center m-5'>{this.state.projects.name}</h3>
            <div className='row'>
              <div className='col-md-9'>
                <div className='my-5'>
                  <Markup content={this.state.projects.description} />
                </div>
              </div>
            </div>
            <div className='check'>
              <ProductGallery photos={this.state.images} />
            </div>
            {this.state.videos && (
              <div className='container'>
                <ProjVideos videos={this.state.videos} />
              </div>
            )}
          </div>
        )}

        {this.context.token && (
          <div className='container'>
            <button
              className='btn btn-sm btn-warning'
              onClick={this.editingProject}
            >
              Edit
            </button>
            <button
              className='btn btn-sm btn-success'
              onClick={this.editingPhotos}
            >
              Manage Photos
            </button>
            <button
              className='btn btn-sm btn-danger'
              onClick={this.deleteProjectHandler}
            >
              Delete
            </button>
          </div>
        )}
        {this.state.isEditing && (
          <EditProject
            project={this.state.projects}
            photos={this.state.images}
            onConfirm={this.confirmEdit}
            projectInput={this.projectEl}
            selectedImages={this.imageHandler}
            selectProducts={this.productSelectHandler}
            getEditorValue={this.ProjDescHandler}
            getShDescValue={this.shortDescHandler}
            videosInput={this.videosEl}
            videos={this.state.videos}
          />
        )}
        {this.state.editingPhotos && (
          <PhotoHandler
            photos={this.state.images}
            deletHandler={this.deletImageHandler}
          />
        )}
        {this.state.deleted && <Redirect to='/projects' exact />}
      </div>
    );
  }
}
export default ShowProject;
