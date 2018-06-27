import React, { Component } from 'react';
import WeatherApp from './containers/WeatherApp'
import './weather-icons.min.css';

class App extends Component {
  
  render() {
    return (
      <div>
        <WeatherApp />
      </div>
    );
  }
}

export default App;
