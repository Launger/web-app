import React, { useState, useEffect } from "react";

import Tips from "../../../Pages/BreakPage/Tips";
import Meme from "./Meme";

import "./Widget.css";

const Widget = () => {
  const [memes, setMemes] = useState([]);

  const fetchMeme = () => {
    fetch("https://meme-api.herokuapp.com/gimme/30")
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setMemes(res.memes);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchMeme();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="Meme-Widget">
      <aside className="side-content">
        <Tips />
      </aside>
      <div className="memes">
        {memes.map((meme, i) => <span key={i}><Meme title={meme.title} imgSrc={meme.url} src={meme.postLink} /></span>)}
      </div>
    </div>
  );
};

export default Widget;