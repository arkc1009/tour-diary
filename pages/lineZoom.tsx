import { csv, timeParse } from 'd3';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import LineZoomChart from '../components/charts/LineZoomChart';

const LineZoom: NextPage = () => {
  const [data, setData] = useState();

  useEffect(() => {
    csv(
      'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv',
      (d) => ({ date: timeParse('%Y-%m-%d')(d.date || ''), value: d.value })
    ).then((data) => {
      console.log(data);
      setData(data as any);
    });
  }, []);

  return (
    <div className='p-8'>
      {data ? (
        <LineZoomChart data={data} width={1024} height={768} />
      ) : (
        'loading...'
      )}
    </div>
  );
};

export default LineZoom;
