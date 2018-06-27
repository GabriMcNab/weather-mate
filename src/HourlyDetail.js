import React from 'react';

const hourlyDetail = (props) => {
  const date = new Date(props.data.date)
  const time = date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});;
  return (
    <div>
      <h1>{time}</h1>
      <span>{props.data.desc} </span>
      <span>Humidity: {props.data.humidity}% </span>
      <span>Min Temp: {Math.floor(props.data.minTemp)}°C </span>
      <span>Max Temp: {Math.floor(props.data.maxTemp)}°C </span>
      <span>Wind Direction: {Math.floor(props.data.windDirection * 10) / 10}° </span>
      <span>Wind Speed: {Math.floor(props.data.windSpeed * 10) / 10}m/s </span>
    </div>
  )
};

export default hourlyDetail;