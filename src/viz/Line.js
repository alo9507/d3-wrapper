import React from "react";

export default ({ pathData, lineColor }) => {
  return <line d={pathData} fill={lineColor} stroke={"red"} strokeWidth={2} />;
};
