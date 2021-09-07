import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

import { BubbleWrapper } from '../atoms'
import { simulation } from './simulation'

export type TInputData = {
  label: string
  name: string
  change: number
  url: string
}

type TProps = {
  inputData: Array<TInputData>
  width?: number
  height?: number
}

const BubbleChartComponent: React.FC<TProps> = props => {
  const { inputData, width = 700, height = 700 } = props
  const svgRef = useRef<SVGSVGElement>(null)
  const svg = d3.select(svgRef.current)

  useEffect(() => {
    if (inputData && inputData.length > 0) {
      svg.selectAll('g').remove()

      simulation({ inputData, width, height, svg })
    }
  }, [inputData])

  return (
    <BubbleWrapper id="svg">
      <svg width={width} height={height} ref={svgRef} />
    </BubbleWrapper>
  )
}

export default React.memo(BubbleChartComponent)
