import React from "react";
import firebase from "firebase/app";
import { useStore } from "react-hookstore";

import Template from "../Templates/Card/Card";

import config from "../widgetConfig";
// import "./Card.css";

const Card = () => {
  const [user, setUser] = useStore("user");
  const [loggedIn] = useStore("loggedIn");
  const [, setWidget] = useStore("widget");

  let gaveFeedback = false;
  if (user !== null && user.gaveFeedback !== null) {
    gaveFeedback = user.gaveFeedback;
  }

  const handleClick = () => {
    if (loggedIn) {
      const uid = firebase.auth().currentUser.uid;
      const userRef = firebase.firestore().doc(`users/${uid}/private/private`);
      userRef
        .update({ gaveFeedback: true })
        .then(msg => {} /* console.log(msg) */)
        .catch(err => console.log(err));
    }

    setWidget({ id: "d27154EFDbCa05654074E41a8d542b53" });

    setUser({ ...user, gaveFeedback: true });
    sessionStorage.setItem("user", JSON.stringify({ ...user, gaveFeedback: true }));
    window.open(config[id].feedbackURL, "_blank");
  };

  const id = "9005d84E32Ffb03b188EaDe0B772B132",
    thumbnail = { bg: null, fg: null };

  return (
    <div className={`Card-${id}`} onClick={handleClick}>
      <Template id={id} thumbnails={thumbnail} changePPM={!gaveFeedback ? config[id].ppm : 100} alreadyGot />
    </div>
  );
};

export default Card;
