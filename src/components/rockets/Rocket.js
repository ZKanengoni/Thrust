import React, { useEffect } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Linegraph from '../graphs/Linegraph';
import Bargraph from '../graphs/Bargraph';
// import Doughnutgraph from '../graphs/Doughnutgraph';

const useStyles = makeStyles({
  root: {
    width: '97.2%',
    height: '30vh',
    marginLeft: '1rem',
    marginTop: '1rem',
  },
  small: {
    width: '250px',
    height: '250px',
    marginLeft: '1rem',
    marginTop: '1rem',
    float: 'left',
  },
  smaller: {
    width: '250px',
    height: '215px',
    marginLeft: '1rem',
    marginTop: '1rem',
    float: 'left',
  },
  large: {
    width: '852px',
    height: '480px',
    marginTop: '1rem',
    marginRight: '1rem',
    float: 'right',
  },
});

const Rocket = (props) => {
  useEffect(() => {
    props.getLaunch(props.match.params.flight_number);
  }, []);

  const { rocket } = props.launch;

  if (rocket !== undefined) props.getRocket(rocket.rocket_id);

  const classes = useStyles();

  const {
    cost_per_launch,
    success_rate_pct,
    height,
    diameter,
    mass,
    payload_weights,
  } = props.rocket;

  const { loading } = props;

  if (loading) return <Spinner />;
  console.log(cost_per_launch);

  return (
    <div style={{ width: '80%', float: 'right' }}>
      <Card className={classes.root} variant='outlined'>
        <Linegraph />
      </Card>
      <Card className={classes.small} variant='outlined'></Card>
      <Card className={classes.large} variant='outlined'>
        {cost_per_launch}
      </Card>
      <Card className={classes.smaller} variant='outlined'>
        <Bargraph />
      </Card>
    </div>
  );
};

Rocket.propTypes = {
  loading: PropTypes.bool.isRequired,
  rocket: PropTypes.object.isRequired,
  getRocket: PropTypes.func.isRequired,
};

export default Rocket;
