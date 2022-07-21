import {
  area,
  axisBottom,
  axisLeft,
  extent,
  max,
  scaleLinear,
  scaleTime,
  select
} from 'd3';
import React, { useEffect, useMemo, useRef } from 'react';
import useParseSize from '../../libs/useParseSize';
import ChartBaseProps from './chartProps';

type ChartDataType = { date: Date; value: number };

const AreaChart: React.FC<ChartBaseProps<{ date: string; value: number }>> = ({
  width,
  height,
  data
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [_width, _height] = useParseSize({ width, height });

  const newData = useMemo(
    () =>
      data.map((d) => ({
        date: new Date(d.date),
        value: d.value
      })),
    []
  );

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleTime()
      .domain(extent(newData, (d) => d.date) as any)
      .range([0, _width]);

    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(axisBottom(xScale));

    const yScale = scaleLinear()
      .domain([0, Number(max(newData, (d) => +d.value))])
      .range([_height, 0]);

    svg.append('g').call(axisLeft(yScale));

    const generateArea = area<ChartDataType>()
      .x((d) => xScale(d.date))
      .y0(yScale(0))
      .y1((d) => yScale(d.value));

    svg
      .append('path')
      .datum(newData)
      .attr('stroke', '#69b3a2')
      .attr('stroke-width', 1.5)
      .attr('fill', 'tomato')
      .attr('d', generateArea);
  }, [newData, _width, _height]);

  return (
    <svg
      ref={svgRef}
      width={_width}
      height={_height}
      className='overflow-visible'
    />
  );
};

export default AreaChart;
