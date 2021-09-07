import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, UserCredential } from 'firebase/firebase-auth'

export type TFirebaseUser = UserCredential | null
type TUser = Partial<Pick<User, 'email' | 'emailVerified' | 'uid'>>
type TUserAuth = Partial<Pick<User, 'refreshToken'>>

interface IInitialState {
  user: TUser | null
  token: string
}

export const initialState: IInitialState = {
  user: null,
  token: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload
    },
    setToken: (state, action: PayloadAction<TUserAuth>) => {
      state.token = action.payload.refreshToken
    },
  },
})

export const { setUser, setToken } = authSlice.actions

export const authReducer = authSlice.reducer

export const userSignedOut = createAction('USER_LOGGED_OUT')
