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
import React, { useEffect, useRef } from 'react';
import useParseSize from '../../libs/useParseSize';
import ChartBaseProps from './chartProps';

type chartDataType = { label: string; v: number };

interface LineChartProps extends ChartBaseProps<chartDataType> {
  isAnimation?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  width,
  height,
  isAnimation = true
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const [_width, _height] = useParseSize({ width, height });

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleBand()
      .domain(data.map(({ label }) => label))
      .range([0, _width]);

    const xAxis = axisBottom(xScale);

    const yScale = scaleLinear()
      .domain([0, Number(max(data, ({ v }) => v))])
      .range([_height, 0])
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
      .attr('stroke-width', '.3rem');

    if (isAnimation) {
      const pathLength = myPath.node()?.getTotalLength();

      myPath
        .attr('stroke-dasharray', pathLength || 0)
        .attr('stroke-dashoffset', pathLength || 0)
        .transition()
        .duration(1000)
        .attr('stroke-dashoffset', 0);
    }
  }, [data, _width, _height, isAnimation]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className='overflow-visible'
    />
  );
};

export default LineChart;
