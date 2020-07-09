import React from "react";

import Template from "../Templates/YouTube/Card";

// import "./Card.css";

const Card = ({ alreadyGot }) => {
  const id = "D87ff4D809D8F30BE320B550179dCc80",
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
