//we select our svg element
const svg = d3.select('svg');

//we select all our rects in that svg
const rects = svg.selectAll('rect')

//define data that we will bind to rects, each element will become a rect
const data = [0,1,2,3,4]


//here we 'join' the data to our rectangles
rects
.data(data)
//now we append the rects. we are appending all 5 rectangles
.join('rect')
.style('fill','black')
.attr('height',20)
.attr('width',20)
.attr('y',10)
//this positions each new rect 10 pixels to the right of the last rect
.attr('x',(d,i) => {
  return 10 + (i * 30)
})
