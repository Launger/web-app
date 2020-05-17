import React from "react";

import Template from "../Templates/YouTube/Card";

// import "./Card.css";

const Card = ({ alreadyGot }) => {
  const 
    id = "a07eC28ADF53601C643A9fee22581218",
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