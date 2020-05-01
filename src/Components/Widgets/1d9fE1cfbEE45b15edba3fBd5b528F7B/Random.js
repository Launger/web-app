import React, {useState} from "react";

import "./Random.css";

const Random = () => {
  return (
    <div className="Random">
      <h1>Random</h1>
      <RandomFeature />
    </div>
  );
};

const RandomFeature = () => {
  const [random] = useState(Math.floor(Math.random() * Math.floor(4)));

  switch (random) {
    case 0:
      return <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PLrEnWoR732-BHrPp_Pm8_VleD68f9s14-&autoplay=1&&showinfo=0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="video"/>;
    case 1:
      return <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=RDCLAK5uy_ly6s4irLuZAcjEDwJmqcA_UtSipMyGgbQ&autoplay=1&&showinfo=0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="video"/>;
    case 2:
      return <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=RDCLAK5uy_l8kWqJcpttQfrdnCGjnXAFrnln8_Fy2T4&autoplay=1&&showinfo=0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="video"/>;
    default:
      return <iframe width="560" height="315" src={`https://www.youtube.com/embed/videoseries?list=PLrEnWoR732-BHrPp_Pm8_VleD68f9s14-&autoplay=1&&showinfo=0&index=${random}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="video"/>;
  }
}

export default Random;
