import React from 'react';

import classes from './Icon.css';

const weatherCurrentIcon = (props) => {
  //import all icon ULR's and convert to array of URL
  const icons = require.context('../../../../img/weather-icons/', false, /\.(png|jpe?g|svg)$/);
  const iconsArr = icons.keys().map(icons);

  const time = new Date(Date.now()).getHours();
  let iconURL;

  if (time > 7 && time < 20) {  //if it's daytime get day icons
    iconURL = iconsArr.filter(url => url.includes(`${props.id}-day`)).toString();    //get matching URL from array
  } else {   //if it's nighttime get night icons
    iconURL = iconsArr.filter(url => url.includes(`${props.id}-night`)).toString();
  }
  return (
    <div className={classes.IconBox}>
      <img 
        src={iconURL} 
        alt={`${props.id} weather icon`} 
        className={classes.Icon} />
    </div>
  )
}

export default weatherCurrentIcon;