import React, { useCallback, useEffect, useState } from 'react'

import { Container } from '@components/containers/PageContainer/styles'

import BubbleChartComponent, {
  TInputData,
} from './templates/BubbleChartComponent'

const BubbleChart: React.FC = () => {
  const [data, setData] = useState<TInputData[]>([])

  const generateMockData = () => {
    const mockData: TInputData[] = []
    const min = Math.ceil(-50)
    const max = Math.floor(50)
    const range = 20

    let i = 0
    while (i < range) {
      mockData.push({
        name: 'Label',
        label: `Label ${Math.floor(Math.random() * (max - min + 1)) + min}`,
        change: Math.floor(Math.random() * (max - min + 1)) + min,
        url: '/',
      })
      i += 1
    }

    setData(mockData)
  }

  useEffect(() => {
    generateMockData()
  }, [])

  return (
    <Container>
      <button
        type="button"
        onClick={useCallback(() => {
          generateMockData()
        }, [])}
      >
        Change Data
      </button>
      {data && <BubbleChartComponent inputData={data} />}
    </Container>
  )
}

export default BubbleChart
