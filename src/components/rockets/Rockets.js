import React from 'react';
import RocketItem from './RocketItem';
import { makeStyles } from '@material-ui/core';
import Spinner from '../layout/Spinner';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    float: 'right',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
}));

const Rockets = ({ rockets, loading }) => {
  const classes = useStyles();
  const { root } = classes;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className={root}>
        {rockets.map((rocket) => (
          <RocketItem key={rocket.mission_name} rocket={rocket} />
        ))}
      </div>
    );
  }
};

export default Rockets;
