/*
Line chart checklist
-----------------------------
1) 	Add an SVG to draw line chart
2) 	Use the D3 standard margin convention
3) 	Create x axis
4) 	Create y axis
5) 	Create y scale
6) 	Create x scale
7) 	Create a line generator
8) 	Create random data set
9) 	Create a path object for line
10) Bind the data to the path object
11)	Call the line generator on the data bound object
12) Add circles for points
13) Add Styling


*/

let dataset = [
  { letter: 'A', frequency: .08167},
  { letter: 'B', frequency: .01492},
  { letter: 'C', frequency: .02782},
  { letter: 'D', frequency: .04253},
  { letter: 'E', frequency: .12702},
  { letter: 'F', frequency: .02288 },
  { letter: 'G', frequency: .02015 },
  { letter: 'H', frequency: .06094 }
]

let letters = dataset.map((d)=> d.letter);
let frequencies = dataset.map((d)=> d.frequency);


// 1) Add an SVG
let svg = d3.select('svg');

// 2) Use the d3 standard margin convention
let margin = {top: 20, right: 20, bottom: 30, left: 40},
width = +svg.attr("width") - margin.left - margin.right,
height = +svg.attr("height") - margin.top - margin.bottom;

// 6) create x scale
let xScale = d3.scaleBand().rangeRound([0,width]).padding(0.1);// output

// 5) create y scale
let yScale = d3.scaleLinear().rangeRound([height, 0]); // output

// 7) create line generator
/*
==============================================
i think this is where the problem is
==============================================
*/
let line = d3.line()
  .x((d)=>{return xScale(d.letter);})
  .y((d)=>{return yScale(d.frequency);})
  .curve(d3.curveMonotoneX) // apply smoothing to the line





let g = svg.append('g')
    .attr('transform',`translate(${margin.left}, ${margin.top})`);

// this works
  xScale.domain(letters) // input
  yScale.domain([0,d3.max(frequencies)]) //input

// 3) x axis
g.append('g')
  .attr('class', 'axis axis--x')
  // moved the x-axis slightly to the left in order to fix alignment issue
  .attr('transform', `translate(-50,${height})`)
  .call(d3.axisBottom(xScale))



// 4) y axis
g.append('g')
  .attr('class','axis axis--y')
  .call(d3.axisLeft(yScale).ticks(10,"%"))
  .append('text')
    .attr('transform','rotate(-90)')
    .attr('y', 6)
    .attr('text-anchor','end')
    .text('Frequency');
/*
==============================================
    i think this is where the problem
==============================================
*/

// 9) set up path
g.append('path')
  .datum(dataset)
// 11) call line generator on data bound path object
  .attr('class','line')
  .attr('d',line);
// 12) Add circles
g.selectAll("circle")
  .data(dataset)
.enter().append("circle")
  .attr("class", "circle")
  .attr("cx", (d)=>{ return xScale(d.letter); })
  .attr("cy", (d)=>{ return yScale(d.frequency); })
  .attr("r", 4);
