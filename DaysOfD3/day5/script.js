let margin = { top: 10, right: 1, bottom: 20, left: 35}
let width = 1300;
let height = 500;


let data = [
  { year: 2005, value: 734.69 },
  { year: 2006, value: 750.70 },
  { year: 2007, value: 755.13 },
  { year: 2008, value: 694.19 },
  { year: 2009, value: 681.83 },
  { year: 2010, value: 718.98 },
  { year: 2011, value: 740.57 },
  { year: 2012, value: 752.24 },
  { year: 2013, value: 767.24 },
  { year: 2014, value: 802.45 },
  { year: 2015, value: 805.65 },
  { year: 2016, value: 935.58 },
  { year: 2017, value: 967.13 },
  { year: 2018, value: 1007.24 },
  { year: 2019, value: 907.24 },
  { year: 2020, value: 997.24 },
  { year: 2021, value: 997.24 },
  { year: 2022, value: 997.24 },
  { year: 2023, value: 997.24 },
  { year: 2024, value: 997.24 },
  { year: 2025, value: 997.24 },
  { year: 2026, value: 997.24 },
  { year: 2027, value: 997.24 },
  { year: 2028, value: 997.24 },
  { year: 2029, value: 997.24 },
  { year: 2030, value: 997.24 },
  { year: 2031, value: 997.24 },
  { year: 2032, value: 997.24 },



]

/*
** Setting x and y axis

*/

// find the max value for our set, so we can use it to set our y-axis
const yMax = d3.max(data,(d)=> d.value)

//our x-axis is defined by our xscale. the xscale is a scaleband.
//this scale will divide the range into evenly-sized segments.
const xDomain = data.map((d)=> d.year)
const xScale = d3.scaleBand()
  .domain(xDomain)
  .range([margin.left, width - margin.right - margin.left])
  .padding(0.5)

//our y scale is a simple linear scale. Its range is defined by our
//chart height and padding
const yScale = d3.scaleLinear()
  .domain([0,yMax])
  .range([height - margin.bottom, margin.top])

const xAxis = d3.axisBottom(xScale)
  .tickSizeOuter(2)

const yAxis = d3.axisLeft(yScale)
  .tickSizeOuter(0)

/*
** Tooltip
*/
d3.select('body').append('div').attr('id','tooltip')
.attr('style','position: absolute; opacity: 0;')



/*

** Binding data to chart

*/

  const svg = d3.select('svg')

    svg.append('g')
      .attr('class', 'bars')
      .selectAll('rect')
      .data( data )
      .join('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d.year))
        .attr('y', d => yScale(d.value))
        // bandwidth is a special function of scaleBand
        // it returns the width of the band (bar) based on the configuration
        // we set up earlier
        .attr('width', xScale.bandwidth())
        // remember that yScale(0) is the height of the entire chart
        // so we subtract the y position of the top of the bar yScale(d.value)
        // from it to get the total height of the bar.
        //this is how we 'flip' the chart the correct way
        .attr('height', d => yScale(0) - yScale(d.value))
        .style('fill', '#7472c0')
        .on('mouseover',(d)=>{
          d3.select('#tooltip').transition().duration(200).style('opacity',1)
          d3.select('#tooltip').html(d.year + '<br/>' + d.value)
        })
        .on('mouseout',()=>{
          d3.select('#tooltip').style('opacity',0)
        })
        .on('mousemove',()=>{
          d3.select('#tooltip').style('left', (d3.event.pageX+10) + 'px')
          .style('top', (d3.event.pageY+10) + 'px')
        })

    // Here we render the x axis
    svg.append('g')
        .attr('class', 'x-axis')
        // First set its container's (g) position to the
        // bottom of the chart
        .attr('transform', `translate(0,${ height - margin.bottom })`)
        // then just call this to render it
        .call( xAxis )

    // it works the same for the y axis
    svg.append('g')
        .attr('class', 'y-axis')
        .attr('transform', `translate(${ margin.left },0)`)
        .call( yAxis )
