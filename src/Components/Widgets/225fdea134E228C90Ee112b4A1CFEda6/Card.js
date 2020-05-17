import React from "react";

import Template from "../Templates/Reddit/Card";
import config from "../widgetConfig";
import RedditLogo from "../Templates/Reddit/Reddit.svg";
// import "./Card.css";

const Card = ({ alreadyGot }) => {
  const 
    id = "225fdea134E228C90Ee112b4A1CFEda6",
    name = config[id].name,
    thumbnails = {
      bg: (
        <div className="reddit-card-bg">
          <div className="text">
            <div className="name" style={{fontSize: "1.7em"}}>{name}</div>
            <div className="subname"><img src={RedditLogo} alt="reddit logo"/></div>
          </div>
        </div>
      ),
      fg: (
        <>
          <img
            style={{position: "relative", width: "103%", top: "-3px", left: "-3px"}}
            src="https://i.ytimg.com/vi/1-QhI40hJtA/maxresdefault.jpg"
            alt="Meme illustration"
          />
        </>
      ),
    }

  return (
    <div className={`Card-${id}`}>
      <Template
        id={id}
        thumbnails={thumbnails}
        alreadyGot={alreadyGot}
      />
    </div>
  );
};

export default Card;