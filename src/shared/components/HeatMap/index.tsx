import React from 'react'

import HeatMapComponent from './templates/HeatMapTemplate'
import { mockData } from './templates/mockData'

const HeatMap: React.FC = () => {
  return <HeatMapComponent data={mockData} categoryName="Technology" />
}

export default HeatMap
