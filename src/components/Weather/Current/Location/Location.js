import React from 'react';

import classes from './Location.css';

const location = (props) => {
  return (
    <div>
      <p className={classes.Location}>{`${props.city}, ${props.country}`}</p>
    </div>
  )
}

export default location;