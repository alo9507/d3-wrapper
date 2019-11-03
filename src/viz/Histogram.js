import React from "react";
import { scaleLinear } from "d3-scale";
import { histogram as d3Histogram } from "d3";
import * as d3Array from "d3-array";
import Axis from "./Axis";
import Bars from "./Bars";

class Histogram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  render() {
    const { data, domain, x_label, y_label, title } = this.props;
    const margin = { top: 20, right: 40, bottom: 50, left: 50 };
    const width = 500;
    const height = 410;

    const max_domain = domain ? domain : d3Array.max(data, d => d);

    const xScale = scaleLinear()
      .domain([0, max_domain])
      .range([0, width]);

    const histogram = d3Histogram()
      .domain(xScale.domain())
      .thresholds(xScale.ticks(max_domain));

    const bins = histogram(data);

    const yScale = scaleLinear()
      .domain([0, d3Array.max(bins, d => d.length)])
      .range([height, 0]);

    const barProps = {
      xScale,
      yScale,
      bins,
      height
    };

    return (
      <div>
        <p>{title}</p>
        <svg
          width={width + margin.left + margin.right}
          height={height + margin.top + margin.bottom}
        >
          <g transform={`translate(${margin.left},${margin.top})`}>
            <Axis
              orientation={"Bottom"}
              height={height}
              width={width}
              scale={xScale}
              label={x_label}
            />
            <Axis
              orientation={"Left"}
              height={height}
              width={width}
              scale={yScale}
              label={y_label}
            />
            <Bars {...barProps} />
          </g>
        </svg>
      </div>
    );
  }
}
