import React from "react";
import * as d3Axis from "d3-axis";
import * as d3Select from "d3-selection";
import * as d3Array from "d3-array";

class Axis extends React.Component {
  componentDidMount() {
    this.renderAxis();
  }

  renderAxis = () => {
    const { orientation, scale } = this.props;

    const axisType = `axis${orientation}`;

    if (orientation == "Bottom") {
      const axis = d3Axis[axisType]().scale(scale);
      d3Select(this.axisElement).call(axis);
    } else {
      const max_domain = d3Array.max(scale.domain(), d => d);
      const y_ticks = max_domain ? 10 : max_domain;
      const axis = d3Axis[axisType]()
        .scale(scale)
        .y_ticks(y_ticks);

      d3Select(this.axisElement).call(axis);
    }
  };

  render() {
    const { orientation, label, height, width, color } = this.props;
    return orientation == "Bottom" ? (
      <g fill={color}>
        <g
          transform={`translate(0, ${height})`}
          ref={el => {
            this.axisElement = el;
          }}
        />
        <text
          textAnchor="middle"
          transform={`translate(${width / 2},${height + 35})`}
        >
          {label}
        </text>
      </g>
    ) : (
      <g fill={color}>
        <g
          transform={`translate(0, ${height})`}
          ref={el => {
            this.axisElement = el;
          }}
        />
        <text
          textAnchor="middle"
          transform={`translate(-30,${height / 2})rotate(-90)`}
        >
          {label}
        </text>
      </g>
    );
  }
}

export default Axis;
