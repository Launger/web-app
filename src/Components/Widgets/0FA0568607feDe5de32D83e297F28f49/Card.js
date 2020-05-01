import React from "react";

import Template from "../Templates/YT-Card/Card";

// import "./Card.css";

const Card = ({ alreadyGot }) => {
  const 
    id = "0FA0568607feDe5de32D83e297F28f49",
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