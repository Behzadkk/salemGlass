import React, { Component } from "react";
import Spinner from "../components/Spinner/Spinner";
import { Link } from "react-router-dom";
import { Markup } from "interweave";
import AuthContext from "../context/authContext";
import EditPages from "../components/EditPages/EditPages";
import ProjVideos from "../components/Featurette/ProjVideos/ProjVideos";

class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      category: this.props.match.params.category,
      products: null,
      banner: null,
      pageDetails: {},
      isEditing: false,
      edit: {}
    };
    this.videosEl = React.createRef();
  }
  static contextType = AuthContext;

  componentDidMount() {
    window.scrollTo(0, 0);
    this.showCategory();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.category !== this.props.match.params.category) {
      this.setState(
        { isLoading: true, category: this.props.match.params.category },
        () => this.showCategory()
      );
    }
  }

  showCategory = () => {
    const products = this.props.products.filter(
      p => p.category === this.props.match.params.category.toLowerCase()
    );
    const pageDetails = this.props.pageDetails.filter(
      d => d.pageName === this.props.match.params.category.toLowerCase()
    );
    const videos =
      pageDetails[0].videos &&
      JSON.parse(
        "[" + pageDetails[0].videos.replace(new RegExp("'", "g"), '"') + "]"
      );
    this.setState({
      products: products,
      banner: products[0].banner,
      pageDetails: pageDetails[0],
      videos,
      isLoading: false
    });
  };
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
    fetch(`/api/pages/${this.state.pageDetails.pageId}`, {
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
      <div className="">
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div>
            {this.context.token && (
              <div className="container">
                <button
                  className="btn btn-sm btn-warning"
                  onClick={this.editingPage}
                >
                  Edit {this.state.pageDetails.pageName} page
                </button>
              </div>
            )}
            {this.state.isEditing && (
              <EditPages
                data={this.state.pageDetails}
                textInput={this.textEl}
                onConfirm={this.editHandler}
                videos={this.state.videos}
                videosInput={this.videosEl}
              />
            )}
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="d-block w-100"
                  src={this.state.banner}
                  alt={this.state.category}
                />
              </div>
            </div>
            <div className="container">
              <div className="my-5">
                <Markup content={this.state.pageDetails.pageText} />
              </div>
            </div>
            <div className="container">
              <div className="card-group">
                {this.state.products.map((product, i) => (
                  <div key={i} className="col-sm-6 col-xl-4  px-0 mb-4 d-flex">
                    <div className="card mr-2">
                      <Link to={`/products/${product.subCat}`}>
                        <img
                          className="card-img-top height-inherit"
                          src={product.mainPhotos}
                          alt={product.name}
                        />
                        <div className="card-body text-center">
                          <h5 className="card-title d-inline">
                            {product.name}
                          </h5>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {this.state.pageDetails.videos && (
              <div className="container">
                <ProjVideos
                  videos={this.state.videos}
                  videosHeading={this.props.products.videoHeading}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
export default CategoryPage;
