import React, { useState, useEffect } from "react";

import Template from "../Templates/Reddit/Widget";

// import "./Widget.css";

const Widget = () => {
  const [memes, setMemes] = useState([]);

  const fetchMeme = () => {
    fetch("https://meme-api.herokuapp.com/gimme/AdviceAnimals/30")
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
          });
        });

        setMemes(formattedMemes);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchMeme();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="Widget-F8929a4a2d38df15B25f68272cA0945D">
      <Template listing={memes} loadMore={fetchMeme} />
    </div>
  );
};

export default Widget;
