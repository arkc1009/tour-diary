import {
  axisBottom,
  axisLeft,
  extent,
  max,
  scaleBand,
  scaleLinear,
  select
} from 'd3';
import React, { useEffect, useRef } from 'react';
import useParseSize from '../../libs/useParseSize';
import ChartBaseProps from './chartProps';

const BarVerticalChart: React.FC<ChartBaseProps<number>> = ({
  width,
  height,
  data
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const [_width, _height] = useParseSize({ width, height });

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleBand<number>()
      .domain(data.map((_, i) => i))
      .range([0, _width])
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([Number(max(data)) + 5, 0])
      .range([0, _height]);

    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale).ticks(5);

    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${_height})`)
      .call(xAxis as any);
    svg.select('.y-axis').call(yAxis as any);

    console.log(
      'extent:',
      extent(data, (d) => d)
    );

    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .style('transform', 'scale(1, -1)')
      .attr('x', (d, i) => xScale(i) || 0)
      .attr('y', -_height)
      .attr('width', xScale.bandwidth())
      .transition()
      .attr('height', (d) => _height - yScale(d))
      .attr('fill', 'orange');
  }, [data, _width, _height]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ overflow: 'visible' }}
    >
      <g className='x-axis' />
      <g className='y-axis' />
    </svg>
  );
};

export default BarVerticalChart;
