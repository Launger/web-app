import React from "react";

import Template from "../Templates/Reddit/Card";
import config from "../widgetConfig";
import RedditLogo from "../Templates/Reddit/Reddit.svg";
// import "./Card.css";

const Card = ({ alreadyGot }) => {
  const 
    id = "2e974F8BDBfa97dDcF12E7525b174C99",
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
            style={{position: "relative", width: "100%"}}
            src="https://i.redd.it/iwnu8apxfur01.png"
            alt="Meme illustration"
          />
          <h1 style={{fontSize: "1.7em", color: "white", fontWeight: "700", position: "absolute", textAlign: "center", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>{name}</h1>
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