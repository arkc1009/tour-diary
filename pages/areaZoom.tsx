import { csv, timeParse } from 'd3';
import { NextPage } from 'next';
import React from 'react';
import AreaZoomChart from '../components/charts/AreaZoomChart';

const AreaZoom: NextPage<{ data: string }> = ({ data }) => {
  return (
    <div className='p-12'>
      <AreaZoomChart data={JSON.parse(data)} width={1024} height={768} />
    </div>
  );
};

export async function getServerSideProps() {
  const res = await csv(
    'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv',
    (d) => ({ date: timeParse('%Y-%m-%d')(d.date || ''), value: d.value })
  );

  return {
    props: { data: JSON.stringify(res) }
  };
}

export default AreaZoom;
