const d3 = require("d3");

// Maps raw data in the form of [ time: metric ] and converts it to x and y values
const convertDataToLineData = data => {
  const pathData = [];

  Object.keys(data).forEach(key => {
    pathData.push({ x: key, y: data[key] });
  });
  return pathData;
};

// Maps X / Y Coordinate data to SVG Path Data
const generateD3Data = (lineData, height, width) => {
  // X
  const startTime = lineData[0].x;
  const endTime = lineData[lineData.length - 1].x;
  var minXValue = new Date(startTime);
  var maxXValue = new Date(endTime);

  var xRange = [minXValue, maxXValue];

  var xScale = d3
    .scaleTime()
    .domain(xRange)
    .range([0, width]);

  var xAccessorFunction = d => {
    const time = new Date("2000-01-01 " + d.x);
    return xScale(d.x);
  };

  //Y
  var minYValue = 0;
  var maxYValue;

  var yScale;
  var yRange;

  var yAccessorFunction;

  var metricAccessorFunction;

  maxYValue = Math.max(...lineData.map());

  yRange = [minYValue, maxYValue];

  yScale = d3
    .scaleLinear()
    .domain(yRange)
    .range([height, 0]);

  yAccessorFunction = d => {
    return yScale(d.y);
  };

  metricAccessorFunction = d => {
    // formatted string
    return d.y;
  };

  const lineFunction = d3
    .line()
    .x(xAccessorFunction)
    .y(yAccessorFunction)
    .curve(d3.curveLinear);

  const pathData = lineFunction;

  return {
    xRange,
    yRange,
    xScale,
    yScale,
    xAccessorFunction,
    yAccessorFunction,
    metricAccessorFunction,
    pathData
  };
};

module.exports = {
  convertDataToLineData,
  generateD3Data
};
