import React from 'react'
import { isDev } from '@utils/constants'

import { PortalLogoIcon, PortalDevLogoIcon } from '@ui/assets'

import { LogoContainer } from './styles'

const Logo: React.FC = () => (
  <LogoContainer>
    {isDev() ? <PortalDevLogoIcon /> : <PortalLogoIcon />}
  </LogoContainer>
)

export default React.memo(Logo)
