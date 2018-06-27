import React, {Component} from 'react';
import WeatherCard from './WeatherCard';
import './WeatherList.css';

class WeatherList extends Component {
  render() {
    const dailyData = this.props.data;
    const weatherCard = dailyData.map((obj, index) => {
      let date = obj[0].date;
      return <WeatherCard key={index} id={index} clickHandler={this.props.clickHandler} date={date} data={obj} />
    });
    return (
      <div className="weather-list">
        {weatherCard}
      </div>
    )
  }
}

export default WeatherList;
