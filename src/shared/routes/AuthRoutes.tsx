import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

import PortalRoutes from '@portal/routes'

interface IAuthRouteProps extends RouteProps {
  component: React.ComponentType<RouteProps>
  isPortal?: boolean
  isAuthenticated: boolean
}

const AuthRoutes: React.FC<IAuthRouteProps> = ({
  component: Component,
  isPortal,
  isAuthenticated,
  ...rest
}: IAuthRouteProps) => {
  return (
    <Route
      {...rest}
      render={TProps => {
        return !isAuthenticated ? (
          <Component {...TProps} />
        ) : (
          <Redirect
            to={{
              pathname: PortalRoutes.Root,
            }}
          />
        )
      }}
    />
  )
}

export default AuthRoutes
