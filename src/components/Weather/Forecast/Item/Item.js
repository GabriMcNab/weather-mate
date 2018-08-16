import React from 'react';

import classes from './Item.css';

const weatherForecastItem = (props) => {
  let activeStyle;

  if(props.isActive) {
    activeStyle = {
      backgroundColor: "rgba(0,0,0,0.3)"
    }
  }

  return (
    <div className={classes.ForecastItem} style={activeStyle} onClick={(e) => props.clicked(e, props.id)}>
      <p>{props.day}</p>
      <div className={classes.IconContainer}>
        <img src={props.icon} alt={`${props.forecast.desc} weather icon`} className={classes.Icon} />
      </div>
      <p>
        <span>{props.forecast.minTemp}°</span>
        <span>{props.forecast.maxTemp}°</span>
      </p>
    </div>
  )
}

export default weatherForecastItem;