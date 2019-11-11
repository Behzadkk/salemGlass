import React, { Component } from "react";
import "./GalleryProduct.css";
import Spinner from "../Spinner/Spinner";
import AuthContext from "../../context/authContext";
import ProjVideos from "../Featurette/ProjVideos/ProjVideos";

class GalleryProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      images: [],
      currentIndex: null,
      LoadingVideos: true
    };
    this.closeModal = this.closeModal.bind(this);
    this.findNext = this.findNext.bind(this);
    this.findPrev = this.findPrev.bind(this);
    this.renderImageContent = this.renderImageContent.bind(this);
  }
  static contextType = AuthContext;
  componentDidMount() {
    this.fetchImages();
    this.showProduct();
  }
  showProduct = () => {
    const product = this.props.products.filter(
      p => p.subCat === this.props.match.params.product
    );
    this.findVideos(product);
    this.setState({
      product: product[0],
      banner: product[0].banner,
      isLoading: true,
      LoadingVideos: true
    });
  };
  findVideos = product => {
    this.setState({ LoadingVideos: true });
    if (product[0].videos) {
      const videos = JSON.parse(
        "[" + product[0].videos.replace(new RegExp("'", "g"), '"') + "]"
      );
      this.setState({ videos }, () => this.setState({ LoadingVideos: false }));
    }
  };
  fetchImages = () => {
    window.scrollTo(0, 0);
    this.setState({ isLoading: true });
    fetch("/api/gallery/" + this.props.match.params.product)
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        const images = resData.photos.map(photo => photo.source);

        this.setState({ isLoading: false, images, product: resData });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  renderImageContent(src, index) {
    return (
      <div key={index} onClick={e => this.openModal(e, index)}>
        <img src={src} key={index} alt={src} />
      </div>
    );
  }
  openModal(e, index) {
    this.setState({ currentIndex: index });
  }
  closeModal(e) {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState({ currentIndex: null });
  }
  findPrev(e) {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1
    }));
  }
  findNext(e) {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1
    }));
  }
  captialize(words) {
    return words
      .split("_")
      .map(w => w.substring(0, 1).toUpperCase() + w.substring(1))
      .join(" ");
  }
  deleteHandler = src => {
    const photo = this.state.product.photos.filter(p => p.source === src);
    const id = photo[0].photoId;
    fetch(`/api/gallery`, {
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
      .then(res =>
        this.setState(prevState => {
          const images = prevState.images;
          const newImages = images.filter(i => i !== src);
          return { images: newImages, currentIndex: null };
        })
      )
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="gallery-container">
        <h2 className="display-4 text-center m-5">
          {this.captialize(this.props.match.params.product)}
        </h2>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <div className="gallery-grid">
              {this.state.images.map(this.renderImageContent)}
            </div>
            {!this.state.LoadingVideos && (
              <div className="container">
                <ProjVideos
                  videos={this.state.videos}
                  videosHeading={this.state.product.videoHeading}
                />
              </div>
            )}
            <GalleryModal
              closeModal={this.closeModal}
              findPrev={this.findPrev}
              findNext={this.findNext}
              hasPrev={this.state.currentIndex > 0}
              hasNext={this.state.currentIndex + 1 < this.state.images.length}
              src={this.state.images[this.state.currentIndex]}
              deletePhoto={this.deleteHandler}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

class GalleryModal extends Component {
  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  static contextType = AuthContext;

  componentDidMount() {
    document.body.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    document.body.removeEventListener("keydown", this.handleKeyDown);
  }
  handleKeyDown(e) {
    if (e.keyCode === 27) this.props.closeModal();
    if (e.keyCode === 37 && this.props.hasPrev) this.props.findPrev();
    if (e.keyCode === 39 && this.props.hasNext) this.props.findNext();
  }
  render() {
    const {
      closeModal,
      hasNext,
      hasPrev,
      findNext,
      findPrev,
      src
    } = this.props;
    if (!src) {
      return null;
    }
    return (
      <div>
        <div className="modal-overlay" onClick={closeModal}></div>
        <div className="modal container">
          <div className="modal-body">
            <a
              href="close"
              className="modal-close"
              onClick={closeModal}
              onKeyDown={this.handleKeyDown}
            >
              &times;
            </a>
            {hasPrev && (
              <a
                href="previous"
                className="modal-prev"
                onClick={findPrev}
                onKeyDown={this.handleKeyDown}
              >
                &lsaquo;
              </a>
            )}
            {hasNext && (
              <a
                href="next"
                className="modal-next"
                onClick={findNext}
                onKeyDown={this.handleKeyDown}
              >
                &rsaquo;
              </a>
            )}
            {this.context.token && (
              <div className="container">
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => this.props.deletePhoto(src)}
                >
                  Delete
                </button>
              </div>
            )}
            <img src={src} alt={src} />
          </div>
        </div>
      </div>
    );
  }
}

export default GalleryProduct;
