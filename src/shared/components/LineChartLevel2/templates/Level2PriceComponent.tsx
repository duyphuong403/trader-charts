import React, { useEffect } from 'react'
import { SvgWrapper, TableWrapper } from '../atoms/styles'
import DataTable from './DataTable'
import { drawChart } from './drawChart'

interface ILineChartProps {
  width: number
  height: number
  top: number
  bottom: number
  left: number
  right: number
  askFillColor?: string
  bidFillColor?: string
  askStrokeColor?: string
  bidStrokeColor?: string
}

const Level2PriceComponent: React.FC<ILineChartProps> = props => {
  const { askStrokeColor, bidStrokeColor } = props
  useEffect(() => {
    drawChart(props)
  })

  return (
    <div>
      <SvgWrapper id="basicLineChart" />
      <TableWrapper>
        <DataTable
          askStrokeColor={askStrokeColor}
          bidStrokeColor={bidStrokeColor}
        />
      </TableWrapper>
    </div>
  )
}

export default React.memo(Level2PriceComponent)
