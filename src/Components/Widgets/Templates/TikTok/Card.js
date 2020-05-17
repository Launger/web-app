import React from "react";

import Template from "../Card/Card";

import TikTokLogo from "./TikTok-logo.svg";
import config from "../../widgetConfig";
import "./Card.css";

const TikTokCardTemplate = ({ id, thumbnails, alreadyGot }) => {
  const
    name = config[id].name,
    // youtubeURL = config[id].youtubeURL,
    TemplateThumbnails = {
      bg: thumbnails.bg || (
        <div className="tiktok-card-bg">
          <div className="text">
            <div className="name" style={(name.length > 15)?{fontSize: "2.1em"}:{}}>{name}</div>
            <div className="subname"><img src={TikTokLogo} alt="TikTok logo" className="tiktok-logo"/></div>
          </div>
        </div>
      ),
      fg: thumbnails.fg || (
        <></>
      )
    }

  return (
    <div className="tiktok-card-template">
      <Template
        id={id}
        thumbnails={TemplateThumbnails}
        alreadyGot={alreadyGot}
      />
    </div>
  );
};

export default TikTokCardTemplate;