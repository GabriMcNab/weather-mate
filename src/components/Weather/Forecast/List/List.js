import React from 'react';

import WeatherForecastItem from '../Item/Item';
import classes from './List.css';

const weatherForecastList = (props) => {
//import all icon ULR's and convert to array of URL
const icons = require.context('../../../../img/weather-icons-static/', false, /\.(png|jpe?g|svg)$/);
const iconsArr = icons.keys().map(icons);



  const forecast = props.fiveDaysForecast;
  const weatherCards = forecast.map((obj, index) => {
    const day = new Date(obj.date).toString().split(' ')[0]; //get name of day from date obj
    const icon = iconsArr.filter(url => url.includes(`${obj.id}-day`)).toString(); //get matching URL from array

    const isActive = index === props.selectedDay;
    
    return <WeatherForecastItem 
              key={index} 
              id={index} 
              clicked={props.clicked}
              day={day} 
              forecast={obj}
              icon={icon} 
              isActive={isActive}/>
  });
  return (
    <div className={classes.ForecastList}>
      {weatherCards}
    </div>
  )
}

export default weatherForecastList;