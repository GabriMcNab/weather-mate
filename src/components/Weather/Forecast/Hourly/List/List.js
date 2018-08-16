import React from 'react';

import WeatherForecastHourlyItem from '../Item/Item';

import classes from './List.css';

const weatherForecastHourlyList = (props) => {


  const dailyForecast = props.fullForecast[props.selectedDay];
  const hourlyForecast = dailyForecast.map((obj, index) => {
    const date = new Date(obj.date);
    const time = date.getHours();

    return <WeatherForecastHourlyItem
      key={index}
      time={`${time}:00`}
      desc={obj.desc}
      minTemp={obj.minTemp}
      maxTemp={obj.maxTemp}
      windDirection={obj.windDirection}
      windSpeed={obj.windSpeed}
      humidity={obj.humidity} />
  });
  return (
    <div className={classes.List}>
      {hourlyForecast}
    </div>
  )
}

export default weatherForecastHourlyList;