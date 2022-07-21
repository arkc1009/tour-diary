import React, { useState } from 'react';
import { NextPage } from 'next';
import PieChart from '../components/charts/PieChart';

const Pie: NextPage = () => {
  const chartData = [
    [9, 20, 30, 8, 12],
    [10, 10, 10, 30, 80]
  ];
  const [dataIndex, setdataIndex] = useState<0 | 1>(0);

  return (
    <div className='p-8'>
      <div>
        <button
          onClick={() => setdataIndex((prevIndex) => (prevIndex === 1 ? 0 : 1))}
          className='rounded bg-slate-500 py-4 px-8 text-white'
        >
          Change Value
        </button>
      </div>
      <PieChart
        data={chartData.at(dataIndex) || []}
        width={1024}
        height={768}
      />
    </div>
  );
};

export default Pie;
