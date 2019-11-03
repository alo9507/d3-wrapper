import React from "react";
import styled from "@emotion/styled";

export default ({ xSvgCoord, ySvgCoord, metric, data, pointId, title }) => {
  const parentLimit = 300;
  const xOffset = xSvgCoord > parentLimit ? xSvgCoord : xSvgCoord + 5;
  const yOffset = ySvgCoord > parentLimit ? xSvgCoord : xSvgCoord + 5;

  return (
    <foreignObject
      x={xOffset}
      y={yOffset}
      width={"10%"}
      height={"20%"}
      id={`${pointId}-tooltip`}
      className="hide"
    >
      <ToolTipContainer>
        <p className="title">{title}</p>
        <p className="metric">{metric}</p>
      </ToolTipContainer>
    </foreignObject>
  );
};

const ToolTipContainer = styled.div`
  background-color: "blue";
  border-radius: 5px;
  color: white;
  padding: 5px;
  text-align: center;
  cursor: default;
  .title {
    font-weight: bold;
    margin-bottom: 0px;
  }
  .metric {
    margin-bottom: 0px;
  }
`;
