import {
  arc,
  interpolate,
  interpolatePlasma,
  max,
  min,
  pie,
  scaleLinear,
  select
} from 'd3';
import React, { useEffect, useRef } from 'react';
import useParseSize from '../../libs/useParseSize';
import ChartBaseProps from './chartProps';

interface PieChartProps extends ChartBaseProps<number> {
  dount?: boolean;
}

const PieChart: React.FC<PieChartProps> = ({
  width,
  height,
  data,
  dount = false
}) => {
  const [_width, _height] = useParseSize({ width, height });

  const svgRef = useRef<SVGSVGElement>(null);
  const radius = Math.min(_width, _height) / 2;

  useEffect(() => {
    const svg = select(svgRef.current);
    const myPie = pie<number>().value((d) => d);

    const myArc = arc().innerRadius(0).outerRadius(radius);

    const colors = scaleLinear()
      .domain([Number(min(data)), Number(max(data))])
      .range([1, 0]);

    const slice = svg
      .attr('transform', `translate(${_width / 2}, ${_height / 2})`)
      .selectAll('path')
      .data(myPie(data))
      .join('path');

    slice.attr('fill', (d) => interpolatePlasma(colors(d.data)));

    slice
      .attr('d', myArc as any)
      .transition()
      .duration(1000)
      .attrTween('d', ((d: any) => {
        const i = interpolate(d.endAngle, d.startAngle);
        return function (t: any) {
          d.startAngle = i(t);
          return myArc(d as any);
        };
      }) as any)
      .attr('stroke', 'black')
      .attr('stroke-width', '0.1rem');

    svg
      .selectAll('text')
      .data(myPie(data))
      .join('text')
      .attr('transform', (d) => `translate(${myArc.centroid(d as any)})`)
      .style('opacity', 0)
      .attr('class', 'font-bold fill-white')
      .transition()
      .duration(800)
      .style('opacity', 1)
      .text((d) => `${d.data}`);
  }, [data, radius, _width, _height, dount]);

  return (
    <svg
      ref={svgRef}
      width={_width}
      height={_height}
      className='overflow-visible'
    />
  );
};

export default PieChart;
