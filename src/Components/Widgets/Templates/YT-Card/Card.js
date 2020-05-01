import React from "react";

import Template from "../Card/Card";

import youtubeLogo from "./yt_logo_rgb_dark.png";
import config from "../../widgetConfig";
import "./Card.css";

const YoutubeCardTemplate = ({ id, thumbnails, alreadyGot }) => {
  const
    name = config[id].name,
    youtubeURL = config[id].youtubeURL,
    TemplateThumbnails = {
      bg: thumbnails.bg || (
        <div className="youtube-card-bg">
          <div className="text">
            <div className="name" style={(name.length > 15)?{fontSize: "2.1em"}:{}}>{name}</div>
            <div className="subname"><img src={youtubeLogo} alt="youtube logo" style={{height: "20px"}}/></div>
          </div>
        </div>
      ),
      fg: thumbnails.fg || (
        <div className="youtube-card-fg">
          <div className="home"/>
          <iframe
            width="302px"
            height="170px"
            src={youtubeURL+"&controls=0"}
            frameBorder="0"
            title={`${name} video`}
          />
        </div>
      )
    }

  return (
    <div className="youtube-card-template">
      <Template
        id={id}
        thumbnails={TemplateThumbnails}
        alreadyGot={alreadyGot}
      />
    </div>
  );
};

export default YoutubeCardTemplate;