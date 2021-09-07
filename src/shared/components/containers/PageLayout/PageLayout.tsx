import React from 'react'
import { Container, FormContent } from './styles'

type TProps = {
  children: React.ReactChild
}

const PageLayout: React.FC<TProps> = ({ children }) => (
  <Container>
    <FormContent>
      {/* <Logo /> */}
      {children}
    </FormContent>
  </Container>
)

export default React.memo(PageLayout)
