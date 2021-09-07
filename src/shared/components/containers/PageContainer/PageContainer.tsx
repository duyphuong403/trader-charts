import React, { ReactNode } from 'react'

import { Container } from './styles'

type TProps = {
  children: ReactNode
  backgroundColor?: string
  showPatternBackground?: boolean
}

const PageContainer: React.FC<TProps> = ({
  backgroundColor,
  showPatternBackground = false,
  children,
}) => {
  return (
    <Container
      backgroundColor={backgroundColor}
      showPatternBackground={showPatternBackground}
    >
      {children}
    </Container>
  )
}

export default PageContainer
