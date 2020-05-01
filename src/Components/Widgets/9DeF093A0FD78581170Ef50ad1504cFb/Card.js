import React from "react";

import Template from "../Templates/YT-Card/Card";

// import "./Card.css";

const Card = ({ alreadyGot }) => {
  const 
    id = "9DeF093A0FD78581170Ef50ad1504cFb",
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