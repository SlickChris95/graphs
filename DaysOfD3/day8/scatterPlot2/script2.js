/*
***** Scatter plot using csv file *****

Scatter Plot Steps:
  1) select SVG
  2) margin convention
  3) read data
  4) define x & y scale
  5) define x & y coordinates
  6) define color if needed
*/

// 2) margin convention
let margin = { top: 10, right: 30, bottom: 30, left: 60}
let width = 460 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;
// 1) select svg
let svg = d3.select('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
.append('g')
  .attr('transform',
        `translate(${margin.left},${margin.top})`);

// 3) read data
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv",
  (data)=>{
    // 4) define x & y scale
    let xScale = d3.scaleLinear()
      .domain([4,8]) // input, based on our data
      .range([0, width]); // output
    svg.append('g')
      .attr('transform',
            `translate(${0},${height})`)
      .call(d3.axisBottom(xScale))
    let yScale = d3.scaleLinear()
      .domain([0,9]) // input, based on our data
      .range([height,0]) // output
    svg.append('g')
      .call(d3.axisLeft(yScale));

    // color scale: give me a species name, I return a color
    // does this for each group.
    let color = d3.scaleOrdinal()
      .domain(["setosa", "versicolor", "virginica" ])
      .range(["red", "yellow", "blue"])

    // add dots
    svg.append('g')
      .selectAll('dot')
      .data(data)
      .enter()
      .append('circle')
        .attr('cx',(d)=>{return xScale(d.Sepal_Length)})
        .attr("cy", function (d) { return yScale(d.Petal_Length); } )
        .attr("r", 5)
        .style("fill", function (d) { return color(d.Species) } )

  })
