import React from "react";

import Template from "../Templates/TikTok-Card/Card";

// import "./Card.css";

const Card = ({ alreadyGot }) => {
  const 
    id = "5e41d18741293dF1228Dfcf47cB5D81c",
    thumbnails = {
      bg: null,
      fg: null,
    }

  return (
    <div className={`Card-id`}>
      <Template
        id={id}
        thumbnails={thumbnails}
        alreadyGot={alreadyGot}
      />
    </div>
  );
};

export default Card;