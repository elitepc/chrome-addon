import React from 'react';

import { useStyles } from './CompanyInfo.styles';

export const CompanyInfo = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      Company
    </div>
  )
}