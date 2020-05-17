import React from "react";

import Template from "../Templates/YouTube/Card";

// import "./Card.css";

const Card = ({ alreadyGot }) => {
  const 
    id = "Ee45526bf6C9d56fF4b55bbF4CDB16D2",
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