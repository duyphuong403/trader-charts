import React from 'react'
import { Level2Wrapper } from './atoms/styles'
import LineChartComponent from './templates/Level2PriceComponent'

export type TData = {
  label: string
  value: number
  tooltipContent: string
}

const LineChart: React.FC = () => {
  return (
    <Level2Wrapper>
      <LineChartComponent
        width={800}
        height={400}
        top={10}
        bottom={50}
        left={50}
        right={50}
      />
    </Level2Wrapper>
  )
}

export default LineChart
