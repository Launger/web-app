import React from "react";

import Template from "../Templates/YouTube/Card";

// import "./Card.css";

const Card = ({ alreadyGot }) => {
  const 
    id = "30a55BA55827E87706dfD5941D6B034F",
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