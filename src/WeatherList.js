import React, {Component} from 'react';
import WeatherCard from './WeatherCard';
import './WeatherList.css';

class WeatherList extends Component {
  render() {
    const dailyData = this.props.data;
    const weatherCard = dailyData.map((obj, index) => {
      let date = parseInt(Object.keys(obj)[0], 10);
      return <WeatherCard key={index} date={date} data={obj} />
    });
    return (
      <div className="weather-list">
        {weatherCard}
      </div>
    )
  }
}

export default WeatherList;
