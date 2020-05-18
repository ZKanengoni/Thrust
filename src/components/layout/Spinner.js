import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

const Spinner = () => {
  return (
    <div style={{ marginLeft: '50rem', marginTop: '10rem' }}>
      <PulseLoader size={10} color={'#A9A9A9'} />
    </div>
  );
};

export default Spinner;
