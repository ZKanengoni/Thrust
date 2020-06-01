import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const data = {
  labels: ['Failed', 'Passed'],
  datasets: [
    {
      label: '#Successful Launches',
      data: [12, 19],
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
      borderWidth: 1,
    },
  ],
};

const Doughnutgraph = () => {
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
