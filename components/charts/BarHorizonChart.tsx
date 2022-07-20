import {
  axisLeft,
  axisTop,
  interpolatePlasma,
  max,
  scaleBand,
  scaleLinear,
  select
} from 'd3';
import React, { useCallback, useEffect, useRef } from 'react';
import useParseSize from '../../libs/useParseSize';
import ChartBaseProps from './chartProps';

const BarHorizonChart: React.FC<
  ChartBaseProps<{ value: number; label: string }>
> = ({ width, height, data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const [_width, _height] = useParseSize({ width, height });

  const renderChart = useCallback(() => {
    const svg = select(svgRef.current);

    const xScale = scaleLinear()
      .domain([0, Number(max(data, (d) => d.value))])
      .range([0, _width]);

    const xAxis = axisTop(xScale);

    const yScale = scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, _height])
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
  }, [data, _width, _height]);

  useEffect(() => {
    renderChart();
  }, [renderChart]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ overflow: 'visible' }}
    >
      <g className='x-axis' style={{ strokeWidth: 0 }} />
      <g className='y-axis' style={{ strokeWidth: 0 }} />
    </svg>
  );
};

export default BarHorizonChart;
