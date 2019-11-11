import React, { Component } from "react";
import AuthContext from "../../context/authContext";
class EditFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: this.props.data.groupName,
      text1: this.props.data.text1,
      link1: this.props.data.link1,
      text2: this.props.data.text2,
      link2: this.props.data.link2,
      text3: this.props.data.text3,
      link3: this.props.data.link3,
      text4: this.props.data.text4,
      link4: this.props.data.link4,
      text5: this.props.data.text5,
      link5: this.props.data.link5
    };
  }

  static contextType = AuthContext;

  submitHandler = event => {
    event.preventDefault();
    console.log(this.state);
    const requestBody = this.state;
    const token = this.context.token;
    fetch(`/api/footer/${this.props.data.footerId}`, {
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
      // .then(resData => alert(resData.toString() + "added to databe"))
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center my-5">
          <div className="col-md-12">
            <form>
              <div className="form-group row justify-content-between">
                <label className="my-2 mx-2" htmlFor="groupName">
                  <strong>Menu Name</strong>
                </label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    id="groupName"
                    onChange={e => this.setState({ groupName: e.target.value })}
                    defaultValue={this.state.groupName}
                  />
                </div>
              </div>
              <div className="form-group row justify-content-between">
                <label className="my-2 mx-5" htmlFor="text1">
                  text1
                </label>
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    type="text"
                    id="text1"
                    onChange={e => this.setState({ text1: e.target.value })}
                    defaultValue={this.state.text1}
                  />
                </div>
              </div>
              <div className="form-group row justify-content-between">
                <label className="my-2 mx-5" htmlFor="link1">
                  link1
                </label>
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    type="text"
                    id="link1"
                    onChange={e => this.setState({ link1: e.target.value })}
                    defaultValue={this.state.link1}
                  />
                </div>
              </div>
              <div className="form-group row justify-content-between">
                <label className="my-2 mx-5" htmlFor="text2">
                  text2
                </label>
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    type="text"
                    id="text2"
                    onChange={e => this.setState({ text2: e.target.value })}
                    defaultValue={this.state.text2}
                  />
                </div>
              </div>
              <div className="form-group row justify-content-between">
                <label className="my-2 mx-5" htmlFor="link2">
                  link2
                </label>
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    type="text"
                    id="link2"
                    onChange={e => this.setState({ link2: e.target.value })}
                    defaultValue={this.state.link2}
                  />
                </div>
              </div>
              <div className="form-group row justify-content-between">
                <label className="my-2 mx-5" htmlFor="text3">
                  text3
                </label>
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    type="text"
                    id="text3"
                    onChange={e => this.setState({ text3: e.target.value })}
                    defaultValue={this.state.text3}
                  />
                </div>
              </div>
              <div className="form-group row justify-content-between">
                <label className="my-2 mx-5" htmlFor="link3">
                  link3
                </label>
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    type="text"
                    id="link3"
                    onChange={e => this.setState({ link3: e.target.value })}
                    defaultValue={this.state.link3}
                  />
                </div>
              </div>
              <div className="form-group row justify-content-between">
                <label className="my-2 mx-5" htmlFor="text4">
                  text4
                </label>
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    type="text"
                    id="text4"
                    onChange={e => this.setState({ text4: e.target.value })}
                    defaultValue={this.state.text4}
                  />
                </div>
              </div>
              <div className="form-group row justify-content-between">
                <label className="my-2 mx-5" htmlFor="link4">
                  link4
                </label>
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    type="text"
                    id="link4"
                    onChange={e => this.setState({ link4: e.target.value })}
                    defaultValue={this.state.link4}
                  />
                </div>
              </div>
              <div className="form-group row justify-content-between">
                <label className="my-2 mx-5" htmlFor="text5">
                  text5
                </label>
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    type="text"
                    id="text5"
                    onChange={e => this.setState({ text5: e.target.value })}
                    defaultValue={this.state.text5}
                  />
                </div>
              </div>
              <div className="form-group row justify-content-between">
                <label className="my-2 mx-5" htmlFor="link5">
                  link5
                </label>
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    type="text"
                    id="link5"
                    onChange={e => this.setState({ link5: e.target.value })}
                    defaultValue={this.state.link5}
                  />
                </div>
              </div>
              <div className="form-group row justify-content-end mt-5 mt-sm-0">
                <div className="col-sm-9">
                  <button
                    onClick={this.submitHandler}
                    className="btn btn-lg btn-primary btn-block"
                  >
                    Submit {this.state.groupName}!
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditFooter;
