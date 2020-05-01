import React from "react";

import Template from "../Templates/YT-Card/Card";

// import "./Card.css";

const Card = ({ alreadyGot }) => {
  const 
    id = "6492F5db6Fcd0d0e003C37E5e067f4b1",
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