import React from "react";

import config from "../widgetConfig";
import Template from "../Templates/Card/Card";
// import "./Card.css";

const MemeCardTemplate = ({ id, thumbnails, alreadyGot }) => {
  const
    name = config[id].name,
    TemplateThumbnails = {
      bg: thumbnails.bg || (
        <div className="meme-card-bg">
          <div className="text">
            <div className="name" style={(name.length > 15)?{fontSize: "2.1em"}:{}}>{name}</div>
            <div className="subname">Memes</div>
          </div>
        </div>
      ),
      fg: thumbnails.fg || (
        <></>
      )
    }

  return (
    <div className="meme-card-template">
      <Template
        id={id}
        thumbnails={TemplateThumbnails}
        alreadyGot={alreadyGot}
      />
    </div>
  );
};

const Card = ({ alreadyGot }) => {
  const 
    id = "Cbc849c7E7f700316F0fE317F1AbCe21",
    thumbnails = {
      bg: null,
      fg: null,
    }

  return (
    <div className={`Card-id`}>
      <MemeCardTemplate
        id={id}
        thumbnails={thumbnails}
        alreadyGot={alreadyGot}
      />
    </div>
  );
};

export default Card;