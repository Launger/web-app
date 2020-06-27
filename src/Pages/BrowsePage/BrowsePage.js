import React, { useEffect, useMemo, useState } from "react";
import { useStore } from "react-hookstore";

import Points from "../../Components/Points/Points";
import NavBar from "../../Components/NavBar/NavBar";

import { importCards, filterIDs } from "../../Utils";
import config from "../../Helpers/RemoteConfig";
import "./BrowsePage.css";

const BrowsePage = ({onBreak = false}) => {
  const [user] = useStore("user");
  const [, setOnBreak] = useStore("onBreak");
  const [timerMode, setTimerMode] = useStore("timerMode");
  
  const classicIDs = [
    "d27154EFDbCa05654074E41a8d542b53", // Classic
    "2870eC15aF3227b9eF2eC593Ddc6D885", // Random Memes
    "1d9fE1cfbEE45b15edba3fBd5b528F7B", // YouTube Random
    "5e41d18741293dF1228Dfcf47cB5D81c", // TikTok Random
  ];
  
  const [alreadyGotIDs, setAlreadyGotIDs] = useState([
    ...classicIDs,
    // ...(user?user.widgets:[]),
  ]);

  const handleSelect = (e) => {
    setTimerMode(e.target.value);
    sessionStorage.setItem("timerMode", e.target.value);
  }
  
  useEffect(() => {
    try {
      setAlreadyGotIDs([
        ...alreadyGotIDs,
        ...(user?user.widgets:[]),
      ]);
    }
    catch (err) {
      console.log(err);
      // alert("Please refresh page.")
    }
    // eslint-disable-next-line
  }, [user])
  
  const restIDs = JSON.parse(config.getValue("restIDs")._value);
  
  useEffect(() => {
    if(!onBreak){
      sessionStorage.removeItem("widget");
      sessionStorage.removeItem("workTimeLeft");
      sessionStorage.removeItem("breakTimeLeft");
      sessionStorage.removeItem("randomWord");
    }
    setOnBreak(onBreak);
    document.title = "Launger - Browse";
    // eslint-disable-next-line
  }, []);
  
  const importedAlreadyGotCards = useMemo(() => importCards(alreadyGotIDs, true), [alreadyGotIDs]);
  // eslint-disable-next-line
  const importedRestCards = useMemo(() => importCards(filterIDs(alreadyGotIDs, restIDs), false), [alreadyGotIDs]);

  return (
    <div className="BrowsePage">
      <NavBar Points={Points}/>
      <div className="page-content">
        <section className="your-widgets">
          <div className="selectionBar">
            <h1>Your Widgets</h1>
            <select onChange={handleSelect} defaultValue={timerMode}>
              <option value="pomodoro">Pomodoro</option>
              <option value="speedrun">Speedrun</option>
              <option value="tracker">Time Tracker</option>
            </select>
          </div>
          <div className="cards">{importedAlreadyGotCards}</div>
        </section>
        <section className="all-widgets">
          <div className="cards">{importedRestCards}</div>
        </section>
      </div>
    </div>
  );
};

export default BrowsePage;
