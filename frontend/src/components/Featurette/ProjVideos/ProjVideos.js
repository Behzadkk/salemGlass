import React from "react";
import { Markup } from "interweave";

const ProjVideos = props => (
  <div>
    <div className="my-5">
      <Markup content={props.videosHeading} />
    </div>
    <div className="d-flex flex-wrap justify-content-center ">
      {props.videos.map((video, i) => (
        <div key={i} className="col-md-6 px-0 mb-4 d-flex">
          <div className="mr-2 w-100">
            <iframe
              className="w-100"
              height="250px"
              title={"XRAY" + i}
              src={"https://www.youtube.com/embed/" + video.src}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default ProjVideos;
