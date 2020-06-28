import React, { useState } from "react";
import { useStore } from "react-hookstore";

import Template from "../Templates/TikTok/Widget";

import "./Widget.css";
import users from "./tiktokusers";

const Widget = () => {
  const [user, setUser] = useState(users[Math.floor(Math.random() * users.length)]);
  const [sPoints, setSPoints] = useStore("sPoints");

  const handleGetUser = () => {
    setSPoints(sPoints - 5);
    setUser(users[Math.floor(Math.random() * users.length)]);
  };

  const handleClick = () => {
    window.open(`https://www.tiktok.com/@${user}`, "_blank");
  };

  return (
    <div className="Widget">
      <Template text={`Visit @${user}`} onClick={handleClick} />
      <h2 onClick={handleGetUser} className="actionable">
        Visit another
      </h2>
    </div>
  );
};

export default Widget;
