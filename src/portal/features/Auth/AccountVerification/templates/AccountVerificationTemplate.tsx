import React, { useCallback, useEffect, useState } from 'react'
import { batch, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router'
import { Header, Icon, Segment } from 'semantic-ui-react'

import PortalRoutes from '@portal/routes'
import { fbAuth } from '@services/firebase'
import { PrimaryButton } from '@ui/theme'
import { ACCOUNT_VERIFICATION_INTERVAL } from '@utils/constants'
import { setToken, setUser } from '@store/slicers/auth/authSlice'

const AccountVerificationTemplate: React.FC = () => {
  const history = useHistory()
  const [isClicked, setIsClicked] = useState(false)
  const dispatch = useDispatch()
  const currentUser = fbAuth.currentUser || null

  const handleResendBtnClick = useCallback(() => {
    setIsClicked(true)
    fbAuth.currentUser
      ?.sendEmailVerification()
      .then(() => setIsClicked(true))
      .catch(error => {
        console.warn(error)
      })
  }, [fbAuth, setIsClicked])

  useEffect(() => {
    const interval = setInterval(() => {
      currentUser?.reload()

      if (currentUser?.emailVerified) {
        const { uid, email, emailVerified, refreshToken } = currentUser
        batch(() => {
          dispatch(setUser({ uid, email, emailVerified }))
          dispatch(setToken({ refreshToken }))
        })
        return history.push(PortalRoutes.Root)
      }

      return null
    }, ACCOUNT_VERIFICATION_INTERVAL)

    return () => clearInterval(interval)
  }, [dispatch])

  if (!currentUser) return <Redirect to={PortalRoutes.Root} />

  return (
    <Segment placeholder>
      <Header icon>
        {!isClicked ? (
          <div>
            <Icon name="warning circle" />
            It looks like you completed Sign-up but haven't verified your email{' '}
            <u>{currentUser?.email}</u> yet.
            <br />
            Please verify the email and join the exciting journey.
          </div>
        ) : (
          <div>
            <Icon name="mail outline" />
            An email was sent to your email <u>{currentUser?.email}</u>.
            <br />
            Please check your mail and verify the account.
          </div>
        )}
      </Header>
      {/* TODO: make count time to re-enable button feature */}
      {!isClicked && (
        <PrimaryButton onClick={handleResendBtnClick}>
          Resend Email Verification
        </PrimaryButton>
      )}
    </Segment>
  )
}

export default React.memo(AccountVerificationTemplate)
