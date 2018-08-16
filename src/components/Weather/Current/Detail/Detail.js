import React from 'react';

import classes from './Detail.css';

const weatherCurrentDetail = (props) => {
  return (
    <div className={classes.DetailBox}>
      <p className={classes.Desc}>{props.desc}</p>
      <p className={classes.Temp}>{`${props.temp}°`}</p>
    </div>
  )
}

export default weatherCurrentDetail;