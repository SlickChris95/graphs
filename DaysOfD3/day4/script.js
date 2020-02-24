
    const data = [
    {name: 'Group 1', value: 1},
    {name: 'Group 2', value: 2},
    {name: 'Group 1', value: 3}

  ];

  const fib = [0,1,2,3,5,8];

  const groups = d3.select('svg')
    .selectAll('g')
    .data(data)
    .join('g')
    //translate each group to the right based on its index
    .attr('transform', (d,i) => 'translate(' + (100 * i) + ',0)')


  groups
    .selectAll('rect')
    .data(fib)
    .join('rect')
    .attr('x', 10)
    .attr('y', 30)
    .attr('width', (d)=> d * 10)
    .attr('height',(d)=> d * 10)
    .style('fill', 'transparent')
    .style('stroke','#ff7b57')
    .style('stroke-width',2)

  groups.append('text')
    .attr('x',10)
    .attr('y',20)
    .attr('dy','0.35em')
    .style('font-family','sans-serif')
    .style('font-size',12)
    .text((d)=> d.name)
