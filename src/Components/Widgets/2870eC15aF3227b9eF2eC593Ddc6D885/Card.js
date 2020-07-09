import React from "react";

import Template from "../Templates/Reddit/Card";
import config from "../widgetConfig";
// import "./Card.css";

const Card = ({ alreadyGot }) => {
  const id = "2870eC15aF3227b9eF2eC593Ddc6D885",
    name = config[id].name,
    thumbnails = {
      bg: null,
      fg: (
        <>
          <img
            style={{ position: "relative", width: "100%" }}
            src="https://www.wallpaperflare.com/static/600/285/272/memes-troll-face-pedobear-face-wallpaper-preview.jpg"
            alt="Meme illustration"
          />
          <h1
            style={{
              color: "white",
              fontWeight: "700",
              position: "absolute",
              textAlign: "center",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {name}
          </h1>
        </>
      ),
    };

  return (
    <div className={`Card-${id}`}>
      <Template id={id} thumbnails={thumbnails} alreadyGot={alreadyGot} />
    </div>
  );
};

export default Card;
