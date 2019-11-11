import React, { Component } from "react";
import Options from "../Options/Options";

class ProjectSelector extends Component {
  state = { isLoading: true, projects: [] };
  componentDidMount() {
    fetch("/api/projects")
      .then(res => res.json())
      .then(res => {
        this.setState({ isLoading: false, projects: res.projects });
      });
  }

  render() {
    return (
      <div className="form-group row justify-content-between">
        <label className="my-2 mx-3" htmlFor="selector">
          Select a project
        </label>
        <div className="col-sm-9">
          <select
            className="form-control"
            id="selector"
            ref={this.props.projectInput}
          >
            {this.state.isLoading ? (
              <option>Loading from database</option>
            ) : (
              <React.Fragment>
                <option value="">None</option>
                {this.state.projects.map((project, i) => (
                  <Options category={project} key={i} />
                ))}
              </React.Fragment>
            )}
          </select>
        </div>
      </div>
    );
  }
}

export default ProjectSelector;
