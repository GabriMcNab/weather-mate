import React from 'react';

import classes from './Footer.css';
import githubIcon from '../../img/github.svg';

const footer = () => {
  return (
    <div className={classes.Footer}>
      <h3 className={classes.Heading3}>Like this app?</h3>
      <div className={classes.Social}>
        <h4 className={classes.Heading4}>Follow me on</h4>
        <a href="https://github.com/GabriMcNab" alt="github" className={classes.Link}>
          <img src={githubIcon} alt="github" height="20rem" />
        </a>
      </div>
      <div className={classes.FooterBottom}>
        <p>&copy; 2018 Gabriele Fazio.</p>
        <p>Weather data by <a href="https://openweathermap.org/" alt="Open Weather website link" className={classes.Link}>Open Weather</a></p>
      </div>
    </div>
  )
}

export default footer;