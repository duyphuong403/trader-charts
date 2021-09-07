import * as d3 from 'd3'

export const drawChart = props => {
  const {
    width,
    height,
    top,
    bottom,
    left,
    right,
    askFillColor = '#ff000073',
    bidFillColor = '#00800069',
    askStrokeColor = '#ff0000',
    bidStrokeColor = '#07d807',
  } = props

  const w = width - left - right
  const h = height - top - bottom

  let maxAskShares = 0
  let minAskShares = 0
  let minBidShares = 0
  let maxBidShares = 0

  let minBidValue = 0
  let maxBidValue = 0
  let minAskValue = 0
  let maxAskValue = 0

  let bidData = []
  let askData = []

  const svg = d3
    .select('#basicLineChart')
    .append('svg')
    .attr('width', w + left + right)
    .attr('height', h + top + bottom)
    .append('g')
    .attr('transform', `translate(${left},${top})`)

  // loading bid data
  d3.json('/data/bidData.json')
    .then((data: any) => {
      minBidValue = parseFloat(d3.min(data, (d: any) => d.value)!)
      maxBidValue = parseFloat(d3.max(data, (d: any) => d.value)!)

      minBidShares = parseFloat(d3.min(data, (d: any) => d.shares)!)
      maxBidShares = parseFloat(d3.max(data, (d: any) => d.shares)!)

      bidData = data
    })
    .then(() => {
      d3.json('/data/askData.json')
        .then((data: any) => {
          minAskValue = parseFloat(d3.min(data, (d: any) => d.value)!)
          maxAskValue = parseFloat(d3.max(data, (d: any) => d.value)!)

          minAskShares = parseFloat(d3.min(data, (d: any) => d.shares)!)
          maxAskShares = parseFloat(d3.max(data, (d: any) => d.shares)!)

          askData = data
        })
        .then(() => {
          const minShares =
            minBidShares < minAskShares ? minBidShares : minAskShares
          const maxShares =
            maxBidShares > maxAskShares ? maxBidShares : maxAskShares

          const midValue = (minAskValue + maxBidValue) / 2

          // draw BID line
          const yScale = d3
            .scaleLinear()
            .domain([minShares, maxShares])
            .range([h, 0])

          const xBidScale = d3
            .scaleLinear()
            .domain([minBidValue, midValue])
            .range([0, w / 2])

          svg
            .append('g')
            .attr('transform', `translate(0, ${h})`)
            .call(d3.axisBottom(xBidScale).tickValues([minBidValue]))
            .style('stroke', '#FFF')
            .attr('font-size', '1em')
            .selectAll('line,path')
            .style('stroke', '#383838')

          svg
            .append('g')
            .call(d3.axisLeft(yScale))
            .style('stroke', '#FFF')
            .attr('font-size', '1em')
            .selectAll('line,path')
            .style('stroke', '#383838')

          const bidValueLine = d3
            .area()
            .x((d: any) => xBidScale(d.value))
            .y0(yScale(minShares))
            .y1((d: any) => yScale(d.shares))

          svg
            .append('path')
            .data([bidData])
            .attr('fill', bidFillColor)
            .attr('stroke', bidStrokeColor)
            .attr('stroke-width', 1.6)
            .attr('d', bidValueLine)

          // draw ASK line
          const xAskScale = d3
            .scaleLinear()
            .domain([midValue, maxAskValue])
            .range([w / 2, w])

          svg
            .append('g')
            .attr('transform', `translate(0, ${h})`)
            .call(d3.axisBottom(xAskScale).tickValues([midValue, maxAskValue]))
            .style('stroke', '#FFF')
            .attr('font-size', '1em')
            .selectAll('line,path')
            .style('stroke', '#383838')

          const askValueLine = d3
            .area()
            .x((d: any) => xAskScale(d.value))
            .y0(yScale(minShares))
            .y1((d: any) => yScale(d.shares))

          svg
            .append('path')
            .data([askData])
            .attr('fill', askFillColor)
            .attr('stroke', askStrokeColor)
            .attr('stroke-width', 1.6)
            .attr('d', askValueLine)
        })
    })
}
