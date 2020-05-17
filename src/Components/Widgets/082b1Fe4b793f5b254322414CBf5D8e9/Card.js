import React from "react";

import Template from "../Templates/YouTube/Card";

// import "./Card.css";

const Card = ({ alreadyGot }) => {
  const 
    id = "082b1Fe4b793f5b254322414CBf5D8e9",
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