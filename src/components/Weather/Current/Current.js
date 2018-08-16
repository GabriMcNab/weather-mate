import React from 'react';
import WeatherCurrentIcon from './Icon/Icon';
import WeatherCurrentDetail from './Detail/Detail';
import Location from './Location/Location';

const weatherCurrent = (props) => {
  const currentWeather = props.fullForecast[0][0];
  const avgTemp = Math.floor((currentWeather.maxTemp + currentWeather.minTemp) / 2);

  return (
    <React.Fragment>
      <WeatherCurrentIcon id={currentWeather.id}/>
      <WeatherCurrentDetail 
        desc={currentWeather.desc}
        temp={avgTemp} />
      <Location
        city={props.city}
        country={props.country} />
    </React.Fragment>
  )
}

export default weatherCurrent;