import React from "react";

import Template from "../Templates/TikTok-Card/Card";

// import "./Card.css";

const Card = ({ alreadyGot }) => {
  const 
    id = "39C1FFF780a0a1097D8548aBCb4Ddb02",
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