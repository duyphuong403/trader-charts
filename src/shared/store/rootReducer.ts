import { Action, AnyAction } from '@reduxjs/toolkit'
import { persistCombineReducers } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'
import { ThunkAction as LibThunkAction } from 'redux-thunk'

import { authReducer, userSignedOut } from '@store/slicers/auth/authSlice'

const storeOptions = {
  key: 'app-primary',
  storage,
  version: 0,
  stateReconciler: autoMergeLevel2,
  whitelist: ['auth'],
  blacklist: ['userProfile'],
}

export const options = storeOptions

const appReducers = persistCombineReducers(options, {
  auth: authReducer,
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const rootReducer = (state: any, action: any): any => appReducers(state, action)

export type RootState = ReturnType<typeof rootReducer>

export type ThunkAction<R> = LibThunkAction<Promise<R>, RootState, null, Action>

// eslint-disable-next-line
export default (state: any, action: AnyAction) => {
  if (action.type === userSignedOut.type) {
    // eslint-disable-next-line no-param-reassign
    state.auth = undefined
  }

  return rootReducer(state, action)
}
