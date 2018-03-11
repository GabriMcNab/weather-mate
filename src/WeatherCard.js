import React, {Component} from 'react';
import './WeatherCard.css';

class WeatherCard extends Component {
  setIcon(id) {
    if(id === 800){return "wi wi-day-sunny"}
    else if(id >= 200 && id < 300){return "wi wi-thunderstorm"}
    else if(id >= 300 && id < 400){return "wi wi-day-sprinkle"}
    else if(id >= 500 && id < 600){return "wi wi-rain"}
    else if(id >= 600 && id < 700){return "wi wi-snow"}
    else if(id >= 700 && id < 800){return "wi wi-fog"}
    else if(id > 800 && id < 900){return "wi wi-cloud"}
  }

  getAverageWeather(obj, val) {
    const arr = [];
    for(let prop in obj){
      arr.push(obj[prop][val])
    }
    const x = this.findMostFrequent(arr);
    return x;
  }

  getTemp(obj) {
    const tempArr = [];
    for(let prop in obj){
      tempArr.push(obj[prop].minTemp);
      tempArr.push(obj[prop].maxTemp)
    }
    return tempArr;
  }

  findMostFrequent(arr) {
    let counts = {};
    let compare = 0;
    let mostFrequent;
    arr.forEach(function(val){
      if(!counts[val]){counts[val] = 1}
      else {counts[val] = counts[val] + 1}
      if(counts[val] > compare){
        compare = counts[val];
        mostFrequent = val;
      }
    });
    return mostFrequent;
  }

  render() {
    const weather = this.props.data
    const day = new Date(this.props.date).toString().split(' ')[0];
    const averageWeatherId = this.getAverageWeather(weather, 'id');
    const averageWeatherDesc = this.getAverageWeather(weather, 'desc');
    const minTemp = Math.floor(Math.min(...this.getTemp(weather)));
    const maxTemp = Math.floor(Math.max(...this.getTemp(weather)));
    return (
      <div className="weather-card">
        <p>{day}</p>
        <div className="weather-card-icon">
          <i className={this.setIcon(averageWeatherId)}></i>
        </div>
        <div>{averageWeatherDesc}</div>
        <span>{minTemp}°C</span>
        <span>{maxTemp}°C</span>
      </div>
    )
  }
}

export default WeatherCard;
