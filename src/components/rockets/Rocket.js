import React, { useEffect, useState } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Linegraph from '../graphs/Linegraph';
import Bargraph from '../graphs/Bargraph';
import axios from 'axios';
import Doughnutgraph from '../graphs/Doughnutgraph';
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
  innerCard: {
    width: '50%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    float: 'left',
  },
  innerVideo: {
    width: '50%',
    height: '100%',
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
    rocket_id,
  } = rocket;

  const { timeline } = launch;

  if (timeline !== undefined) {
    let lineData = {};

    if (timeline !== null) {
      lineData = {
        labels: Object.keys(timeline),
        datasets: [
          {
            label: 'Liftoff Timeline (in seconds)',
            data: Object.values(timeline),
            backgroundColor: [
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
              'rgba(255, 142, 83, 0.8)',
            ],
            borderColor: [
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
            ],
            borderWidth: 1,
          },
        ],
      };
    }

    const barData = {
      datasets: [
        {
          label: 'Cost per launch (million $)',
          data: [cost_per_launch],
          backgroundColor: ['rgba(255, 142, 83, 0.8)'],
          borderColor: ['#000000'],
          borderWidth: 1,
        },
      ],
    };

    const doughnutData = {
      labels: ['% of successful launches', '%  of unsuccessful launches'],
      datasets: [
        {
          label: `${rocket_id} launch success rate (%)`,
          data: [success_rate_pct, 100 - success_rate_pct],
          backgroundColor: ['rgba(255, 142, 83, 0.8)', 'rgba(0, 0, 0, 0.8)'],
          borderColor: ['#000000', '#000000'],
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
        <Card className={classes.small} variant='outlined'>
          <Doughnutgraph data={doughnutData} />
        </Card>
        <Card className={classes.large} variant='outlined'>
          <Card variant='outlined' className={classes.innerCard}>
            <h1
              style={{
                color: '#fff',
                textAlign: 'center',
                marginTop: '1rem',
                fontSize: '25px',
              }}
            >
              Launch Information
            </h1>
          </Card>
          <Card variant='outlined' className={classes.innerVideo}>
            {/* Video here */}
          </Card>
        </Card>
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
