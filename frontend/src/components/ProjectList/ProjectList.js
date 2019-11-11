import React from "react";
import { Link } from "react-router-dom";
import { Markup } from "interweave";

const ProjectList = props => {
  console.log(props.projects);
  return (
    <div className="card-deck">
      {props.projects.map((project, i) => (
        <div
          key={i}
          className="col-sm-6 col-xl-4  px-0 mb-4 d-flex"
          onClick={() => props.projectpreview(project)}
        >
          <Link to={`/projects/${project.projId}`}>
            <div className="card">
              <img
                className="card-img-top height-inherit"
                src={project.mainPhoto}
                alt={project.name}
              />
              <div className="card-body text-center">
                <h5 className="card-title d-inline">{project.name}</h5>
              </div>
              {project.shortDescription && (
                <div className="card-footer">
                  <Markup
                    content={project.shortDescription}
                    className="card-text"
                  />
                </div>
              )}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
