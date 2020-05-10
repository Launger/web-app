import React from "react";

import "./Meme.css";

const Meme = ({title = "ERROR", imgSrc, src}) => {
  return (
    <div className="Meme">
      <a href={src} target="_blank" rel="noopener noreferrer"><h1 className="title">{title}</h1></a>
      <img src={imgSrc} alt={`meme of ${title}`}/>
      <a href={src} target="_blank" rel="noopener noreferrer">Open in Reddit</a>
    </div>
  )
}

export default Meme;


