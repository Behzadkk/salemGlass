import React, { Component } from "react";
import { Markup } from "interweave";
import ProductDetail from "../ProductDetail/ProductDetail";
import ProductGallery from "../ProductGallery/ProductGallery";
import ProductSidebar from "../ProductSidebar/ProductSidebar";
import Spinner from "../Spinner/Spinner";

import "./ShowProduct.css";
import ProjVideos from "../Featurette/ProjVideos/ProjVideos";

class ShowProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      images: [],
      videos: [],
      LoadingVideos: true
    };
  }
  componentDidMount() {
    this.fetchPhotos();
    this.findVideos();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.product !== this.props.product) {
      this.setState({
        isEditing: false
      });
      this.fetchPhotos();
      this.findVideos();
    }
  }
  findVideos = () => {
    this.setState({ LoadingVideos: true });
    if (this.props.product.videos) {
      const videos = JSON.parse(
        "[" + this.props.product.videos.replace(new RegExp("'", "g"), '"') + "]"
      );
      this.setState({ videos }, () => this.setState({ LoadingVideos: false }));
    }
  };
  fetchPhotos = () => {
    this.setState({ LoadingGallery: true });
    fetch(`/api/gallery/${this.props.product.subCat}`)
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        const images = [];
        const photos = resData.photos;
        photos.map(photo => {
          return images.push({
            original: photo.source,
            thumbnail: photo.source
          });
        });
        return this.setState({ images });
      })
      .then(res => {
        this.setState({ LoadingGallery: false });
      })
      .then(res => this.props.keepPhotos(this.state.images))
      .catch(err => {
        console.log(err);
        this.setState({ LoadingGallery: false });
      });
  };
  render() {
    return (
      <div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src={this.props.product.banner}
              alt={this.props.product.name}
            />
          </div>
        </div>
        <div className="container">
          <h1 className="text-center m-5"> {this.props.product.name}</h1>
          <div className="row">
            <div className="col-md-9">
              <ProductDetail product={this.props.product} />
              <div className="check">
                {this.state.LoadingGallery ? (
                  <Spinner />
                ) : (
                  <ProductGallery photos={this.state.images} />
                )}
              </div>
              <div className="container mt-5">
                <Markup content={this.props.product.subHeading} />
              </div>
            </div>
            <div className="col-md-3 my-5">
              <aside className="sidebar">
                <h4 className="heading-primary">{this.props.product.name}</h4>
                <ProductSidebar
                  photos={this.state.images}
                  product={this.props.product}
                />
                <div className="container mt-5">
                  <Markup content={this.props.product.moreInfo} />
                </div>
              </aside>
            </div>
          </div>
          {!this.state.LoadingVideos && (
            <div className="container">
              <ProjVideos
                videos={this.state.videos}
                videosHeading={this.props.product.videoHeading}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ShowProduct;
