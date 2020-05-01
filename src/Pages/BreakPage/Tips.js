import React, { useState } from "react";
import { useStore } from "react-hookstore";

import Tip from "../../Components/Tip/Tip";

import "./Tips.css";

const Tips = () => {
  const [loggedIn] = useStore("loggedIn");
  const [sPoints] = useStore("sPoints");
  const [points] = useStore("points");
  
  const notLoggedIn = {
    message: <>{sPoints>0 ?
      <><strong>Tip:</strong> You've got {Math.round(sPoints)} unsaved points. Save them by <a href="/signup">signing up</a>. These points can be used to get more widgets.</>
      :<><strong>Tip:</strong> <a href="/signup">Sign up</a> to get even more out of Launger. </>}</>
  }
  
  const tips = [
    {
      message: <><strong>Tip:</strong> Allow notifications so that Launger can notify you when to take a break and when to get back to work.</>
    },
    {
      message: <><strong style={{color: "#00C008"}}>Pro tip:</strong> Earn more points by picking widgets with higher Points Per Minute (PPM). Classic will get you 5000 points for 25 minutes of work.</>
    },
    {
      message: <>Consider <a href="https://www.surveymonkey.com/r/8JNNY62" target="_blank" rel="noopener noreferrer">giving us feedback</a>. Your feedback will go a long way towards making Launger even better.</>
    },
    {
      message: <>Nicelly done, you've got {Math.round(sPoints+points.totalPoints)} points. You might want to TRY or GET a new widget. You deserve it.</>
    }
    // {
    //   message: <><strong>Verify your email</strong> to make your account more secure.</>
    // },
  ];
  
  const [randomNumber] = useState(Math.round(Math.random() * tips.length));
  // console.log(randomNumber, tips.length);

  if(!loggedIn)
    return (
      <div className="Tips">
        <Tip message={notLoggedIn.message} />
        <Tip message={tips[(randomNumber)%tips.length].message} />
        <Tip message={tips[(randomNumber+1)%tips.length].message} />
      </div>
    );
  else
    return (
      <div className="Tips">
        <Tip message={tips[(randomNumber)%tips.length].message} />
        <Tip message={tips[(randomNumber+1)%tips.length].message} />
        <Tip message={tips[(randomNumber+2)%tips.length].message} />
      </div>
    );
};

export default Tips;
