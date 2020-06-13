import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const Doughnutgraph = (props) => {
  const { data } = props;

  return (
    <Doughnut
      data={data}
      width={100}
      height={50}
      options={{ maintainAspectRatio: false }}
    />
  );
};

export default Doughnutgraph;
