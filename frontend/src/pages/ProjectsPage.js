import React, { Component } from "react";
import Spinner from "../components/Spinner/Spinner";
import ProjectList from "../components/ProjectList/ProjectList";
import AuthContext from "../context/authContext";
import EditPages from "../components/EditPages/EditPages";
import { Markup } from "interweave";
import ProjVideos from "../components/Featurette/ProjVideos/ProjVideos";

class ProjectsPage extends Component {
  constructor(props) {
    super(props);
    this.videosEl = React.createRef();
    this.state = {
      isLoading: true,
      projects: [],
      selectedProject: null,
      isEditing: false,
      edit: {}
    };
  }
  static contextType = AuthContext;
  editingPage = () => {
    this.setState(prevState => {
      return { isEditing: !prevState.isEditing };
    });
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
  componentDidMount() {
    this.fetchProjects();
    this.findVideos();
  }
  projectViewHandler = project => {
    this.setState({ selectedProject: project });
  };
  closeModal = () => {
    this.setState({ selectedProject: null });
  };
  fetchProjects = () => {
    window.scrollTo(0, 0);
    let api = "/api/projects";
    if (this.props.match.params.product) {
      api = "/api/" + this.props.match.params.product + "/projects";
    }
    this.setState({ isLoading: true });
    fetch(api)
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        this.setState({ isLoading: false, projects: resData.projects });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };
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
            videosInput={this.videosEl}
            videos={this.state.videos}
          />
        )}
        <div className="my-5">
          <Markup content={this.props.pageDetails.pageText} />
        </div>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <ProjectList
              projects={this.state.projects}
              projectpreview={this.projectViewHandler}
            />
            <div>
              {this.props.pageDetails.videos && (
                <div className="container">
                  <ProjVideos
                    videos={this.state.videos}
                    videosHeading={this.props.products.videoHeading}
                  />
                </div>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default ProjectsPage;
