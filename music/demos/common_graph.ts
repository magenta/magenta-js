/**
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as d3 from 'd3';

export function updateGraph(data: number[], elementId: string) {
  const margin = {top: 50, right: 50, bottom: 50, left: 50};
  const width = Math.min(600, window.innerWidth - 100);
  const height = 150;

  // Create a d3 dataset out of the data.
  const dataset = d3.range(data.length).map((d, i) => data[i].toFixed(3));
  const xScale =
      d3.scaleLinear().domain([0, data.length - 1]).range([0, width]);
  const yScale =
      d3.scaleLinear().domain([0, Math.max(...data)]).range([height, 0]);

  // Setup.
  const svg = d3.select('#' + elementId);
  svg.selectAll('*').remove();

  svg.attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

  const group = svg.append('g').attr(
      'transform', `translate(${margin.left}, ${margin.top})`);

  // Axes.
  group.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));
  group.append('g').attr('class', 'y axis').call(d3.axisLeft(yScale));

  // Line path.
  // tslint:disable-next-line:no-any
  const line: any = d3.line()
                        .x((d, i) => xScale(i))
                        // tslint:disable-next-line:no-any
                        .y((d: any) => yScale(d))
                        .curve(d3.curveMonotoneX);
  group.append('path').datum(dataset).attr('class', 'line').attr('d', line);
}
