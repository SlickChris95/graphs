// /*
// Review on Scales:
// scales are a function that receives an input value(domain)
// and receives an output value(range)
/*
Line Chart checklist:

1.Add an SVG to draw our line chart on
2.Use the D3 standard margin convetion
3.Create an x axis
4.Create a y axis
5.Create an x scale
6.Create a y scale
7.Create a line generator
8.Create a random dataset
9.Create a path object for the line
10.Bind the data to the path object
11.Call the line generator on the data-bound path object
12.Add circles to show each datapoint
13.Add some basic styling to the chart so its easier on the eyes


*/
/*

let data = [
  [
    {name: "United States", iso: "USA", date: 2000-04-01, price: 2.51},
    {name: "United States", iso: "USA", date: 2001-04-01, price: 2.54},
    {name: "United States", iso: "USA", date: 2002-04-01, price: 2.49},
    {name: "United States", iso: "USA", date: 2003-04-01, price: 2.71},
    {name: "United States", iso: "USA", date: 2004-05-01, price: 2.9}
  ],
  [
    {name: "Sweden", iso: "SWE", date: 2000-04-01, price: 2.71493212669683},
    {name: "Sweden", iso: "SWE", date: 2001-04-01, price: 2.33463035019455},
    {name: "Sweden", iso: "SWE", date: 2002-04-01, price: 2.5},
    {name: "Sweden", iso: "SWE", date: 2003-04-01, price: 3.59712230215827},
    {name: "Sweden", iso: "SWE", date: 2004-05-01, price: 3.94218134034166}
  ],
  [
    {name: "China", iso: "CHN", date: 2000-04-01, price: 1.19565217391304},
    {name: "China", iso: "CHN", date: 2001-04-01, price: 1.19565217391304},
    {name: "China", iso: "CHN", date: 2002-04-01, price: 1.26811594202899},
    {name: "China", iso: "CHN", date: 2003-04-01, price: 1.19565217391304},
    {name: "China", iso: "CHN", date: 2004-05-01, price: 1.256038647343}
  ],
  [
    {name: "Euro area", iso: "EUZ", date: 2000-04-01, price: 2.38080000045235},
    {name: "Euro area", iso: "EUZ", date: 2001-04-01, price: 2.26160000072371},
    {name: "Euro area", iso: "EUZ", date: 2002-04-01, price: 2.37629999919206},
    {name: "Euro area", iso: "EUZ", date: 2003-04-01, price: 2.9810000002981},
    {name: "Euro area", iso: "EUZ", date: 2004-05-01, price: 3.2880000013152}
  ]
]
*/

// 2. Use the margin convention practice
var margin = {top: 70, right: 70, bottom: 70, left: 70}
// var width = window.innerWidth - margin.left - margin.right // Use the window's width
// var height = window.innerHeight - margin.top - margin.bottom; // Use the window's height

var width = 500;
var height = 700;

// The number of datapoints
var n = 5;

// 5. X scale will use the index of our data
var xScale = d3.scaleLinear()
    .domain([0, n-1]) // input
    .range([0, width]); // output

// 6. Y scale will use the randomly generate number
var yScale = d3.scaleLinear()
    .domain([0, 1]) // input
    .range([height, 0]); // output, it is backwards b/c it is inverted remember?

// 7. d3's line generator
var line = d3.line()
    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
    .curve(d3.curveMonotoneX) // apply smoothing to the line

// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })

// 1. Add the SVG to the page and employ #2
// var svg = d3.select("body").append("svg")
var svg = d3.select("svg")

    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
  // need to move our graph left and down based on our margins
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 3. Call the x axis in a group tag
svg.append("g")
    .attr("class", "x axis")
    // .attr("transform", "translate(0," + height + ")")
    .attr("transform", `translate(${0},${height})`)
    .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

// 9. Append the path, bind the data, and call the line generator
svg.append("path")
    .datum(dataset) // 10. Binds data to the line
    .attr("class", "line") // Assign a class for styling
    .attr("d", line); // 11. Calls the line generator

// 12. Appends a circle for each datapoint
svg.selectAll(".dot")
    .data(dataset)
  .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d, i) { return xScale(i) })
    .attr("cy", function(d) { return yScale(d.y) })
    .attr("r", 5)
