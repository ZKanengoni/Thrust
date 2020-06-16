import React, { useEffect, useState } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Linegraph from '../graphs/Linegraph';
import Bargraph from '../graphs/Bargraph';
import axios from 'axios';
import Doughnutgraph from '../graphs/Doughnutgraph';
import Paper from '@material-ui/core/Paper';

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
    height: '50%',
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

  const {
    timeline,
    mission_name,
    launch_date_local,
    launch_year,
    launch_site,
    links,
  } = launch;

  if (timeline !== undefined) {
    let lineData = {};
    let launch_success = '';

    if (timeline !== null && timeline !== undefined) {
      if (Object.keys(timeline).length <= 1) {
        launch_success = 'False';
      } else {
        launch_success = 'True';
      }
    }

    if (timeline !== null) {
      lineData = {
        labels: Object.keys(timeline),
        datasets: [
          {
            label: 'Liftoff Timeline (in seconds)',
            data: Object.values(timeline),
            backgroundColor: [
              'rgba(0, 120, 100, 0.8)',
              'rgba(0, 120, 100, 0.8)',
              'rgba(0, 120, 100, 0.8)',
              'rgba(0, 120, 100, 0.8)',
              'rgba(0, 120, 100, 0.8)',
              'rgba(0, 120, 100, 0.8)',
              'rgba(0, 120, 100, 0.8)',
              'rgba(0, 120, 100, 0.8)',
              'rgba(0, 120, 100, 0.8)',
              'rgba(0, 120, 100, 0.8)',
              'rgba(0, 120, 100, 0.8)',
              'rgba(0, 120, 100, 0.8)',
              'rgba(0, 120, 100, 0.8)',
              'rgba(0, 120, 100, 0.8)',
              'rgba(0, 120, 100, 0.8)',
              'rgba(0, 120, 100, 0.8)',
              'rgba(0, 120, 100, 0.8)',
              'rgba(0, 120, 100, 0.8)',
              'rgba(0, 120, 100, 0.8)',
              'rgba(0, 120, 100, 0.8)',
              'rgba(0, 120, 100, 0.8)',
              'rgba(0, 120, 100, 0.8)',
            ],
            borderWidth: 1,
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
            ],
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
          borderColor: ['rgba(255, 142, 83, 0.8)'],
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
          backgroundColor: ['rgba(255, 88, 94, 0.6)', 'rgba(0, 0, 0, 0.6)'],
          borderColor: ['rgba(255, 88, 94, 0.6)', 'rgba(0, 0, 0, 0.6)'],
          borderWidth: 1,
        },
      ],
    };

    let vidLink = links.video_link;
    let newLink = '';
    if (vidLink !== null) {
      newLink = vidLink.replace('watch?v=', 'embed/');
    }

    console.log(newLink);

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
          <Paper
            elevation={0}
            square
            style={{
              width: '350px',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              float: 'left',
            }}
          >
            <h1>Launch Information</h1>
            <p>Mission Name: {mission_name}</p>
            <p>Launch Date and Time: {launch_date_local}</p>
            <p>Launch Site: {launch_site.site_name_long}</p>
            <p>Launch Year: {launch_year}</p>
            <p>Successful launch: {launch_success}</p>
            <p>Rocket: {rocket_id}</p>
          </Paper>
          <Paper
            elevation={0}
            square
            style={{
              width: '500px',
              height: '100%',
              float: 'right',
            }}
          >
            <iframe
              width='500'
              height='477'
              src={newLink}
              frameborder='0'
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowfullscreen
            ></iframe>
          </Paper>
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
