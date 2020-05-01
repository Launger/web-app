import React, { useState } from "react";
import { useStore } from "react-hookstore";
import Button from "react-bootstrap/Button";

import Template from "../Templates/YT-Widget/Widget";

import dictionary from "./dictionary";
import "./Widget.css";

const Widget = () => {
  const [randomWord, setRandomWord] = useState(
    sessionStorage.getItem("randomWord") ||
      dictionary[Math.round(Math.random() * 102)]
  );
  const [sPoints, setSPoints] = useStore("sPoints");

  const handleGetNewVideo = () => {
    setSPoints(sPoints - 5);
    setRandomWord(dictionary[Math.round(Math.random() * 102)]);
    sessionStorage.setItem("randomWord", randomWord);
  };

  return (
    <div className="Widget">
      <div className="frame">
        <Template src={`https://www.youtube.com/embed?listType=search&list=${randomWord}&autoplay=1&controls=1`}/>
      </div>
      <Button onClick={handleGetNewVideo}>Get new video (-5 points)</Button>
    </div>
  );
};

export default Widget;
