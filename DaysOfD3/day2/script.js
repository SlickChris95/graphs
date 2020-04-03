/*
**Scales
they recieve an input in a predefined input range(domain)
and returns an output value in a predefined output range(range)

domain is for input values
range is for output values
*/


{
  // alert('hi')

  const data = [0, 1, 2, 3, 4];
  const maxHeight = 140;

//set the x positions of our rects (ordinal)
//the domain is our data b/c our the data values
//will be passed to the scale when we draw

const xScale = d3.scaleOrdinal()
  .domain(data) // input
  .range([10,40,70,100,130]); // output


//the domain is the minimum value of our data to the maximum
//value of our data (continous)
const yScale = d3.scaleLinear()
  .domain([0,4]) //input
  .range([10,maxHeight]); // output

const colorScale = d3.scaleLinear()
  .domain([0,4]) // input
  .range(['#eee','steelblue']); // output

const svg = d3.select('svg')

svg.selectAll('rect')
  //data bind
  .data(data)
  .enter()
  //append all rects
  .append('rect')
  .attr('width',20)
  .attr('y',15)


  .attr('x',(d)=> xScale(d))
  .attr('height', (d)=> yScale(d))
  .style('fill',(d)=> colorScale(d))



}
