import React, { useEffect, useState } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Linegraph from '../graphs/Linegraph';
import Bargraph from '../graphs/Bargraph';
import axios from 'axios';
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
  const flightNum = props.match.params.flight_number;
  const [launch, setLaunch] = useState({});
  const [rocket, setRocket] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.spacexdata.com/v3/launches?flight_number=${flightNum}`)
      .then((response) => {
        setLaunch(response.data[0]);
        return response;
      })
      .then((response) => {
        axios
          .get(
            `https://api.spacexdata.com/v3/rockets/${response.data[0].rocket.rocket_id}`
          )
          .then((response) => {
            setRocket(response.data);
            setLoading(false);
          });
      })
      .catch((err) => 'err');
  }, []);

  const classes = useStyles();

  if (loading) return <Spinner />;

  const {
    cost_per_launch,
    success_rate_pct,
    height,
    mass,
    payload_weight,
  } = rocket;

  const { timeline } = launch;

  if (timeline != undefined) {
    const lineData = {
      labels: Object.keys(timeline),
      datasets: [
        {
          label: 'Liftoff Timeline (in seconds)',
          data: Object.values(timeline),
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const barData = {
      datasets: [
        {
          label: 'Cost per launch (million $)',
          data: [cost_per_launch],
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)'],
          borderWidth: 1,
        },
      ],
    };

    // console.log(data);
    return (
      <div style={{ width: '80%', float: 'right' }}>
        <Card className={classes.root} variant='outlined'>
          <Linegraph data={lineData} />
        </Card>
        <Card className={classes.small} variant='outlined'></Card>
        <Card className={classes.large} variant='outlined'></Card>
        <Card className={classes.smaller} variant='outlined'>
          <Bargraph data={barData} />
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
};

Rocket.propTypes = {
  loading: PropTypes.bool.isRequired,
  rocket: PropTypes.object.isRequired,
};

export default Rocket;
