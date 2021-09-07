import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import configureStore from '@store/configureStore'
import AuthProvider from '@features/Auth/AuthProvider'
import App from './App'

const { store, persistor } = configureStore()

const PortalWeb: React.FC = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </PersistGate>
  </Provider>
)

export default PortalWeb
