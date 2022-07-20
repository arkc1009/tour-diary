import React, { useState } from 'react';
import { NextPage } from 'next';
import PieChart from '../components/charts/PieChart';

const Pie: NextPage = () => {
  const [data] = useState([9, 20, 30, 8, 12]);

  return (
    <div className='p-8'>
      <PieChart data={data} width={1024} height={768} />
    </div>
  );
};

export default Pie;
