import {
  axisLeft,
  axisTop,
  interpolatePlasma,
  max,
  scaleBand,
  scaleLinear,
  select
} from 'd3';
import { NextPage } from 'next';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const BarChart2: NextPage = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  const [data, setData] = useState([
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

  const renderChart = useCallback(() => {
    const svg = select(svgRef.current);

    const xScale = scaleLinear()
      .domain([0, Number(max(data, (d) => d.value))])
      .range([0, width]);

    const xAxis = axisTop(xScale);

    const yScale = scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, height])
      .padding(0.3);

    const yAxis = axisLeft(yScale);

    const colors = scaleLinear()
      .domain([0, Number(max(data, (d) => d.value))])
      .range([0, 1]);

    svg.select('.x-axis').call(xAxis as any);
    svg.select('.y-axis').call(yAxis as any);

    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', '.bar')
      .attr('x', xScale(0))
      .attr('y', (d) => yScale(d.label) || 0)
      .attr('height', yScale.bandwidth())
      .transition()
      .duration(1000)
      .attr('width', (d) => xScale(d.value))
      .attr('fill', (d) => interpolatePlasma(colors(d.value)));
  }, [data]);

  useEffect(() => {
    renderChart();
  }, [renderChart]);

  return (
    <div className='p-8'>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{ overflow: 'visible' }}
      >
        <g className='x-axis' style={{ strokeWidth: 0 }} />
        <g className='y-axis' style={{ strokeWidth: 0 }} />
      </svg>
    </div>
  );
};

export default BarChart2;
