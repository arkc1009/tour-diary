import { NextPage } from 'next';
import React, { useState } from 'react';
import LineChart from '../components/charts/LineChart';

const Line: NextPage = () => {
  const [data] = useState([
    { label: '2022-07-12', v: 90.14 },
    { label: '2022-07-13', v: 40.5 },
    { label: '2022-07-14', v: 67.23 },
    { label: '2022-07-15', v: 58.35 },
    { label: '2022-07-16', v: 80.22 },
    { label: '2022-07-17', v: 75.67 }
  ]);

  const [width, height] = [1024, 768];

  return (
    <div className='p-8'>
      <LineChart data={data} width={width} height={height} />
    </div>
  );
};

export default Line;
