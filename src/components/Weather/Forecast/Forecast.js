import React from 'react';

import WeatherForecastList from './List/List';
import WeatherForecastHourlyList from './Hourly/List/List';

const weatherForecast = (props) => {
  return (
    <React.Fragment>
      <WeatherForecastList 
        fiveDaysForecast={props.fiveDaysForecast} 
        clicked={props.clicked}
        selectedDay={props.selectedDay} />
      <WeatherForecastHourlyList 
        fullForecast={props.fullForecast}
        selectedDay={props.selectedDay}/>
    </React.Fragment>
  )
}

export default weatherForecast;