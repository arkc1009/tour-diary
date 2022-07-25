import { axisBottom, axisLeft, max, scaleLinear, select } from 'd3';
import React, { useEffect, useRef } from 'react';
import useParseSize from '../../libs/useParseSize';
import ChartBaseProps from './chartProps';

const ScatterChart: React.FC<
  ChartBaseProps<{ GrLivArea: number; SalePrice: number }>
> = ({ width, height, data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const [_width, _height] = useParseSize({ width, height });

  useEffect(() => {
    const svg = select(svgRef.current);

    // scales
    const xScale = scaleLinear()
      .domain([0, Number(max(data, (d) => Number(d.GrLivArea)))])
      .range([0, _width])
      .nice();

    const yScale = scaleLinear()
      .domain([0, Number(max(data, (d) => Number(d.SalePrice)))])
      .range([_height, 0])
      .nice();

    // axises
    svg
      .append('g')
      .attr('transform', `translate(0, ${_height})`)
      .call(axisBottom(xScale));

    svg.append('g').call(axisLeft(yScale));

    // charts
    svg
      .append('g')
      .selectAll('dot')
      .data(data)
      .join('circle')
      .attr('cx', (d) => xScale(d.GrLivArea))
      .attr('cy', (d) => yScale(d.SalePrice))
      .attr('r', 1.5)
      .style('fill', '#69b3a2');
  }, []);

  return (
    <svg
      ref={svgRef}
      width={_width}
      height={_height}
      className='overflow-visible'
    />
  );
};

export default ScatterChart;
