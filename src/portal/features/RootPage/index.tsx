import React from 'react'
import { NavLink } from 'react-router-dom'

import { Container } from './atoms'

const RootPage: React.FC = () => {
  return (
    <Container>
      <h2>THIS IS LANDING PAGE!</h2>
      <br />
      <ul>
        <li>
          <NavLink to="/heatmap">Heat map</NavLink>
        </li>
        <li>
          <NavLink to="/bubble-chart">Bubble Chart</NavLink>
        </li>
        <li>
          <NavLink to="/line-chart">Custom line chart</NavLink>
        </li>
      </ul>
    </Container>
  )
}

export default RootPage
