import * as d3 from 'd3';
import { Student } from '../App';

const margin = { top: 10, right: 10, bottom: 80, left: 70 };
const width = 450 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

export default class D3Chart {
  private g!: d3.Selection<SVGGElement, unknown, null, undefined>;
  private x!: d3.ScaleLinear<number, number, never>;
  private y!: d3.ScaleLinear<number, number, never>;
  private xAxisGroup!: d3.Selection<SVGGElement, unknown, null, undefined>;
  private yAxisGroup!: d3.Selection<SVGGElement, unknown, null, undefined>;
  private data: Student[] = [];
  private updateName!: (name: string) => void;

  constructor(element: d3.BaseType, data: Student[], updateName: any) {
    const vis = this;
    vis.updateName = updateName;

    vis.g = d3
      .select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    vis.x = d3.scaleLinear().range([0, width]);
    vis.y = d3.scaleLinear().range([height, 0]);

    vis.xAxisGroup = vis.g
      .append('g')
      .attr('transform', `translate(0, ${height})`);

    vis.yAxisGroup = vis.g.append('g');

    vis.g
      .append('text')
      .attr('x', width / 2)
      .attr('y', height + 40)
      .attr('font-size', 18)
      .attr('text-anchor', 'middle')
      .text('Age');

    vis.g
      .append('text')
      .attr('x', -(height / 2))
      .attr('y', -40)
      .attr('transform', 'rotate(-90)')
      .attr('font-size', 18)
      .attr('text-anchor', 'middle')
      .text('Height in cm');

    vis.update(data);
  }

  update(data: Student[]) {
    const vis = this;
    vis.data = data;

    vis.x.domain([0, d3.max(vis.data, d => Number(d.age)) as number]);
    vis.y.domain([0, d3.max(vis.data, d => Number(d.height)) as number]);

    const xAxisCall = d3.axisBottom(vis.x);
    const yAxisCall = d3.axisLeft(vis.y);

    vis.xAxisGroup.transition().duration(1000).call(xAxisCall);
    vis.yAxisGroup.transition().duration(1000).call(yAxisCall);

    // data join
    const circles = vis.g
      .selectAll('circle')
      .data(vis.data, (d: any) => d.name);

    // exit
    circles.exit().transition().duration(1000).attr('cy', vis.y(0)).remove();

    // update
    circles
      .transition()
      .duration(1000)
      .attr('cx', d => vis.x(Number(d.age)))
      .attr('cy', d => vis.y(Number(d.height)));

    // enter
    circles
      .enter()
      .append('circle')
      .attr('cy', vis.y(0))
      .attr('cx', d => vis.x(Number(d.age)))
      .attr('r', 5)
      .attr('fill', 'grey')
      .on('click', e => vis.updateName(e.target.__data__.name))
      .transition()
      .duration(1000)
      .attr('cy', d => vis.y(Number(d.height)));
  }
}
