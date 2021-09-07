import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

import PortalRoutes from '@portal/routes'

interface IPrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteProps>
  isPortal?: boolean
  isAuthenticated: boolean
  isForbidden?: boolean
}

const PrivateRoutes: React.FC<IPrivateRouteProps> = ({
  component: Component,
  isPortal,
  isAuthenticated,
  isForbidden,
  ...rest
}: IPrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={TProps => {
        return isAuthenticated ? (
          isForbidden ? (
            <Redirect
              to={{
                pathname: PortalRoutes.Dashboard,
              }}
            />
          ) : (
            <Component {...TProps} />
          )
        ) : (
          <Redirect
            to={{
              pathname: PortalRoutes.Login,
              state: { referrer: TProps.location.pathname },
            }}
          />
        )
      }}
    />
  )
}

export default PrivateRoutes
