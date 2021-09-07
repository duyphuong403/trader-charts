import { baseColors } from '@ui/theme'
import React, { useEffect } from 'react'

import { getTreemap } from 'treemap-squarify'
import { getColor } from './getColor'

declare module 'react' {
  // eslint-disable-next-line no-unused-vars
  interface SVGProps<T> {
    stockcode?: string
    stockname?: string
    stockvalue?: number
    stockchange?: number
  }
}

type TProp = {
  categoryName: string
  data: object[]
  width?: number
  height?: number
}

const HeatMapComponent: React.FC<TProp> = (props: TProp) => {
  const {
    categoryName = 'Category Name',
    data,
    width = 700,
    height = 700,
  } = props

  const inputData = getTreemap({
    data,
    width,
    height,
  })

  useEffect(() => {
    const svg = (document.getElementById(
      'tooltip-svg',
    ) as unknown) as SVGGraphicsElement
    const tooltip = document.getElementById('tooltip')
    const triggers = document.getElementsByClassName('rect')

    const showTooltip = evt => {
      // const { svg, tooltip } = props
      const CTM = svg!.getScreenCTM()
      const x = (evt.clientX - CTM!.e + 16) / CTM!.a
      const y = (evt.clientY - CTM!.f + 20) / CTM!.d

      tooltip!.setAttributeNS(null, 'visibility', 'visible')
      tooltip!.setAttributeNS(null, 'transform', `translate(${x} ${y})`)

      const tooltipLabel = tooltip!.getElementsByTagName('text')[0]
      const tooltipName = tooltip!.getElementsByTagName('text')[1]
      const tooltipValue = tooltip!.getElementsByTagName('text')[2]
      const tooltipChange = tooltip!.getElementsByTagName('text')[3]

      tooltipLabel!.firstChild!.textContent = evt.target.getAttributeNS(
        null,
        'stockcode',
      )
      tooltipName!.firstChild!.textContent = evt.target.getAttributeNS(
        null,
        'stockname',
      )
      tooltipValue!.firstChild!.textContent = `$${evt.target.getAttributeNS(
        null,
        'stockvalue',
      )}`

      // eslint-disable-next-line radix
      const stockChange = parseFloat(
        evt.target.getAttributeNS(null, 'stockchange'),
      )

      tooltipChange!.firstChild!.textContent =
        stockChange > 0 ? `+${stockChange}%` : `${stockChange}%`

      stockChange >= 0
        ? tooltipChange.setAttribute('style', `fill: ${baseColors.green}`)
        : tooltipChange.setAttribute('style', `fill: ${baseColors.red}`)

      const tooltipRects = tooltip!.getElementsByTagName('rect')
      const length = tooltipName.getComputedTextLength()

      let i = 0
      while (i < tooltipRects.length) {
        tooltipRects[i].setAttributeNS(null, 'width', (length + 8).toString())
        i += 1
      }
    }

    const hideTooltip = () => {
      tooltip!.setAttributeNS(null, 'visibility', 'hidden')
    }

    let i = 0
    while (i < triggers.length) {
      triggers[i].addEventListener('mousemove', showTooltip)
      triggers[i].addEventListener('mouseout', hideTooltip)
      i += 1
    }
  }, [data])

  return (
    <svg
      id="tooltip-svg"
      width={width + 200}
      height={height + 50}
      style={{ paddingTop: 50 }}
    >
      {inputData &&
        inputData.map(data => (
          <g key={`g-${data.data.label}`}>
            <rect
              className="rect"
              width={data.width}
              height={data.height}
              x={data.x}
              y={data.y}
              fill={getColor(data.data.change)}
              stockcode={data.data.label}
              stockname={data.data.name}
              stockvalue={data.data.value}
              stockchange={data.data.change}
              strokeWidth="1px"
              stroke={baseColors.black}
            />
            <text
              x={data.width / 2 + data.x}
              y={data.height / 2 + data.y}
              fill={baseColors.white}
              pointerEvents="none"
              alignmentBaseline="middle"
              fontSize="20"
              textAnchor="middle"
            >
              {data.data.label}
            </text>
            <text
              x={data.width / 2 + data.x}
              y={data.height / 2 + data.y + 20}
              fill={baseColors.white}
              pointerEvents="none"
              alignmentBaseline="middle"
              fontSize="12"
              textAnchor="middle"
            >
              {data.data.change > 0 ? `+${data.data.change}` : data.data.change}{' '}
              %
            </text>
          </g>
        ))}
      <g id="tooltip" visibility="hidden">
        <rect
          x="2"
          y="2"
          width="90"
          height="90"
          fill={baseColors.black}
          opacity="0.4"
          rx="2"
          ry="2"
        />
        <rect
          width="90"
          height="90"
          fill={baseColors.white}
          rx="2"
          ry="2"
          x="0"
          y="0"
        />
        <text x="5" y="18" fontSize="20px">
          Label
        </text>
        <text x="5" y="37">
          Name
        </text>
        <text x="5" y="57">
          Value
        </text>
        <text x="5" y="77">
          Change
        </text>
      </g>
      <text x={4} y={22} fill={baseColors.white} fontSize="24">
        {categoryName}
      </text>
    </svg>
  )
}

export default React.memo(HeatMapComponent)
