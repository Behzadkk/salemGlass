import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class QuillEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    if (this.props.text) {
      this.setState({ text: this.props.text });
    }
  }

  handleChange(value) {
    this.setState({ text: value }, () => {
      this.props.editorValue(value);
    });
  }

  render() {
    return <ReactQuill value={this.state.text} onChange={this.handleChange} />;
  }
}

export default QuillEditor;
