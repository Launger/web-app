import React from "react";

import Template from "../Templates/Card/Card";

// import "./Card.css";

const Card = ({ alreadyGot }) => {
  const id = "5CB04D98beB91e67596DDA266E6e71CF",
    thumbnails = {
      bg: null,
      fg: null,
    };

  return (
    <div className={`Card-${id}`}>
      <Template id={id} thumbnails={thumbnails} alreadyGot={true} />
    </div>
  );
};

export default Card;
