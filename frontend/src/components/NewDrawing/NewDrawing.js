import React from "react";
import AuthContext from "../../context/authContext";
import CategorySelector from "../CategorySelector/CategorySelector";

class NewDrawing extends React.Component {
  constructor(props) {
    super(props);
    this.catEl = React.createRef();
    this.nameEl = React.createRef();
    this.state = {
      uploading: false,
      files: [],
      selectedFile: null,
      loaded: 0
    };
    this.handleUploadFile = this.handleUploadFile.bind(this);
  }
  static contextType = AuthContext;

  handleUploadFile(e) {
    e.preventDefault();
    const token = this.context.token;
    const files = Array.from(e.target.files);
    const formData = new FormData();
    files.forEach((file, i) => {
      formData.append(i, file);
    });
    fetch("/upload/drawings", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(files => {
        console.log(files);
        this.setState({
          uploading: false,
          files
        });
        console.log(this.state);
      });
  }

  _handleSubmit(e) {
    e.preventDefault();
    const categoryId = this.catEl.current.value;
    const name = this.nameEl.current.value;
    const source = this.state.files.source;
    const token = this.context.token;
    const requestBody = { categoryId, source, name };
    fetch("/api/drawings", {
      method: "POST",
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
      .then(res => {
        this.props.uploaded();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="previewComponent">
        <form onSubmit={e => this._handleSubmit(e)}>
          <div className="col-md-12 text-center">
            <h1 className="h3 mb-3 font-weight-normal">Upload a new drawing</h1>
          </div>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="drawing">
              Select Drawing
            </label>
            <div className="col-sm-9">
              <input
                className="form-control file-input"
                name="file"
                type="file"
                id="drawing"
                onChange={this.handleUploadFile}
                ref={ref => {
                  this.uploadInput = ref;
                }}
              />
            </div>
          </div>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="name">
              Name
            </label>
            <div className="col-sm-9">
              <input
                className="form-control"
                type="text"
                id="name"
                ref={this.nameEl}
                defaultValue="xray-glazing"
              />
            </div>
          </div>
          <CategorySelector categoryInput={this.catEl} />
          <div className="form-group row justify-content-end mt-5 mt-sm-0">
            <div className="col-sm-9">
              <button
                onClick={e => this._handleSubmit(e)}
                className="btn btn-lg btn-primary btn-block"
                type="submit"
              >
                Upload Drawing
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default NewDrawing;
