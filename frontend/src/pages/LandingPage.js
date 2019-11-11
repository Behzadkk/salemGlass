import React, { Component } from "react";
import Carousel from "../components/Carousel/Carousel";
import Hero from "../components/Hero/Hero";
import Featurette from "../components/Featurette/Featurette";
import AuthContext from "../context/authContext";
import EditLandPage from "../components/EditLandPage/EditLandPage";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isEditing: false,
      data: {},
      photos: [],
      videos: [],
      edit: {},
      uploadingPhotos: "",
      videoHeading: null
    };
    this.carouselEl = React.createRef();
    this.infoPhotoEl = React.createRef();
    this.aboutPhotoEl = React.createRef();
    this.videosEl = React.createRef();
  }
  static contextType = AuthContext;
  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchDetails();
  }

  fetchDetails = () => {
    this.setState({ isLoading: true });
    fetch("/api/landing")
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        this.setState({
          data: resData.data[0]
        });
        return resData;
      })
      .then(resData => {
        const photos = JSON.parse(
          "[" +
            resData.data[0].carousel.replace(new RegExp("'", "g"), '"') +
            "]"
        );
        const videos = JSON.parse(
          "[" + resData.data[0].videos.replace(new RegExp("'", "g"), '"') + "]"
        );
        this.setState({
          photos,
          videos,
          isLoading: false
        });
      })

      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };
  editingPage = () => {
    this.setState(prevState => {
      return { isEditing: !prevState.isEditing };
    });
  };

  heroEl = value => {
    this.setState(prevState => {
      const edit = prevState.edit;
      edit.hero = value;
      return { edit };
    });
  };
  heroMobileEl = value => {
    this.setState(prevState => {
      const edit = prevState.edit;
      edit.heroMobile = value;
      return { edit };
    });
  };
  infoEl = value => {
    this.setState(prevState => {
      const edit = prevState.edit;
      edit.info = value;
      return { edit };
    });
  };
  aboutEl = value => {
    this.setState(prevState => {
      const edit = prevState.edit;
      edit.about = value;
      return { edit };
    });
  };
  videosHeEl = value => {
    this.setState(prevState => {
      const edit = prevState.edit;
      edit.videoHeading = value;
      return { edit };
    });
  };
  productHeEl = value => {
    this.setState(prevState => {
      const edit = prevState.edit;
      edit.productsHeading = value;
      return { edit };
    });
  };
  imageHandler = imageList => {
    const uploadingPhotos = imageList
      .map(p => JSON.stringify({ source: p.secure_url }))
      .join(",")
      .replace(new RegExp('"', "g"), "'");
    this.setState({ uploadingPhotos });
  };
  infoPhotoHandler = images => {
    this.setState({ infoPhoto: images[0].secure_url });
  };
  aboutPhotoHandler = images => {
    this.setState({ aboutPhoto: images[0].secure_url });
  };
  editHandler = e => {
    e.preventDefault();
    const photos = this.state.uploadingPhotos;
    const infoPhoto = this.state.infoPhoto;
    const aboutPhoto = this.state.aboutPhoto;
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
    if (photos) {
      edit["carousel"] = photos;
    }
    if (infoPhoto) {
      edit["infoPhoto"] = infoPhoto;
    }
    if (aboutPhoto) {
      edit["aboutPhoto"] = aboutPhoto;
    }
    edit["videos"] = videos;
    const requestBody = { ...edit };
    const token = this.context.token;
    fetch("/api/landing", {
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
      <div>
        {this.context.token && (
          <div className="container">
            <button
              className="btn btn-sm btn-warning"
              onClick={this.editingPage}
            >
              Edit Landing Page
            </button>
          </div>
        )}
        {this.state.isEditing && (
          <EditLandPage
            data={this.state.data}
            photos={this.state.photos}
            videos={this.state.videos}
            carouselInput={this.carouselEl}
            heroInput={this.heroEl}
            heroMobileInput={this.heroMobileEl}
            infoInput={this.infoEl}
            infoPhotoInput={this.infoPhotoEl}
            aboutInput={this.aboutEl}
            aboutPhotoInput={this.aboutPhotoEl}
            productHeadingInput={this.productHeEl}
            videoHeadingInput={this.videosHeEl}
            videosInput={this.videosEl}
            onConfirm={this.editHandler}
            submitedImages={this.imageHandler}
            submitedInfoPhoto={this.infoPhotoHandler}
            submitedAboutPhoto={this.aboutPhotoHandler}
          />
        )}
        <Carousel photos={this.state.photos} />
        <Hero text={this.state.data} />
        <Featurette
          products={this.props.products}
          details={this.state.data}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

export default LandingPage;
