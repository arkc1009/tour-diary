import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import ScatterChart from '../components/charts/ScatterChart';
import { csv } from 'd3';

type chartType = { GrLivArea: number; SalePrice: number };

const Scatter: NextPage = () => {
  const [chartData, setChartData] = useState<chartType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    csv(
      'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv'
    )
      .then((data) => {
        setChartData(data as unknown as chartType[]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-12'>
      {loading ? (
        'loading'
      ) : (
        <ScatterChart data={chartData} width={1024} height={768} />
      )}
    </div>
  );
};

export default Scatter;
