import React, { Component } from "react";
import "./App.css";
import WeatherBlock from "./containers/weatherBlock/weatherBlock";

class App extends Component {
  state = {
    weather: [],
    isLoading: false,
    loaded: false,
    isError: false
  };

  //if the API fetch fails an error will be returned
  handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  // on user city selection call this function to get data and update component
  citySelectHandler = e => {
    this.setState({ isLoading: true });
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        e.target.value +
        "&units=metric&APPID=39d3188ea5587dccf0577bee24be1d8e"
    )
      .then(this.handleErrors)
      .then(response => response.json())
      .then(result => {
        this.setState({
          weather: result,
          loaded: true,
          isLoading: false,
          isError: false
        });
      })
      .catch(error => {
        this.setState({ isError: true });
      });
  };

  render() {
    // If loading is a success load the below jsx code
    const success = (
      // "this.stateloading ?" below checks if the user has selected a city or not and only
      // renders the elements if selected.

      <div>
        {this.state.isLoading ? (
          <h3>Loading Please be Patient</h3>
        ) : (
          <div>
            <h1>
              {this.state.loaded
                ? this.state.weather.city.name + " Weather"
                : ""}
            </h1>
            <div className="hourly">
              {this.state.loaded ? (
                <WeatherBlock
                  weather={this.state.weather.list}
                  loaded={this.state.loaded}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>
    );

    return (
      <div className="App">
        <img src={require("./images/weather.jpg")} alt="weather" />
        <h1>5 Day Weather Forecast</h1>
        <select onChange={this.citySelectHandler}>
          <option>Please Select City</option>
          {/* The below list is short, should however manage this via Map and an array if the 
              list of cities becomes larger */}
          <option value="Cape Town">Cape Town</option>
          <option value="Johannesburg">Johannesburg</option>
          <option value="Durban">Durban</option>
          <option value="Port Elizabeth">Port Elizabeth</option>
          <option value="East London">East London</option>
          <option value="Bloemfontein">Bloemfontein</option>
          <option value="Kroonstad">Kroonstad</option>
          <option value="Albi">Albi</option>
        </select>

        {this.state.isError ? <h1>Please Select A City</h1> : success}
      </div>
    );
  }
}

export default App;
