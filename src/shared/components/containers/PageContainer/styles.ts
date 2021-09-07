import styled from 'styled-components'

import { baseColors } from '@ui/theme'
import { LoggedInBackground } from '@ui/assets'

export const Container = styled.div<{
  backgroundColor?: string
  showPatternBackground?: boolean
}>`
  background-attachment: fixed;
  background-color: ${({ backgroundColor }) =>
    backgroundColor || baseColors.background};
  background-position: left bottom;
  background-repeat: no-repeat;
  background-image: ${({ showPatternBackground }): string | undefined =>
    showPatternBackground ? `url(${LoggedInBackground})` : undefined};
  height: 100%;
`
