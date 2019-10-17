import React, { Component } from "react";
import { scaleTime, scaleLinear } from "d3-scale";
import { line, curveLinear } from "d3-shape";
import { extent, min } from "d3-array";
import { timeParse } from "d3-time-format";

export default class LineChart extends Component {
  render() {
    var lineData = [];

    lineData.push({ date: "08:00", nps: 89 });
    lineData.push({ date: "09:00", nps: 72 });
    lineData.push({ date: "10:00", nps: 65 });
    lineData.push({ date: "11:00", nps: 50 });

    var height = 200;
    var width = 700;

    var margin = { top: 20, right: 15, bottom: 25, left: 25 };

    width = width - margin.left - margin.right;
    height = height - margin.top - margin.bottom;

    const timeParser = timeParse("%H:%M");
    lineData.forEach(function(d) {
      d.date = timeParser(d.date);
    });
    console.log(lineData);

    var xScale = scaleTime().range([0, width]);
    xScale.domain([
      extent(lineData, d => {
        return d.date;
      })
    ]);

    var yScale = scaleLinear().range([height, 0]);
    yScale.domain([
      min(lineData, d => {
        return d.nps;
      }) - 5,
      100
    ]);

    // inputs: an array of co-ordinates ; output: path data string
    var lineGenerator = line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.nps))
      .curve(curveLinear);

    var pathData = lineGenerator(lineData);

    console.log(pathData);

    return (
      <div>
        <h1>Chart</h1>
        <svg
          width={width + margin.left + margin.right}
          height={height + margin.top + margin.bottom}
        >
          <g transform={`translate(${margin.left},${margin.top})`}>
            <path
              d={pathData}
              fill="none"
              stroke="black"
              strokeWidth="3"
            ></path>
          </g>
        </svg>
      </div>
    );
  }
}
