import * as d3 from 'd3';

let dataset1: [number, number][] = [
  [1, 1], [12, 20], [24, 36],
  [32, 50], [40, 70], [50, 100],
  [55, 106], [65, 123], [73, 130],
  [78, 134], [83, 136], [89, 138],
  [100, 140]
];

let svg: d3.Selection<SVGElement, any, HTMLElement, any> = d3.select('svg');
let height: number = 500;
let width: number = 400;
let padding: number = 24;

svg.attr('width', width).attr('height', height)

let xScale: d3.ScaleLinear<number, number> = d3.scaleLinear()
  .domain([0, dataset1.length > 0 ? d3.max(dataset1, d => d[0])! : 0])
  .range([padding, width - padding])

let yScale: d3.ScaleLinear<number, number> = d3.scaleLinear()
  .domain([dataset1.length > 0 ? d3.max(dataset1, d => d[1])! : 0, 0])
  .range([padding , height - padding])

svg.append('g')
  .selectAll('dot')
  .data(dataset1)
  .enter()
  .append('circle')
  .attr('cx', d => xScale(d[0]))
  .attr('cy', d => yScale(d[1]))
  .attr('r', 3)
  .style('fill', 'navy')

let line: d3.Line<[number, number]> = d3.line()
  .x(d => xScale(d[0]))
  .y(d => yScale(d[1]))
  .curve(d3.curveMonotoneX)

svg.append('path')
  .datum(dataset1)
  .attr('class', 'line')
  .attr('d', line)
  .style('fill', 'none')
  .style('stroke', 'navy')
  .style('stroke-width', '2')

svg.append('g')
  .attr('transform', `translate(0, ${height - padding})`)
  .call(d3.axisBottom(xScale))
  
  svg.append('g')
  .attr('transform', `translate(${padding}, 0)`)
  .call(d3.axisLeft(yScale))