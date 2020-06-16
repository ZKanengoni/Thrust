import React, { useState } from 'react';
import { makeStyles, Card, Avatar, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  rocketstyle: {
    width: '250px',
    height: '250px',
    marginTop: '1.5em',
    marginLeft: '1.8rem',
    marginBottom: '0.5rem',
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    margin: 'auto',
    marginTop: '2rem',
  },
  btn: {
    top: '0.2rem',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'centre',
  },
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
}));

const myStyle = {
  marginBottom: '-1rem',
  float: 'right',
  marginTop: '1rem',
  marginRight: '1rem',
  color: 'grey',
  cursor: 'pointer',
};

let counter = 0;

const RocketItem = ({
  rocket: { mission_name, launch_year, flight_number },
  rocket,
}) => {
  const classes = useStyles();
  const { rocketstyle, large, btn } = classes;

  const handleSelectedRocket = (rocket) => {
    const rocketOne = window.localStorage.getItem('RocketOne');
    const rocketTwo = window.localStorage.getItem('RocketTwo');

    if ((rocketOne && !rocketTwo) || rocketTwo) {
      window.localStorage.setItem('RocketTwo', JSON.stringify(rocket));
    } else {
      window.localStorage.setItem('RocketOne', JSON.stringify(rocket));
    }
  };

  // function colorChange(e) {
  //   if (e.target.classList.conatians('fa-plus-square')) {
  //     e.target.style.color = 'rgba(255, 142, 83, 1)';
  //   }
  // }

  return (
    <div style={{ display: 'flex', justifyContent: 'Centre' }}>
      <Card className={rocketstyle} variant='outlined' id={'mission_name'}>
        <i
          onClick={() => handleSelectedRocket(rocket)}
          className='fas fa-plus-square'
          style={myStyle}
        ></i>
        <Avatar
          alt={mission_name}
          src='/static/images/avatar/1.jpg'
          className={large}
        />
        <h3>{mission_name}</h3>
        <h4 id={'year'}>{launch_year}</h4>
        <Link
          to={`/launch/${flight_number}`}
          style={{ textDecoration: 'none' }}
        >
          <Button
            variant='contained'
            color='primary'
            className={btn}
            classes={{
              root: classes.root,
              label: classes.label,
            }}
          >
            More
          </Button>
        </Link>
      </Card>
    </div>
  );
};

RocketItem.propTypes = {
  rocket: PropTypes.object.isRequired,
};

export default RocketItem;
