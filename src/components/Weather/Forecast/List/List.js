import React from 'react';

import WeatherForecastItem from '../Item/Item';
import classes from './List.css';

const weatherForecastList = (props) => {
  const forecast = props.fiveDaysForecast;
  const weatherCards = forecast.map((obj, index) => {
    const day = new Date(obj.date).toString().split(' ')[0]; //get name of day from date obj
    return <WeatherForecastItem 
              key={index} 
              id={index} 
              clicked={props.clicked}
              day={day} 
              forecast={obj} />
  });
  return (
    <div className={classes.ForecastList}>
      {weatherCards}
    </div>
  )
}

export default weatherForecastList;