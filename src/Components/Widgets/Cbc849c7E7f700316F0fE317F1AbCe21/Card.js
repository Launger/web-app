import React from "react";

// import config from "../widgetConfig";
import Template from "../Templates/Reddit-Widget/Card";
// import "./Card.css";

const MemeCardTemplate = ({ id, thumbnails, alreadyGot }) => {
  const
    TemplateThumbnails = {}

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