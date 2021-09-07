/* eslint-disable import/no-extraneous-dependencies */
import {
  configureStore,
  getDefaultMiddleware,
  EnhancedStore,
} from '@reduxjs/toolkit'
import { applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {
  persistStore,
  persistReducer,
  Persistor,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import rootReducer, { options } from './rootReducer'

const configureAppStore = (
  preloadedState = {},
): {
  persistor: Persistor
  store: EnhancedStore
} => {
  const middlewares = [
    thunk,
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ]
  const middlewareEnhancer = applyMiddleware(...middlewares)
  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)
  const persistedReducer = persistReducer(options, rootReducer)
  const devTools =
    process.env.NODE_ENV === 'development'
      ? {
          ...composedEnhancers,
        }
      : false

  const store = configureStore({
    reducer: persistedReducer,
    middleware: middlewares,
    enhancers,
    preloadedState,
    devTools,
  })

  const persistor = persistStore(store, null, () => store.getState)

  // @ts-ignore
  if (process.env.NODE_ENV === 'development' && module.hot) {
    // @ts-ignore
    module.hot.accept('./rootReducer', () => {
      // @ts-ignore
      // eslint-disable-next-line global-require
      const newRootReducer = require('./rootReducer').default
      store.replaceReducer(newRootReducer)
    })
  }

  return { store, persistor }
}

export default configureAppStore
