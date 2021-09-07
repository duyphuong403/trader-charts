import { baseColors } from '@ui/theme'
import * as d3 from 'd3'

export const simulation = ({ inputData, width, height, svg }) => {
  const radiusScale = (change: number) => {
    const fx = d3.scaleSqrt().domain([-100, 100]).range([-100, 100])

    return change >= 0 ? fx(change) : fx(change * -1)
  }

  const color = (change: number) =>
    change >= 0 ? baseColors.bubbleRed : baseColors.bubbleGreen

  const tooltip = d3
    .select('#svg')
    .append('div')
    .style('position', 'absolute')
    .style('opacity', 0)
    .attr('class', 'tooltip')
    .style('background-color', 'black')
    .style('border-radius', '5px')
    .style('padding', '10px')
    .style('color', 'white')

  const showTooltip = (event, d) => {
    tooltip.transition().duration(200)
    tooltip
      .style('opacity', 1)
      .text(`${d.name}: ${d.change}%`)
      .style('left', `${event.pageX + 10}px`)
      .style('top', `${event.pageY - 10}px`)
  }

  const moveTooltip = event => {
    tooltip
      .style('left', `${event.pageX + 10}px`)
      .style('top', `${event.pageY + 20}px`)
  }

  const hideTooltip = () => {
    tooltip.transition().duration(200).style('opacity', 0)
  }

  const simulate = d3
    .forceSimulation()
    .force('x', d3.forceX().strength(0.05))
    .force('y', d3.forceY().strength(0.05))
    .force(
      'collide',
      d3.forceCollide((d: any) => radiusScale(d.change) + 5),
    )

  const gElement = svg
    .selectAll('g')
    .data(inputData)
    .enter()
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)
    .attr('style', 'cursor: pointer')
    .append('a')
    .attr('href', (d: any) => d.url)
    .on('mouseover', showTooltip)
    .on('mousemove', moveTooltip)
    .on('mouseleave', hideTooltip)

  const circles = gElement
    .append('circle')
    .style('fill', (d: any) => color(d.change))
    .attr('r', (d: any) => {
      return radiusScale(d.change)
    })

  const label = gElement
    .append('text')
    .attr('alignment-baseline', 'middle')
    .attr('fill', baseColors.black)
    .attr('text-anchor', 'middle')
    .attr('font-size', (d: any) => `${radiusScale(d.change) / 2.5}px`)
    .attr('dy', '-0.1em')
    .attr('pointer-events', 'none')
    .attr('style', 'background-color: transparent')
    .text((d: any) => `${d.label}`)

  const changeNumber = gElement
    .append('text')
    .attr('alignment-baseline', 'middle')
    .attr('fill', baseColors.black)
    .attr('text-anchor', 'middle')
    .attr('font-size', (d: any) => `${radiusScale(d.change) / 2.5}px`)
    .attr('dy', '1em')
    .attr('pointer-events', 'none')
    .text((d: any) => `${d.change}%`)

  const ticked = () => {
    circles.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y)
    label.attr('x', (d: any) => d.x).attr('y', (d: any) => d.y)
    changeNumber.attr('x', (d: any) => d.x).attr('y', (d: any) => d.y)
  }

  simulate.nodes(inputData).on('tick', ticked)

  svg
    .selectAll('circle')
    .on('mouseover', (event, d) => {
      // console.log(event.target)
      d3.select(event?.target)
        .transition()
        .duration(100)
        .attr('r', radiusScale(d.change) * 1.1)
        .attr('stroke', baseColors.black)
        .attr('stroke-width', '2px')
    })
    .on('mouseout', (event, d) =>
      d3
        .select(event.target)
        .transition()
        .duration(100)
        .attr('r', radiusScale(d.change))
        .attr('stroke-width', '0'),
    )
}
