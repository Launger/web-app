import React, { useState, useEffect } from "react";

import Template from "../Templates/Reddit-Widget/Widget";

// import "./Widget.css";

const Widget = () => {
  const [memes, setMemes] = useState([]);

  const fetchMeme = () => {
    fetch("https://meme-api.herokuapp.com/gimme/15")
      .then(res => res.json())
      .then(res => {
        console.log(res);

        //format output to comply with Reddit widget template
        let formatedMemes = [...memes];
        res.memes.forEach(meme => {
          formatedMemes.push({
            title: meme.title,
            permalink: meme.postLink,
            url: meme.url,
          })
        })

        setMemes(formatedMemes);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchMeme();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="Widget-2870eC15aF3227b9eF2eC593Ddc6D885">
      <Template listing={memes} loadMore={fetchMeme}/>
    </div>
  );
};

export default Widget;