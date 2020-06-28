import React from "react";

import Template from "../Templates/YouTube/Card";

// import "./Card.css";

const Card = ({ alreadyGot }) => {
  const id = "957ac555dAC74B637B07b792A081C769",
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
