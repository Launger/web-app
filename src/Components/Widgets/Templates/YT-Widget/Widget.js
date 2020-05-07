import React, { useState, useEffect } from "react";

import Tooltip from "../../../Tooltip/Tooltip";

import "./Widget.css";

const Widget = ({ src }) => {
  const [showMore, setShowMore] = useState(true);
  
  useEffect(() => {
    const time = setTimeout(() => {
      setShowMore(false);
      clearTimeout(time);
    }, 5000);
    return () => clearTimeout(time);
  }, [])

  return (
    <div className="yt-template-widget">
      <div className='player-wrapper'>
        {showMore && <Tooltip text="More videos here!" pointing="left"/>}
        <iframe
          className="react-player"
          src={`${src}&autoplay=1&showinfo=0&controls=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="video"
        />
      </div>
    </div>
  );
};

export default Widget;