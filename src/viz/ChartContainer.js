import React from "react";
import LineChart from "./LineChart";

export default function ChartContainer() {
  var height = 200;
  var width = 700;

  var margin = { top: 20, right: 15, bottom: 25, left: 25 };

  width = width - margin.left - margin.right;
  height = height - margin.top - margin.bottom;

  let config = {
    margin: margin,
    width: width,
    height: height,
    title: "My Timeline",
    x_label: "Time",
    y_label: "Metric"
  };

  return (
    <div>
      <LineChart config={config} />
    </div>
  );
}
