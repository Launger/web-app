import React, { useState, useEffect } from "react";
import firebase from "firebase/app";

// import "./Widget.css";

const Widget = () => {
  // const [title, setTitle] = useState('');
  // const [imgSrc, setImgSrc] = useState('');
  // const [index, setIndex] = useState(0);
  // const [memes, setMemes] = useState([]);

  const helloWorld = firebase.functions().httpsCallable("helloWorld");

  useEffect(() => {
    helloWorld()
      .then((res) => {
        const {data} = res;
        console.log(data);
      })
      .catch(err => console.log(err));
  }, [])

  // const fetchMeme = () => {
  //   fetch("https://meme-api.herokuapp.com/gimme/30")
  //     .then(res => res.json())
  //     .then(res => {
  //       console.log(res);
  //       setMemes(res.memes);
  //       setTitle(res.memes[index].title);
  //       setImgSrc(res.memes[index].url);
  //     })
  //     .catch(err => console.log(err));
  //   }
    
  // const updateMeme = () => {
  //   let idx = index;
  //   if (idx < memes.length - 1) ++idx;
  //   else idx = 0;
  //   setIndex(idx);
  //   if (idx !== 0) {
  //     setTitle(memes[idx].title);
  //     setImgSrc(memes[idx].url);
  //   } else {
  //     fetchMeme();
  //   }
  // }

  // useEffect(() => {
  //   fetchMeme();
  // }, []);

  return (
    <div className="Widget">
      {/* <h1 style={{color: 'var(--primary-text-color)'}}>{title}</h1>
      <img src={imgSrc} alt="Meme" style={{maxWidth: "80vw", maxHeight: "80vh"}} />
      <input type="button" value="→" onClick={updateMeme} /> */}
    </div>
  );
};

export default Widget;