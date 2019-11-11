import React, { Component } from "react";
import Options from "../Options/Options";

class CategorySelector extends Component {
  state = { isLoading: true, categories: [] };
  componentDidMount() {
    fetch("/api/products")
      .then(res => res.json())
      .then(res => {
        this.setState({ isLoading: false, categories: res.products });
      });
  }

  render() {
    return (
      <div className="form-group row justify-content-between">
        <label className="my-2 mx-3" htmlFor="selector">
          Select a category
        </label>
        <div className="col-sm-9">
          <select
            className="form-control"
            id="selector"
            defaultValue={this.props.category}
            ref={this.props.categoryInput}
          >
            {this.state.isLoading ? (
              <option>Loading from database</option>
            ) : (
              <React.Fragment>
                <option value="">None</option>
                {this.state.categories.map((product, i) => (
                  <Options category={product} key={i} />
                ))}
              </React.Fragment>
            )}
          </select>
        </div>
      </div>
    );
  }
}

export default CategorySelector;
