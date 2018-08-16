import React from 'react';

import classes from './Layout.css';

const layout = (props) => (
    <main className={classes.MainContainer}>
      {props.children}
    </main>
)

export default layout;