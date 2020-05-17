import React from "react";

import Template from "../Templates/TikTok/Card";

// import "./Card.css";

const Card = ({ alreadyGot }) => {
  const 
    id = "156A10374Ee14720c416DB5D9c38D91e",
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