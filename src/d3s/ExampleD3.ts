import * as d3 from 'd3';

const url = 'https://udemy-react-d3.firebaseio.com/ages.json';

export default class D3Chart {
  constructor(element: any) {
    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', 500)
      .attr('height', 500);

    d3.json(url).then((agesData: any) => {
      svg
        .selectAll('rect')
        .data(agesData)
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * 100)
        .attr('y', 50)
        .attr('width', 50)
        .attr('height', (d: any) => d.age * 10)
        .attr('fill', (d: any) => {
          if (d.age > 10) {
            return 'red';
          }

          return 'green';
        });
    });
  }
}
