import React from 'react';
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
    marginLeft: '35%',
  },
}));

const myStyle = {
  color: 'grey',
  marginBottom: '-1rem',
  float: 'right',
  marginTop: '1rem',
  marginRight: '1rem',
};

const RocketItem = ({
  rocket: { mission_name, launch_year, flight_number },
  rocket,
  selectedRocket,
  setSelectedRocket,
}) => {
  const classes = useStyles();
  const { rocketstyle, large, btn } = classes;

  const handleSelectedRocket = (rocket) => {
    if (selectedRocket.length === 0) {
      setSelectedRocket(selectedRocket.concat(rocket));
    } else if (selectedRocket.length < 2) {
      setSelectedRocket(selectedRocket.concat(rocket));
    }

    console.log(selectedRocket);
  };

  return (
    <div>
      <Card className={rocketstyle} variant='outlined'>
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
        <h4>{launch_year}</h4>
        <Link
          to={`/launch/${flight_number}`}
          style={{ textDecoration: 'none' }}
        >
          <Button variant='contained' color='primary' className={btn}>
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
