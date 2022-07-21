import {
  axisBottom,
  axisLeft,
  BrushSelection,
  brushX,
  D3BrushEvent,
  extent,
  line,
  max,
  scaleLinear,
  scaleTime,
  select
} from 'd3';
import React, { useEffect, useRef } from 'react';
import useParseSize from '../../libs/useParseSize';
import ChartBaseProps from './chartProps';

type ChartDataType = { date: Date; value: number };

const LineZoomChart: React.FC<ChartBaseProps<ChartDataType>> = ({
  width,
  height,
  data
}) => {
  const [_width, _height] = useParseSize({ width, height });
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = select(svgRef.current);

    // scales
    const xScale = scaleTime()
      .domain(extent(data, (d) => d.date) as [Date, Date])
      .range([0, _width]);

    const yScale = scaleLinear()
      .domain([0, Number(max(data, (d) => +d.value))])
      .range([_height, 0]);

    // axises
    svg
      .append('g')
      .attr('transform', `translate(0, ${_height})`)
      .attr('class', 'x-axis')
      .call(axisBottom(xScale));
    svg.append('g').call(axisLeft(yScale));

    // line generator
    const lineGenerator = line<ChartDataType>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value));

    // brush
    const zoomChart = (e: D3BrushEvent<BrushSelection>) => {
      const _extent = e.selection;

      if (_extent) {
        xScale.domain([
          xScale.invert(_extent[0] as number),
          xScale.invert(_extent[1] as number)
        ]);
        svg
          .select('.x-axis')
          .transition()
          .duration(1000)
          .call(axisBottom(xScale) as any);

        svg.select('.myBrush').call(myBrush.move as any, null);

        svg
          .select('.myLine')
          .datum(data)
          .transition()
          .duration(1000)
          .attr('d', lineGenerator);
      }
    };

    const myBrush = brushX()
      .extent([
        [0, 0],
        [_width, _height]
      ])
      .on('end', zoomChart);

    svg.append('g').attr('class', 'myBrush').call(myBrush);

    // reset zoom
    svg.on('dblclick', () => {
      xScale.domain(extent(data, (d) => d.date) as [Date, Date]);

      svg
        .select('.x-axis')
        .transition()
        .duration(1000)
        .call(axisBottom(xScale) as any);

      svg
        .select('.myLine')
        .datum(data)
        .transition()
        .duration(1000)
        .attr('d', lineGenerator);
    });

    // draw Chart
    svg
      .append('g')
      .attr('clip-path', 'url(#clip)')
      .append('path')
      .datum(data)
      .join('path')
      .attr('class', 'myLine')
      .attr('stroke', 'tomato')
      .attr('fill', 'none')
      .attr('d', lineGenerator);

    // clipPath
    svg
      .append('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', _width)
      .attr('height', _height)
      .attr('x', 0)
      .attr('y', 0);
  }, [data, _width, _height]);

  return (
    <svg
      ref={svgRef}
      className='overflow-visible'
      width={_width}
      height={_height}
    />
  );
};

export default LineZoomChart;
