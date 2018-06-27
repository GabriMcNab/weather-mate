import React from 'react';

import classes from './Item.css'

const weatherForecastItem = (props) => {
  return (
    <div>
      <p>{props.day}</p>
      <p>{props.forecast.desc}</p>
      <p>{props.forecast.minTemp}</p>
      <p>{props.forecast.maxTemp}</p>
    </div>
  )
}

export default weatherForecastItem;