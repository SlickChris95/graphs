// let dataset = [
// {company: "Johnson & Johnson",revenues_mm: 71890,profit_mm: 18540,profit_as_of_revenues:0.2578940047294478,category: "Pharmaceuticals"},
// {company: "Procter & Gamble", revenues_mm: 71726, profit_mm: 10508, profit_as_of_revenues: 0.14650196581434904, category: "Household & Personal Products"},
// {company: "Abbvie", revenues_mm: 25638, profit_mm: 5953, profit_as_of_revenues: 0.23219439893907481, category: "Pharmaceuticals"},
// {company: "Amgen", revenues_mm: 22991, profit_mm: 7722, profit_as_of_revenues: 0.33587055804445215, category: "Pharmaceuticals"},
// {company: "Eli Lilly", revenues_mm: 21222, profit_mm: 2738, profit_as_of_revenues: 0.12901705777023842, category: "Pharmaceuticals"},
// {company: "Bristol-Myers Squibb", revenues_mm: 19427, profit_mm: 4457, profit_as_of_revenues: 0.22942296803417925, category: "Pharmaceuticals"},
// {company: "Altria Group", revenues_mm: 19337, profit_mm: 14239, profit_as_of_revenues: 0.7363603454517247, category: "Tobacco"},
// {company: "Kimberly-Clark", revenues_mm: 18202, profit_mm: 2166, profit_as_of_revenues: 0.11899791231732777, category: "Household & Personal Products"},
// {company: "General Mills", revenues_mm: 16563, profit_mm: 1697, profit_as_of_revenues: 0.10245728430839823, category: "Food"},
// {company: "Colgate-Palmolive", revenues_mm: 15195, profit_mm: 2441, profit_as_of_revenues: 0.16064494899638038, category: "Household & Personal Products"},
// {company: "Conagra Brands", revenues_mm: 14134, profit_mm: -677, profit_as_of_revenues: -0.04789868402433847, category: "Food"}
// ]

/*
x axis will be dataset.revenues_mm
y axis will be dataset.profit_mm
*/

let data = [
  {
    date:2013,
    wage: 7.25
  },
  {
    date:2012,
    wage: 7.25
  },
  {
    date:2011,
    wage: 7.25
  },
{
  date:2010,
  wage: 7.25
},
{
    date: 2009,
     wage: 7.25
}, {
     date: 2008,
     wage: 6.55
}, {
     date: 2007,
     wage: 5.85
}, {
     date: 1997,
     wage: 5.15
}, {
     date: 1996,
     wage: 4.75
}, {
     date: 1991,
     wage: 4.25
}, {
     date: 1981,
     wage: 3.35
}, {
     date: 1980,
     wage: 3.10
}, {
     date: 1979,
     wage: 2.90
}, {
     date: 1978,
     wage: 2.65
}]

// D3 margin convention
let margin = {top: 20, right: 20, bottom: 20, left: 40}
let width = 700 - margin.left - margin.right;
let height = 500 - margin.top - margin.bottom;

/*
*** I don't think I need this anymore
*/
// format the data
data.forEach((d)=>{
  parseDate = d3.timeParse('%Y');
  d.date = parseDate(d.date);
  d.wage = +d.wage
});

// sort the data by date
data.sort((a,b)=>{
  return a.date - b.date;
})


// set xScale and yScale
let xScale = d3.scaleTime().range([0,width]); // output
let yScale = d3.scaleLinear().range([height,0]); // output

// Scale the range of the data
// extent returns min and max of the data
xScale.domain(d3.extent(data,(d)=>{
  return d.date;
})); // input

yScale.domain([0,d3.max(data,(d)=> {
  return d.wage;
})]); // input

// this line established waht kind of graph we are making
let valueline = d3.line()
  .x((d)=>{
    return xScale(d.date);
  })
  .y((d)=>{
    return yScale(d.wage);
  });

let svg = d3.select('svg')

  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform',`translate(${margin.left},${margin.top})`);

let path = svg.selectAll('dot')
  .data(data)
  .enter().append('circle')
  .attr('r',5)
  .attr('cx',(d)=> {return xScale(d.date)})
  .attr('cy',(d)=> {return yScale(d.wage)})
  .attr('stroke','#32CD32')
  .attr('stroke-width',1.5)
  .attr('fill','#ffffff');

svg.append('g')
  .attr('transform',`translate(${0}, ${height})`)
  .call(d3.axisBottom(xScale));
svg.append('g')
  .call(d3.axisLeft(yScale).tickFormat((d)=>{
    return '$' + d3.format('.2f')(d)
  }));
