import { NextPage } from 'next';
import React, { useState } from 'react';
import BarVerticalChart from '../components/charts/BarVerticalChart';

const BarChart: NextPage = () => {
  const [data] = useState([5, 10, 20, 30, 50]);

  const width = 1024;
  const height = 768;

  return (
    <div className='p-8'>
      <BarVerticalChart width={width} height={height} data={data} />
    </div>
  );
};

export default BarChart;
