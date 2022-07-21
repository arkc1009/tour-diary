import {
  area,
  axisBottom,
  axisLeft,
  BrushSelection,
  brushX,
  D3BrushEvent,
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

const AreaZoomChart: React.FC<
  ChartBaseProps<{ date: string; value: number }>
> = ({ width, height, data }) => {
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

    // Clip
    svg
      .append('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', _width)
      .attr('height', _height)
      .attr('x', 0)
      .attr('y', 0);

    // Scales, Axises
    const xScale = scaleTime()
      .domain(extent(newData, (d) => d.date) as any)
      .range([0, _width]);

    const xAxis = svg
      .append('g')
      .attr('transform', `translate(0, ${_height})`)
      .call(axisBottom(xScale));

    const yScale = scaleLinear()
      .domain([0, Number(max(newData, (d) => +d.value))])
      .range([_height, 0]);

    svg.append('g').call(axisLeft(yScale));

    const generateArea = area<ChartDataType>()
      .x((d) => xScale(d.date))
      .y0(yScale(0))
      .y1((d) => yScale(d.value));

    // Brush
    const updateChart = (event: D3BrushEvent<BrushSelection>) => {
      console.log(event.selection);
      const brushExtent = event.selection;

      if (brushExtent) {
        xScale.domain([
          xScale.invert(brushExtent.at(0) as number),
          xScale.invert(brushExtent[1] as number)
        ]);
        svg.select('.brush').call(_brush.move as any);
      }

      xAxis.transition().duration(1000).call(axisBottom(xScale));
      svg
        .select('.area')
        .datum(newData)
        .transition()
        .duration(1000)
        .attr('d', generateArea);
    };

    const _brush = brushX()
      .extent([
        [0, 0],
        [_width, _height]
      ])
      .on('end', updateChart);

    svg.append('g').attr('class', 'brush').call(_brush);

    // Draw Chart
    svg
      .append('g')
      .attr('clip-path', 'url(#clip)')
      .append('path')
      .attr('class', 'area')
      .datum(newData)
      .attr('stroke', '#69b3d5')
      .attr('stroke-width', 1.5)
      .attr('fill', 'aliceblue')
      .attr('d', generateArea);

    // On DoubleClick => reset
    svg.on('dblclick', () => {
      xScale.domain(extent(newData, (d) => d.date) as any);
      xAxis.transition().duration(1000).call(axisBottom(xScale));
      svg
        .select('.area')
        .datum(newData)
        .transition()
        .duration(1000)
        .attr('d', generateArea);
    });
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

export default AreaZoomChart;
