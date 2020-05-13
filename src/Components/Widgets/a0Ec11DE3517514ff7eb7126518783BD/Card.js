import React from "react";

import Template from "../Templates/Reddit-Widget/Card";
import config from "../widgetConfig";
// import "./Card.css";

const Card = ({ alreadyGot }) => {
  const 
    id = "a0Ec11DE3517514ff7eb7126518783BD",
    name = config[id].name,
    thumbnails = {
      bg: null,
      fg: (
        <>
          <img
            style={{position: "relative", width: "100%"}}
            src="https://wallpapercave.com/wp/wp5260046.jpg"
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