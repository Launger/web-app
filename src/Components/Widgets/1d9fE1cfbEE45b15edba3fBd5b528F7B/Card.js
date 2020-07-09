import React from "react";

import Template from "../Templates/YouTube/Card";

import config from "../widgetConfig";
import dictionary from "./dictionary";
import "./Card.css";

const Card = ({ alreadyGot }) => {
  const randomWord = sessionStorage.getItem("randomWord") || dictionary[Math.round(Math.random() * 122)];
  // console.log(randomWord);
  sessionStorage.setItem("randomWord", randomWord);
  const id = "1d9fE1cfbEE45b15edba3fBd5b528F7B",
    name = config[id].name,
    youtubeURL = `https://www.youtube.com/embed?listType=search&list=${randomWord}&autoplay=0&controls=0`,
    thumbnail = {
      fg: (
        <div className="youtube-card-fg">
          <div className="home" />
          <iframe width="302px" height="170px" src={youtubeURL + "&controls=0"} frameBorder="0" title={`${name} video`} />
        </div>
      ),
    };

  return (
    <div className="Card-1d9fE1cfbEE45b15edba3fBd5b528F7B">
      <Template id={id} thumbnails={thumbnail} alreadyGot={alreadyGot} />
    </div>
  );
};

export default Card;
