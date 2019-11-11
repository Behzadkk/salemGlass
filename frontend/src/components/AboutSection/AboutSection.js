import React, { Component } from "react";
import { Markup } from "interweave";
import AuthContext from "../../context/authContext";
import EditAboutUsPage from "../EditAboutUsPage/EditAboutUsPage";
import ProjVideos from "../Featurette/ProjVideos/ProjVideos";

class AboutSection extends Component {
  constructor(props) {
    super(props);
    this.sectionEl = React.createRef();
    this.videosEl = React.createRef();
  }
  state = {
    edit: {},
    isEditing: false,
    section: this.props.data.id,
    data: this.props.data,
    banner: "",
    photo: ""
  };
  static contextType = AuthContext;
  componentDidMount() {
    this.findVideos();
    window.scrollTo(0, 0);
  }
  findVideos = () => {
    const videos =
      this.props.data.videos &&
      JSON.parse(
        "[" + this.props.data.videos.replace(new RegExp("'", "g"), '"') + "]"
      );
    this.setState({ videos });
  };
  editingPage = () => {
    this.setState(prevState => {
      return { isEditing: !prevState.isEditing };
    });
  };
  bannerHandler = images => {
    this.setState({ banner: images[0].secure_url });
  };
  textOneEl = value => {
    this.setState(prevState => {
      const edit = prevState.edit;
      edit.textOne = value;
      return { edit };
    });
  };
  photoHandler = images => {
    this.setState({ photo: images[0].secure_url });
  };
  textTwoEl = value => {
    this.setState(prevState => {
      const edit = prevState.edit;
      edit.text2 = value;
      return { edit };
    });
  };
  formHeadingEl = value => {
    this.setState(prevState => {
      const edit = prevState.edit;
      edit.formHeading = value;
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
    edit["sectionName"] = this.sectionEl.current.value;
    edit["banner"] = this.state.banner;
    edit["photo"] = this.state.photo;
    const requestBody = { ...edit };
    const token = this.context.token;
    fetch(`/api/about/${this.state.section}`, {
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
    const order = this.props.data.id % 2 === 0 ? 1 : 2;
    return (
      <div>
        <div className="carousel-inner">
          <div className="carousel-item active height-45">
            <img
              className="d-block w-100"
              src={this.props.data.banner}
              alt={this.props.data.sectionName}
            />
          </div>
        </div>
        <div>
          <div className="container">
            <h1 className="text-center display-4 m-5">
              {this.props.data.sectionName}
            </h1>
            <div className="row">
              <div className="col-md-12">
                <Markup content={this.props.data.textOne} />
              </div>
            </div>
          </div>
          <div className="my-5">
            <div className="">{this.props.children}</div>
          </div>
          <div className="container">
            <div className="row my-4 featurette justify-content-around">
              {this.props.data.photo && (
                <div className={`col-lg-5 order-lg-${order}`}>
                  <img
                    className="w-100 mt-4"
                    src={this.props.data.photo}
                    alt="about xray glazing"
                  />
                </div>
              )}
              <div className={`col-lg-6 order-lg-${order === 1 ? 2 : 1}`}>
                <div className="lead">
                  <Markup content={this.props.data.text2} />
                </div>
              </div>
            </div>
          </div>
          {this.state.videos && (
            <div className="container">
              <ProjVideos videos={this.state.videos} />
            </div>
          )}

          {this.context.token && (
            <div className="container">
              <button
                className="btn btn-sm btn-warning"
                onClick={this.editingPage}
              >
                Edit {this.props.data.sectionName} section
              </button>
            </div>
          )}
          {this.state.isEditing && (
            <EditAboutUsPage
              data={this.state.data}
              onConfirm={this.editHandler}
              sectionInput={this.sectionEl}
              submitedImages={this.bannerHandler}
              textOneInput={this.textOneEl}
              test={this.photoHandler}
              textTwoInput={this.textTwoEl}
              formHInput={this.formHeadingEl}
              videos={this.state.videos}
              videosInput={this.videosEl}
            />
          )}
        </div>
      </div>
    );
  }
}

export default AboutSection;
