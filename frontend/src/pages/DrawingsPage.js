import React, { Component } from "react";
import AuthContext from "../context/authContext";
import { Redirect } from "react-router-dom";
import { Markup } from "interweave";
import EditPages from "../components/EditPages/EditPages";

class DrawingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      drawings: [],
      products: [],
      deleted: false,
      isEditing: false,
      edit: {}
    };
  }
  static contextType = AuthContext;
  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchDrawings();
  }
  fetchDrawings = () => {
    window.scrollTo(0, 0);
    this.setState({ isLoading: true });
    fetch("/api/drawings")
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        const drawings = resData.drawings;
        const products = [...new Set(drawings.map(d => d.product))];

        this.setState({ isLoading: false, drawings, products });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  deleteDrawingHandler = id => {
    fetch(`/api/drawings`, {
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
    const requestBody = { ...this.state.edit };
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
      <div className="drawingPage">
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
          />
        )}
        <div className="container">
          <div className="my-5">
            <Markup content={this.props.pageDetails.pageText} />
          </div>
        </div>

        {!this.state.isLoading && (
          <div className="drawing-table">
            {this.state.products.map(p => {
              return (
                <div key={p} className="category py-5">
                  <div className="container">
                    <h5>{p}</h5>
                    <div className="card-group">
                      {this.state.drawings.map((drawing, i) => {
                        return (
                          <React.Fragment key={i}>
                            {drawing.product === p && (
                              <div className="col-sm-6 col-xl-4  px-0 d-flex">
                                <div className=" mx-3">
                                  <a
                                    href={drawing.source}
                                    className="font-weight-bold"
                                  >
                                    <div className="row">
                                      <div className="col-4 py-3">
                                        <img
                                          src="/images/318355_pdf_icon.jpg"
                                          width="25"
                                          heigth="35"
                                          alt="drawings"
                                        />
                                      </div>

                                      <div className="col-8 px-0">
                                        <small>{drawing.name}</small>
                                        <p className="text-primary">
                                          Download File
                                        </p>
                                      </div>
                                    </div>
                                  </a>
                                  {this.context.token && (
                                    <div className="container">
                                      <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() =>
                                          this.deleteDrawingHandler(
                                            drawing.drawingId
                                          )
                                        }
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {this.state.deleted && <Redirect to="/" exact />}
      </div>
    );
  }
}

export default DrawingsPage;
