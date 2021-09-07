import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

import baseColors from './colors'

export const Heading = styled.h4`
  font-style: normal;
  font-weight: bold;
  font-size: 21px;
  line-height: 32px;
  color: ${baseColors.text};
`

export const SubHeading = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: ${baseColors.secondaryText};
`

export const Title = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 48px;
  color: ${baseColors.text};
`

export const ParagraphText = styled.span<{
  textColor?: string
  whiteSpace?: string
}>`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: ${({ textColor }) => textColor || baseColors.text};
  ${({ whiteSpace }) => whiteSpace && `white-space: ${whiteSpace};`};
`

export const Labels = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.03em;
  color: ${baseColors.text};
`

export const Links = styled.span`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  text-decoration-line: underline;
  color: ${baseColors.primaryAction};
`

export const ButtonText = styled.span`
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: inherit;
`

export const PrimaryCloseButton = styled.button`
  &::before {
    content: 'x';
    color: ${baseColors.white};
    font-size: 18px;
    font-weight: 300;
    font-family: Arial, sans-serif;
  }
  background-color: ${baseColors.primaryButton};
  cursor: pointer;
  height: 30px;
  width: 30px;
  border: none;
  outline: none;
  border-radius: 10%;
`

export const PrimaryButton = styled(Button)`
  color: ${baseColors.white} !important;
  background-color: ${baseColors.primaryButton} !important;
`
