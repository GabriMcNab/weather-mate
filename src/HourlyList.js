import React from 'react';

import HourlyDetail from './HourlyDetail';

const hourlyList = (props) => {
  let hourlyDetails;
  if(props.data){
    hourlyDetails = props.data.map((obj, index) => (
      <HourlyDetail key={index} data={obj} />
    ));
  }

  return (
    <div>
      {hourlyDetails}
    </div>
  )
}

export default hourlyList;