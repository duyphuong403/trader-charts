import { isDev } from '../../utils'

const production = {
  apiKey: process.env.REACT_APP_FIRE_APP_API_KEY,
  authDomain: process.env.REACT_APP_FIRE_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIRE_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIRE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIRE_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIRE_APP_ID,
}

const development = {
  apiKey: process.env.REACT_APP_FIRE_APP_API_KEY,
  authDomain: process.env.REACT_APP_FIRE_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIRE_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIRE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIRE_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIRE_APP_ID,
}

const config = isDev() ? development : production

export default config
