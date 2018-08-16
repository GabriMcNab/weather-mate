import React from 'react';

import classes from './Item.css';
import minTempIcon from '../../../../../img/temp-low.png';
import maxTempIcon from '../../../../../img/temp-high.png';
import windSpeedIcon from '../../../../../img/wind.png';
import windDirectionIcon from '../../../../../img/arrow.png';
import humidityIcon from '../../../../../img/humidity.png';

const weatherForecastHourlyItem = (props) => {
  return (
    <div className={classes.HourlyListItem}>
      <div className={classes.TimeBox}>
        <p>{props.time}</p>
      </div>
      <div className={classes.MainContainer}>
        <div className={classes.Container}>
          <p>{props.desc}</p>
        </div>
        <div className={classes.Container}>
          <div className={classes.SubContainer}>
            <img src={minTempIcon} alt="min temperaure icon" className={classes.Icon} />
            <p>{Math.floor(props.minTemp)}°c</p>
          </div>
          <div className={classes.SubContainer}>
            <img src={maxTempIcon} alt="max temperaure icon" className={classes.Icon} />
            <p>{Math.floor(props.maxTemp)}°c</p>
          </div>
        </div>
        <div className={classes.Container}>
          <div className={classes.SubContainer}>
            <img src={windSpeedIcon} alt="wind speed icon" className={classes.Icon} />
            <p>{Math.floor(props.windSpeed * 10) / 10} m/s</p>
          </div>
          <div className={classes.SubContainer}>
            <img src={windDirectionIcon}
              alt="wind direction icon"
              className={classes.Icon}
              style={{
                transform: `rotate(${props.windDirection}deg)`
              }} />
          </div>
        </div>
        <div className={classes.Container}>
          <img src={humidityIcon} alt="humidity icon" className={classes.Icon} />
          <p>{props.humidity}%</p>
        </div>
      </div>
    </div>
  )
}

export default weatherForecastHourlyItem;