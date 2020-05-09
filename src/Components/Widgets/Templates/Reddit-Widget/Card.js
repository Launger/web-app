import React from "react";

import Template from "../Card/Card";

import RedditLogo from "./Reddit.svg";
import config from "../../widgetConfig";
import "./Card.css";

const RedditCardTemplate = ({ id, thumbnails, alreadyGot }) => {
  const
    name = config[id].name,
    // youtubeURL = config[id].youtubeURL,
    TemplateThumbnails = {
      bg: thumbnails.bg || (
        <div className="reddit-card-bg">
          <div className="text">
            <div className="name" style={(name.length > 15)?{fontSize: "2.1em"}:{}}>{name}</div>
            <div className="subname"><img src={RedditLogo} alt="reddit logo"/></div>
          </div>
        </div>
      ),
      fg: thumbnails.fg || (
        <></>
      )
    }

  return (
    <div className="RedditCardTemplate">
      <Template
        id={id}
        thumbnails={TemplateThumbnails}
        alreadyGot={alreadyGot}
      />
    </div>
  );
};

export default RedditCardTemplate;