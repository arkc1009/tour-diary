import {
  axisBottom,
  axisLeft,
  curveCardinal,
  max,
  scaleBand,
  scaleLinear,
  select
} from 'd3';
import { line } from 'd3-shape';
import { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';

const LineChart: NextPage = () => {
  const [data] = useState([
    { label: '2022-07-12', v: 90.14 },
    { label: '2022-07-13', v: 40.5 },
    { label: '2022-07-14', v: 67.23 },
    { label: '2022-07-15', v: 58.35 },
    { label: '2022-07-16', v: 80.22 },
    { label: '2022-07-17', v: 75.67 }
  ]);

  const [width, height] = [1024, 768];
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleBand()
      .domain(data.map(({ label }) => label))
      .range([0, width]);

    const xAxis = axisBottom(xScale);

    const yScale = scaleLinear()
      .domain([0, Number(max(data, ({ v }) => v))])
      .range([height, 0])
      .nice();

    const yAxis = axisLeft(yScale);

    const linePath = line<{ label: string; v: number }>()
      .x((d) => (xScale(d.label) || 0) + 85)
      .y((d) => yScale(d.v))
      .curve(curveCardinal);

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);

    const myPath = svg
      .append('path')
      .data([data])
      .join('path')
      .attr('d', linePath)
      .attr('fill', 'none')
      .attr('stroke', 'tomato')
      .attr('stroke-width', '.5rem');

    const pathLength = myPath.node()?.getTotalLength();

    myPath
      .attr('stroke-dasharray', pathLength || 0)
      .attr('stroke-dashoffset', pathLength || 0)
      .transition()
      .duration(1000)
      .attr('stroke-dashoffset', 0);
  }, [data, width, height]);

  return (
    <div className='p-8'>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className='overflow-visible'
      ></svg>
    </div>
  );
};

export default LineChart;
