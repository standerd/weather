import React, { Component } from "react";
import "./App.css";
import WeatherBlock from "./containers/weatherBlock/weatherBlock"

class App extends Component {
  state = {
    weather:[],
    temp:"",
    wind:"",
    cond:"",
    city:"",
    loaded:false
  }

  citySelectHandler = (e) => {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q="+e.target.value+"&units=metric&APPID=39d3188ea5587dccf0577bee24be1d8e")
    .then(res => res.json())
    .then(result => {
      this.setState({weather:result},this.displayWeather);
    })
    .catch(error => (
    console.log(error)
  ))
  }

  displayWeather = () => {
    console.log(this.state.weather)
    this.setState({wind:this.state.weather.list[0].wind.speed,
                  temp:this.state.weather.list[0].main.temp,
                  cond:this.state.weather.list[0].weather[0].description,
                  city:this.state.weather.city.name,
                  loaded: true})
}


  render() {
    return (
      <div className="App">
        <h1>Please Select a City</h1>
        <select onChange={this.citySelectHandler}>
          <option>Please Select City</option>
          <option value="Cape Town" >Cape Town</option>
          <option value="JOhannesburg" >Johannesburg</option>
        </select>
        <h1>{this.state.city}</h1>
        <WeatherBlock 
          weather={this.state.weather.list}
          loaded={this.state.loaded}/>
          
        {/* 
        <p>{this.state.temp} Degr Celcius</p>
        <p>{this.state.cond} Skies</p>
        <p>{this.state.wind} KM per Hour</p> */}
      </div>
    )
     
  }
}

export default App;
