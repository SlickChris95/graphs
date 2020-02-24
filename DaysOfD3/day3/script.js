{
  let data = [
      { name: 'a', value: 1 },
      { name: 'b', value: 2 },
      { name: 'c', value: 3 },
      { name: 'd', value: 5 },
      { name: 'e', value: 8 }
    ]
  const svg = d3.select('svg');
  const circles = svg.selectAll('circle')
  //bind data
  .data(data)

  circles.enter().append('circle')
  //set the circles' radius
  .attr('r',(d)=> d.value * 10)
  //set the cricles x position
  .attr('cx',(d)=> d.value * 10)
  //y position
  .attr('cy',80)
  .attr('fill','transparent')
  .attr('stroke','steelblue')

  const text = svg.selectAll('text').data( data )

  text.enter().append('text')
    .attr('x', (d) => d.value * 10 * 2)
    .attr('y', 80)
    // This is a "magic number" in svg. It makes sure the text is vertically centered
    .attr('dy', '0.35em')
    // set from which direction the text expands
    .attr('text-anchor', 'end')
    // set the actual text
    .text(d => d.name)
}
