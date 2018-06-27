import React, {Component} from 'react';

import WeatherForecastList from './List/List';
import WeatherForecastHourlyList from './Hourly/List/List';

const weatherForecast = (props) => {
  // setIcon(id) {
  //   if(id === 800){return "wi wi-day-sunny"}
  //   else if(id >= 200 && id < 300){return "wi wi-thunderstorm"}
  //   else if(id >= 300 && id < 400){return "wi wi-day-sprinkle"}
  //   else if(id >= 500 && id < 600){return "wi wi-rain"}
  //   else if(id >= 600 && id < 700){return "wi wi-snow"}
  //   else if(id >= 700 && id < 800){return "wi wi-fog"}
  //   else if(id > 800 && id < 900){return "wi wi-cloud"}
  // }
  return (
    <React.Fragment>
      <h1>Five Days Forecast</h1>
      <WeatherForecastList 
        fiveDaysForecast={props.fiveDaysForecast} 
        clicked={props.clicked}/>
      <h2>Hourly Detail</h2>
      {/* <WeatherForecastHourlyList /> */}
    </React.Fragment>
  )
}

export default weatherForecast;