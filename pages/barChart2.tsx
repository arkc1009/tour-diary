import { NextPage } from 'next';
import React, { useState } from 'react';
import BarHorizonChart from '../components/charts/BarHorizonChart';

const BarChart2: NextPage = () => {
  const [data] = useState([
    { value: 10, label: 'abv' },
    { value: 35, label: 'b' },
    { value: 50, label: 'c' },
    { value: 48, label: 'd' },
    { value: 20, label: 'e' },
    { value: 42, label: 'f' },
    { value: 35, label: 'g' }
  ]);

  const width = 1024;
  const height = 768;

  return (
    <div className='p-8'>
      <BarHorizonChart width={width} height={height} data={data} />
    </div>
  );
};

export default BarChart2;
