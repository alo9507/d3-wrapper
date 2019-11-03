import React from "react";
import Axis from "./Axis";
import Line from "./Line";
import Tooltip from "./Tooltip";
import styled from "@emotion/styled";

const chartUtils = require("./chartUtils");

export default props => {
  const {
    margin,
    width,
    height,
    title,
    x_label,
    y_label,
    state
  } = props.config;

  const currentTimeValue = "08:30";

  let rawObject = {
    "08:00": 1,
    "09:00": 3,
    "10:00": 2
  };

  const lineData = chartUtils.convertDataToLineData(rawObject);

  const {
    xRange,
    yRange,
    xScale,
    yScale,
    xAccessorFunction,
    yAccessorFunction,
    metricAccessorFunction,
    pathData
  } = chartUtils.generateD3Data(lineData, height, width);

  const lineProps = {
    pathData,
    lineColor: "blue"
  };

  function currentTime(currentTimeValue) {
    const realCurrentTime = xScale(currentTimeValue);

    return (
      <line
        x1={realCurrentTime}
        y1={0}
        x2={realCurrentTime}
        y2={height}
        stroke="red"
        strokeWidth="1"
      />
    );
  }

  function circles() {
    var keyGenerator = -1;

    return lineData.map(d => {
      const x = xAccessorFunction(d.x);
      const y = yAccessorFunction(d.y);

      keyGenerator++;
      return (
        <g key={keyGenerator}>
          <circle
            id={keyGenerator}
            key={d.y}
            cx={x}
            cy={y}
            r={5}
            fill={"red"}
            onMouseOver={event => showTooltip(event)}
            onMouseOut={event => hideTooltip(event)}
          />
        </g>
      );
    });
  }

  function gridLines() {
    var counter = 1;
    let maxY = yRange[yRange - 1];

    var gridLines = [];

    while (counter <= 10) {
      let y = (maxY * counter) / 10;
      let svgY = yScale(y);

      counter++;

      gridLines.push(
        <line
          key={counter}
          x1={0}
          y1={svgY}
          x2={width}
          y2={svgY}
          opacity={0.3}
          stroke="grey"
          strokeWidth="1"
        />
      );
    }
    return gridLines;
  }

  function tooltip(data) {
    var keyGenerator = -1;

    return lineData.map(d => {
      const x = xAccessorFunction(d);
      const y = xAccessorFunction(d);

      const metricValue = metricAccessorFunction(d);

      keyGenerator++;
      return (
        <g key={keyGenerator}>
          <Tooltip
            xSvgCoord={x}
            ySvgCoord={y}
            metricValue={metricValue}
            pointId={keyGenerator}
            data={data}
          />
        </g>
      );
    });
  }

  function showTooltip(event) {
    if (event.target) {
      const pointId = event.target.id;
      var tooltip = document.getElementById(`tooltip-${pointId}`);

      tooltip.classList.remove("hide");
      tooltip.classList.add("show");
    }
  }

  function hideTooltip(event) {
    if (event.target) {
      const pointId = event.target.id;
      var tooltip = document.getElementById(`tooltip-${pointId}`);

      tooltip.classList.remove("show");
      tooltip.classList.add("hide");
    }
  }

  return (
    <>
      <ChartTitle>{title}</ChartTitle>
      <svg
        color="white"
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g transform={`translate(${(margin.left, margin.top)})`}>
          {gridLines()}
          {currentTime(currentTimeValue)}
          <Axis
            orientation="Bottom"
            height={height}
            width={width}
            scale={xScale}
            label={x_label}
            color={"white"}
          />
          <Axis
            orientation="Left"
            height={height}
            width={width}
            scale={xScale}
            label={x_label}
            color={"white"}
          />
          <Line {...lineProps} />
          {circles()}
          {tooltip({})}
        </g>
      </svg>
    </>
  );
};

const ChartTitle = styled.h2`
  font-weight: bold;
`;
