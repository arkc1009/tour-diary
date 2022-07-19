import {
  axisBottom,
  axisLeft,
  extent,
  max,
  scaleBand,
  scaleLinear,
  select,
} from "d3";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";

const BarChart: NextPage = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [data, setData] = useState([5, 10, 20, 30, 50]);

  const width = 1024;
  const height = 768;

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleBand<number>()
      .domain(data.map((_, i) => i))
      .range([0, width])
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([Number(max(data)) + 5, 0])
      .range([0, height]);

    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale).ticks(5);

    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis as any);
    svg.select(".y-axis").call(yAxis as any);

    console.log(
      "extent:",
      extent(data, (d) => d)
    );

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)")
      .attr("x", (d, i) => xScale(i) || 0)
      .attr("y", -height)
      .attr("width", xScale.bandwidth())
      .transition()
      .attr("height", (d) => height - yScale(d))
      .attr("fill", "orange");
  }, [data]);

  return (
    <div className="p-8">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{ overflow: "visible" }}
      >
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default BarChart;
