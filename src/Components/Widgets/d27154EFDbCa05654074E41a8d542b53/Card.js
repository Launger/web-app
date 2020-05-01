import React from "react";

import Template from "../Templates/Card/Card";

import config from "../widgetConfig";
import "./Card.css";

const Card = ({ alreadyGot }) => {
  const id = "d27154EFDbCa05654074E41a8d542b53";
  const thumbnail = {bg: (
    <>
      <div className="overlay" style={{
        position: "absolute",
        backgroundColor: "rgb(250, 0, 0)",
        opacity: "0",
        height: "170px",
        width: "302px"
      }} />
      <h2 style={{opacity: "1"}}>{config[id].name}</h2>
    </>
  ),
  fg: null
  };
  
  return (
    <div className="Card-d27154EFDbCa05654074E41a8d542b53">
      <Template
        id={id}
        thumbnails={thumbnail}
        alreadyGot={alreadyGot}
      />
    </div>
  );
};

export default Card;
