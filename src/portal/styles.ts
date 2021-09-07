import styled from 'styled-components'
import { Header } from 'semantic-ui-react'

export const LayoutHeader = styled(Header)`
  height: 96px;
  position: absolute;
  top: 0;
  width: 100%;
  padding: 0;
  z-index: 2;
`

export const Content = styled.div<{ isLoggedIn?: boolean }>`
  padding: ${({ isLoggedIn }) => (isLoggedIn ? 96 : 0)}px 17.5%;
  overflow-y: auto;
  height: 100vh;
`
