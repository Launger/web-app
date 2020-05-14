import React, { useState, useEffect } from "react";

import Template from "../Templates/Reddit-Widget/Widget";

// import "./Widget.css";

const Widget = () => {
  const [memes, setMemes] = useState([]);

  const fetchMeme = () => {
    fetch("https://meme-api.herokuapp.com/gimme/funny/30")
      .then(res => res.json())
      .then(res => {
        console.log(res);

        //format output to comply with Reddit widget template
        let formattedMemes = [...memes];
        res.memes.forEach(meme => {
          formattedMemes.push({
            title: meme.title,
            permalink: meme.postLink,
            url: meme.url,
          })
        })

        setMemes(formattedMemes);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchMeme();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="Widget-3D3513ab7E817905b335e80860fB91f2">
      <Template listing={memes} loadMore={fetchMeme}/>
    </div>
  );
};

export default Widget;