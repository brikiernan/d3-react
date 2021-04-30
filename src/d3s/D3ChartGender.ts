import * as d3 from 'd3';
import { Gender } from '../components/GenderDropdown';

const menUrl = 'https://udemy-react-d3.firebaseio.com/tallest_men.json';
const womenUrl = 'https://udemy-react-d3.firebaseio.com/tallest_women.json';
const margin = { top: 80, right: 80, bottom: 80, left: 80 };
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

interface Data {
  height: number;
  name: string;
}

export default class D3Chart {
  svg!: d3.Selection<SVGGElement, unknown, null, undefined>;
  xAxisGroup?: d3.Selection<SVGGElement, unknown, null, undefined>;
  yAxisGroup?: d3.Selection<SVGGElement, unknown, null, undefined>;
  xLabel?: d3.Selection<SVGTextElement, unknown, null, undefined>;
  data: Data[] = [];
  menData: Data[] = [];
  womenData: Data[] = [];

  constructor(element: d3.BaseType) {
    const vis = this;

    vis.svg = d3
      .select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    vis.xLabel = vis.svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height + 50)
      .attr('text-anchor', 'middle');

    vis.svg
      .append('text')
      .attr('x', -(height / 2))
      .attr('y', -50)
      .attr('text-anchor', 'middle')
      .text('Height in cm')
      .attr('transform', 'rotate(-90)');

    vis.xAxisGroup = vis.svg
      .append('g')
      .attr('transform', `translate(0, ${height})`);

    vis.yAxisGroup = vis.svg.append('g');

    Promise.all<Data[], Data[]>([
      d3.json(menUrl) as Promise<Data[]>,
      d3.json(womenUrl) as Promise<Data[]>,
    ]).then(datasets => {
      const [men, women] = datasets;

      vis.menData = men;
      vis.womenData = women;
      vis.update('men');
    });
  }

  update(gender: Gender) {
    const vis = this;

    vis.data = gender === 'men' ? vis.menData : vis.womenData;
    vis.xLabel?.text(`The world's tallest ${gender}`);

    const y = d3
      .scaleLinear()
      .domain([
        d3.min(vis.data, d => d.height * 0.95) as number,
        d3.max(vis.data, d => d.height) as number,
      ])
      .range([height, 0]);

    const x = d3
      .scaleBand()
      .domain(vis.data.map(d => d.name))
      .range([0, width])
      .padding(0.4);

    const xAxisCall = d3.axisBottom(x);
    vis.xAxisGroup?.transition().duration(500).call(xAxisCall);

    const yAxisCall = d3.axisLeft(y);
    vis.yAxisGroup?.transition().duration(500).call(yAxisCall);

    // data join
    const rects = vis.svg.selectAll('rect').data(vis.data);

    // exit
    rects
      .exit()
      .transition()
      .duration(500)
      .attr('height', 0)
      .attr('y', height)
      .remove();

    // update
    rects
      .transition()
      .duration(500)
      .attr('x', d => x(d.name)!)
      .attr('y', d => y(d.height))
      .attr('width', x.bandwidth)
      .attr('height', d => height - y(d.height));

    // enter
    rects
      .enter()
      .append('rect')
      .attr('x', d => x(d.name)!)
      .attr('width', x.bandwidth)
      .attr('fill', 'grey')
      .attr('y', height)
      .transition()
      .duration(500)
      .attr('height', d => height - y(d.height))
      .attr('y', d => y(d.height));
  }
}
