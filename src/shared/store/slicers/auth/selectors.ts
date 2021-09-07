import { createSelector } from '@reduxjs/toolkit'

import { User } from 'firebase/firebase-auth'
import { RootState } from '@store/rootReducer'
import { TFirebaseUser } from './authSlice'

export const selectAuthUser = (state: RootState): User | null => {
  return state.auth?.user
}

export const selectFirebaseUser = (state: RootState): TFirebaseUser | null =>
  state.auth?.fbUser

export const selectUserUid = (state: RootState): string | undefined =>
  state.auth.user?.uid as string

export const selectUserEmail = (state: RootState): string | undefined =>
  state.auth.user?.email as string

export const isUserLoggedIn = createSelector([selectAuthUser], user => {
  return !!user?.emailVerified
})
