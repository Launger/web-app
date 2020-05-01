import React from "react";

import Template from "../Templates/YT-Card/Card";

// import "./Card.css";

const Card = ({ alreadyGot }) => {
  const 
    id = "Aa1B87eb3d0Ccd6c77A4D82b93958e39",
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