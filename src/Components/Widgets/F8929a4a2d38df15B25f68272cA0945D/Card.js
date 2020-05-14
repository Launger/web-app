import React from "react";

import Template from "../Templates/Reddit-Widget/Card";
import config from "../widgetConfig";
// import "./Card.css";

const Card = ({ alreadyGot }) => {
  const 
    id = "F8929a4a2d38df15B25f68272cA0945D",
    name = config[id].name,
    thumbnails = {
      bg: null,
      fg: (
        <>
          <img
            style={{position: "relative", width: "100%"}}
            src="https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Ffacebook%2F000%2F000%2F027%2Fadvicedog.jpg"
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