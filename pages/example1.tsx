import { select } from "d3";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";

const Example1: NextPage = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [data, setData] = useState([5, 10, 20, 30, 50]);

  useEffect(() => {
    const svg = select(svgRef.current);

    svg
      .selectAll("path")
      .data(data)
      .join("path")
      .attr("r", (value) => value)
      .attr("cx", (value) => value * 2)
      .attr("cy", (value) => value * 2)
      .attr("stroke", "red");
  }, [data]);

  return (
    <div className="p-8">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Example1;
