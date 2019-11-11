import React, { Component } from "react";
import Spinner from "../components/Spinner/Spinner";
import ShowProduct from "../components/ShowProduct/ShowProduct";
import EditProduct from "../components/EditProduct/EditProduct";
import AuthContext from "../context/authContext";
import { Redirect } from "react-router-dom";
import PhotoHandler from "../components/PhotoHandler/PhotoHandler";

class ProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      product: null,
      link: null,
      isEditing: false,
      banner: "",
      mainPhotos: "",
      deleted: false,
      description: "",
      keyFeatures: "",
      moreInfo: "",
      subHeading: "",
      moreDetails: "",
      videoHeading: "",
      images: [],
      LoadingGallery: true,
      videos: null,
      editingPhotos: false
    };
    this.subCatEl = React.createRef();
    this.groupEl = React.createRef();
    this.videosEl = React.createRef();
  }
  static contextType = AuthContext;
  componentDidMount() {
    this.showProduct();
  }
  descEl = value => {
    this.setState({ description: value });
  };
  keyFeatureEl = value => {
    this.setState({ keyFeatures: value });
  };
  moreInfoEl = value => {
    this.setState({ moreInfo: value });
  };
  subHeadEl = value => {
    this.setState({ subHeading: value });
  };
  moreDetailsEl = value => {
    this.setState({ moreDetails: value });
  };
  videosHeEl = value => {
    this.setState({ videoHeading: value });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.product !== this.props.match.params.product) {
      this.setState({
        isEditing: false
      });
      this.showProduct();
    }
  }
  showProduct = () => {
    window.scrollTo(0, 0);
    const product = this.props.products.filter(
      p => p.subCat === this.props.match.params.product
    );
    const videos =
      product[0].videos &&
      JSON.parse(
        "[" + product[0].videos.replace(new RegExp("'", "g"), '"') + "]"
      );
    this.setState({
      product: product[0],
      banner: product[0].banner,
      mainPhotos: product[0].mainPhotos,
      videos: videos,
      isLoading: false
    });
  };
  keepPhotos = imageList => {
    this.setState({ images: imageList });
  };
  editingProduct = () => {
    this.setState(prevState => {
      return { isEditing: !prevState.isEditing };
    });
  };
  selecImageHandler = photo => {
    this.setState({ mainPhotos: photo.src });
  };
  bannerImageHandler = photo => {
    this.setState({ banner: photo.src });
  };
  confirmEdit = e => {
    e.preventDefault();

    const subCat = this.subCatEl.current.value;
    const group = this.groupEl.current.value;
    const description = this.state.description;
    const keyFeatures = this.state.keyFeatures;
    const moreInfo = this.state.moreInfo;
    const subHeading = this.state.subHeading;
    const moreDetails = this.state.moreDetails;
    const mainPhotos = this.state.mainPhotos;
    const banner = this.state.banner;
    const videoHeading = this.state.videoHeading;
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
    const product = {
      subCat,
      group,
      description,
      keyFeatures,
      moreInfo,
      subHeading,
      moreDetails,
      mainPhotos,
      banner,
      videoHeading,
      videos
    };
    const requestBody = { ...product };
    const token = this.context.token;
    fetch(`/api/products/${product.subCat}`, {
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

  deleteProductHandler = () => {
    const id = this.state.product.prodId;
    fetch(`/api/products`, {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res;
      })
      .then(res => this.setState({ deleted: true }))
      .catch(err => {
        console.log(err);
      });
  };
  editingPhotos = () => {
    this.setState(prevState => {
      return { editingPhotos: !prevState.editingPhotos };
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
      <div className="">
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div>
            <ShowProduct
              product={this.state.product}
              LoadingGallery={this.state.LoadingGallery}
              photos={this.state.images}
              keepPhotos={this.keepPhotos}
            />
          </div>
        )}
        {this.context.token && (
          <div className="container">
            <button
              className="btn btn-sm btn-warning"
              onClick={this.editingProduct}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-success"
              onClick={this.editingPhotos}
            >
              Manage Photos
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={this.deleteProductHandler}
            >
              Delete
            </button>
          </div>
        )}
        {this.state.isEditing && (
          <EditProduct
            product={this.state.product}
            photos={this.state.images}
            onConfirm={this.confirmEdit}
            subCatInput={this.subCatEl}
            groupInput={this.groupEl}
            descInput={this.descEl}
            keyFeatureInput={this.keyFeatureEl}
            moreInfoInput={this.moreInfoEl}
            subHeadInput={this.subHeadEl}
            moreDetailsInput={this.moreDetailsEl}
            selectedImages={this.selecImageHandler}
            bannerImage={this.bannerImageHandler}
            videoHeadingInput={this.videosHeEl}
            videosInput={this.videosEl}
            videos={this.state.videos}
          />
        )}
        {this.state.editingPhotos && (
          <div className="container">
            <PhotoHandler
              photos={this.state.images}
              deletHandler={this.deletImageHandler}
            />
          </div>
        )}
        {this.state.deleted && <Redirect to="/" exact />}
      </div>
    );
  }
}

export default ProductsPage;
