import React, { Component } from "react";
import "./weatherBlock.css";

class WeatherBlock extends Component {
  render() {
    let blockItem = this.props.weather.map((key, i) => {
      return (
        <div key={i} className="weather">
          <h3>Weather as at</h3>
          <h3> {this.props.loaded ? this.props.weather[i].dt_txt : ""}</h3>
          <p>
            Temp: {this.props.loaded ? this.props.weather[i].main.temp : ""} c
          </p>
          <p>
            Wind: {this.props.loaded ? this.props.weather[i].wind.speed : ""}{" "}
            km/h
          </p>
          <p>
            Conditions:{" "}
            {this.props.loaded ? this.props.weather[i].weather[0].main : ""}{" "}
          </p>
        </div>
      );
    });

    return this.props.loaded ? blockItem : "";
  }
}

export default WeatherBlock;
