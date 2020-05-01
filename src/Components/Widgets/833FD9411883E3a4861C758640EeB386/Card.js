import React from "react";

import Template from "../Templates/YT-Card/Card";

// import "./Card.css";

const Card = ({ alreadyGot }) => {
  const 
    id = "833FD9411883E3a4861C758640EeB386",
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