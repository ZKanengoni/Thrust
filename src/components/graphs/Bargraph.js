import React from 'react';
import { Bar } from 'react-chartjs-2';

// const data = {
//   datasets: [
//     {
//       label: 'Cost per launch (million $)',
//       data: [14, 19, 3, 5, 2, 3],
//       backgroundColor: ['rgba(255, 99, 132, 0.2)'],
//       borderColor: ['rgba(255, 99, 132, 1)'],
//       borderWidth: 1,
//     },
//   ],
// };

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
