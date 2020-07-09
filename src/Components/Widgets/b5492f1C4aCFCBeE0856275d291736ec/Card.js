import React from "react";

import Template from "../Templates/YouTube/Card";

// import "./Card.css";

const Card = ({ alreadyGot }) => {
  const id = "b5492f1C4aCFCBeE0856275d291736ec",
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
