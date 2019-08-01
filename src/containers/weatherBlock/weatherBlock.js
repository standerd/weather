import React from "react";
import "./weatherBlock.css";

const weatherBlock = props => {

let array = props.weather;


  return (
    <div className="weatherBlock">
    <div className="weather">
      <h3>Weather for Today</h3>
      <p>Temp: {props.loaded ? array[0].main.temp : ""} c</p>
      <p>Wind: km/h</p>
      <p>Cond: </p>
    </div>
  </div>
  );
};

export default weatherBlock;
