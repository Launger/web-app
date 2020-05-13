import React from "react";

import Template from "../Templates/Reddit-Widget/Card";
import config from "../widgetConfig";
// import "./Card.css";

const Card = ({ alreadyGot }) => {
  const 
    id = "Cbc849c7E7f700316F0fE317F1AbCe21",
    name = config[id].name,
    thumbnails = {
      bg: null,
      fg: (
        <>
          <img
            style={{position: "relative"}}
            src="https://styles.redditmedia.com/t5_2qjpg/styles/bannerBackgroundImage_b0ojh4ocr2241.png"
            alt="Meme illustration"
          />
          <h1 style={{color: "white", fontWeight: "700", position: "absolute", textAlign: "center", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>{name}</h1>
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