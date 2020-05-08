import React, { useState, useEffect } from "react";

// import "./Widget.css";

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
      {memes.map((meme, i) => {
        return (
          <span key={i}><Meme title={meme.title} imgSrc={meme.url} src={meme.postLink} /></span>
        )
      })}
    </div>
  );
};

const Meme = ({title = "ERROR", imgSrc, src}) => {
  return (
    <div className="Meme">
      <a href={src} target="_blank" rel="noopener noreferrer"><h1 style={{color: 'var(--primary-text-color)'}}>{title}</h1></a>
      <img src={imgSrc} alt={`meme of ${title}`} style={{width: "100%", maxWidth: "500px"}}/>
      <a href={src} target="_blank" rel="noopener noreferrer">Open in Reddit</a>
    </div>
  )
}

export default Widget;