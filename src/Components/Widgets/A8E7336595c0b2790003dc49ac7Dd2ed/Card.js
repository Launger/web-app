import React from "react";

import Template from "../Templates/YouTube/Card";

// import "./Card.css";

const Card = ({ alreadyGot }) => {
  const id = "A8E7336595c0b2790003dc49ac7Dd2ed",
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
