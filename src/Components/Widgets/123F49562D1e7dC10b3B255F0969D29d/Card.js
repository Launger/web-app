import React from "react";

import Template from "../Templates/YouTube/Card";

// import "./Card.css";

const Card = ({ alreadyGot }) => {
  const id = "123F49562D1e7dC10b3B255F0969D29d",
    thumbnails = {
      bg: null,
      fg: null,
    };

  return (
    <div className={`Card-id`}>
      <Template id={id} thumbnails={thumbnails} alreadyGot={alreadyGot} />
    </div>
  );
};

export default Card;
