import React from "react";

import Template from "../Templates/YouTube/Card";

// import "./Card.css";

const Card = ({ alreadyGot }) => {
  const 
    id = "1d330b7D106021FAEA32f81469faCB83",
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