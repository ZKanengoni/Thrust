import React, { useState } from 'react';
import RocketItem from './RocketItem';
import { makeStyles } from '@material-ui/core';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

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
  const [selectedRocket, setSelectedRocket] = useState([]);
  const classes = useStyles();
  const { root } = classes;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className={root}>
        {rockets.map((rocket) => (
          <RocketItem
            key={rocket.mission_name}
            rocket={rocket}
            selectedRocket={selectedRocket}
            setSelectedRocket={setSelectedRocket}
          />
        ))}
      </div>
    );
  }
};

Rockets.propTypes = {
  rockets: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Rockets;
