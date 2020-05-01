import React, { useState } from "react";
import { createStore, useStore } from "react-hookstore";

import Template from "../Templates/Card/Card";

import config from "../widgetConfig";
// import "./Card.css";

createStore("custom-youtube-link");

const Card = ({alreadyGot}) => {
  const [, setYoutubeId] = useStore("custom-youtube-link");
  const [youtubeLink, setYoutubeLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const param = "v";
    let youtubeId = new RegExp( '[?&]' + param + '=([^&#]*)', 'i' ).exec(youtubeLink);
    console.log(youtubeLink, youtubeId[1]);
    setYoutubeId(youtubeId[1]);
  }


  const
    id = "625E64210ec0e28131fE993299cE2954",
    name = config[id].name,
    thumbnail = {fg:(
    <>
      {/* <div className="overlay" style={{
        position: "absolute",
        backgroundColor: "rgb(250, 0, 0)",
        opacity: "0",
        height: "170px",
        width: "302px"
      }} /> */}
      <form onSubmit={handleSubmit} className="overlay">
        <input type="text" onChange={(e) => setYoutubeLink(e.target.value)} placeholder="Enter a YouTube Link. No need to click." className="link-input" autoFocus/>
      </form>
      <h2 style={{opacity: "1"}}>{name}</h2>
    </>
  ),
  bg: null,
  };
  
  return (
    <div 
      className={`Card-${id}`}
      onClick={handleSubmit}
    >
      <Template
        id={id}
        thumbnails={thumbnail}
        alreadyGot={alreadyGot}
      />
    </div>
  );
};

export default Card;