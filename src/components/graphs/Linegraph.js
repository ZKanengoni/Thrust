import React from 'react';
import { Line } from 'react-chartjs-2';

const Linegraph = (props) => {
  const { data } = props;

  return (
    <Line
      data={data}
      width={90}
      height={50}
      options={{ maintainAspectRatio: false }}
    />
  );
};

export default Linegraph;
