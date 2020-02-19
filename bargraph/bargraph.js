let svg = d3.select('svg'),
    margin = 200,
    width = svg.attr('width') - margin,
    height = svg.attr('height') - margin;

let xScale = d3.scaleBand().range([0,width]).padding(0.4),
    yScale = d3.scaleLinear().range([height,0]);

let g = svg.append('g').attr('transform','translate(' + 100 + ',' + 100 + ')');

let dataset = [
  [2011, 45],
  [2012, 47],
  [2013, 52],
  [2014, 70],
  [2015, 75],
  [2016, 78]
];

// loads and checks if we have errors in our csv file
// d3.csv("/XYZ.csv",(err,data)=>{
//   if(err){
//     throw err;
//   }
// })

/*
** Creates the x axis
*/

//x domain
// xScale.domain(data.map((d)=>{return d.year;}));
xScale.domain(dataset.map((d)=> d[0]))

//y domian
// yScale.domain([0,d3.max(data,(d)=>{return d.value;})]);
yScale.domain([0,d3.max(dataset,(d)=> d[1])])

g.append('g')
  .attr('transform','translate(0,' + height + ')' )
  .call(d3.axisBottom(xScale));

/*
**
// */
g.append("g")
         .call(d3.axisLeft(yScale).tickFormat((d)=>{
           return '$' + d;
         }).ticks(10))
         .append('text')
         .attr('y',6)
         .attr('dy','0.71em')
         .attr('text-anchor','end')
         .text('value');
         
g.selectAll('.bar')
