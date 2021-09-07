import BubbleChart from '@components/BubbleChart'
import PageContainer from '@components/containers/PageContainer'
import HeatMap from '@components/HeatMap'
import LineChart from '@components/LineChartLevel2'
import AccountVerification from '@features/Auth/AccountVerification'
import ChangePassword from '@features/Auth/ChangePassword'
import ForgotPassword from '@features/Auth/ForgotPassword'
import LogInPage from '@features/Auth/Login'
import SignUpPage from '@features/Auth/SignUp'
import RootPage from '@features/RootPage'
import Routes from '@portal/routes'
import AuthRoutes from '@routes/AuthRoutes'
import PrivateRoutes from '@routes/PrivateRoutes'
import { fbAuth } from '@services/firebase'
import { isUserLoggedIn } from '@store/slicers/auth/selectors'
import { portalColors, PrimaryButton } from '@ui/theme'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, useHistory } from 'react-router-dom'
import { Content, LayoutHeader } from './styles'

const App: React.FC = () => {
  const history = useHistory()
  const isLoggedIn = useSelector(isUserLoggedIn)

  const handleSignOutClick = useCallback(() => {
    fbAuth
      .signOut()
      .then(() => {
        history.push(Routes.Root)
      })
      .catch(error => console.warn(error))
  }, [fbAuth])

  return (
    <>
      <PageContainer backgroundColor={portalColors.pageBackground}>
        {isLoggedIn && (
          <LayoutHeader>
            Header when logged in{' '}
            <PrimaryButton onClick={handleSignOutClick}>Sign Out</PrimaryButton>
          </LayoutHeader>
        )}
        <Content isLoggedIn={isLoggedIn}>
          <Switch>
            <AuthRoutes
              isAuthenticated={isLoggedIn}
              path={Routes.Root}
              component={RootPage}
              exact
            />

            <AuthRoutes
              isAuthenticated={isLoggedIn}
              path={Routes.Login}
              component={LogInPage}
              exact
            />

            <AuthRoutes
              isAuthenticated={isLoggedIn}
              path={Routes.SignUp}
              component={SignUpPage}
              exact
            />

            <AuthRoutes
              isAuthenticated={isLoggedIn}
              path={Routes.ForgotPassword}
              component={ForgotPassword}
              exact
            />

            <AuthRoutes
              isAuthenticated={isLoggedIn}
              path={Routes.AccountVerification}
              component={AccountVerification}
              exact
            />

            <AuthRoutes
              isAuthenticated={isLoggedIn}
              path={Routes.HeatMap}
              component={HeatMap}
              exact
            />

            <AuthRoutes
              isAuthenticated={isLoggedIn}
              path={Routes.BubbleChart}
              component={BubbleChart}
              exact
            />

            <AuthRoutes
              isAuthenticated={isLoggedIn}
              path={Routes.LineChart}
              component={LineChart}
              exact
            />

            {/* TODO: Dashboard private route */}
            {/* <PrivateRoutes
              path={[Routes.Root, Routes.Dashboard]}
              exact
              isAuthenticated={isLoggedIn}
              component={DashboardPage}
            /> */}

            <PrivateRoutes
              isAuthenticated={isLoggedIn}
              path={Routes.ChangePassword}
              component={ChangePassword}
              exact
            />

            <Route
              path={Routes.Version}
              render={() => (
                <div>{`${process.env.REACT_APP_NAME} ${process.env.REACT_APP_VERSION}`}</div>
              )}
            />
            <Route render={() => <div>Not Found</div>} />
          </Switch>
        </Content>
      </PageContainer>
    </>
  )
}

export default App
