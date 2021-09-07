import React, { useEffect } from 'react'
import { batch, useDispatch } from 'react-redux'

import { fbAuth } from '@services/firebase'
import { setToken, setUser, userSignedOut } from '@store/slicers/auth/authSlice'

type TProps = {
  children: JSX.Element
}

const AuthProvider: React.FC<TProps> = ({ children }): JSX.Element | null => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribeAuthState = fbAuth.onAuthStateChanged(user => {
      if (!user || !user.emailVerified) {
        dispatch(userSignedOut())
        return
      }

      const { uid, email, emailVerified, refreshToken } = user
      batch(() => {
        dispatch(setUser({ uid, email, emailVerified }))
        dispatch(setToken({ refreshToken }))
      })
    })

    return (): void => {
      unsubscribeAuthState()
    }
  }, [dispatch])

  return children
}

export default React.memo(AuthProvider)
