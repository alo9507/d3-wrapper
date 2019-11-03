import React from "react";

const Bars = ({ bins, xScale, yScale, height }) => {
  const bars = bins.map((bin, i) => {
    return (
      <rect
        key={i}
        x={1}
        transform={`translate(${xScale(bin.x0)}, ${yScale(bin.length)})`}
        width={xScale(bin.x1) - xScale(bin.x0) - 1}
        height={height - yScale(bin.length)}
        style={{ fill: "blue" }}
      />
    );
  });
  return bars;
};

export default Bars;
