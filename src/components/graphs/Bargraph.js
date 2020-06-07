import React from 'react';
import { Bar } from 'react-chartjs-2';

const Bargraph = (props) => {
  const { data } = props;

  return (
    <Bar
      data={data}
      width={90}
      height={50}
      options={{ maintainAspectRatio: false }}
    />
  );
};

export default Bargraph;
