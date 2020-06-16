import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Linegraph from '../graphs/Linegraph';

const useStyles = makeStyles({
  contain: {
    width: '80%',
    height: '100%',
    float: 'right',
  },
  main: {
    width: '97.2%',
    height: '30vh',
    marginLeft: '1rem',
    marginTop: '1rem',
  },
});

function Compare() {
  const classes = useStyles();

  const rocketOne = JSON.parse(window.localStorage.getItem('RocketOne'));
  const rocketTwo = JSON.parse(window.localStorage.getItem('RocketTwo'));

  const data1 = {
    label: `Timeline of ${rocketOne.mission_name} launch(in seconds)`,
    data: rocketOne.timeline !== null ? Object.values(rocketOne.timeline) : [],
    backgroundColor: 'rgba(255, 142, 83, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255, 142, 83, 1)',
  };

  const data2 = {
    label: `Timeline of ${rocketTwo.mission_name} launch(in seconds)`,
    data: rocketTwo.timeline !== null ? Object.values(rocketTwo.timeline) : [],
    backgroundColor: 'rbga(0, 0, 0, 0.5)',
    borderWidth: 1,
    borderColor: '#000',
  };

  const launchData = {
    labels:
      (rocketOne.timeline !== null ? Object.keys(rocketOne.timeline) : '',
      rocketTwo.timeline !== null ? Object.keys(rocketTwo.timeline) : ''),
    datasets: [data1, data2],
  };

  return (
    <div className={classes.contain}>
      <Card className={classes.main} variant='outlined'>
        <Linegraph data={launchData} />
      </Card>
    </div>
  );
}

export default Compare;
