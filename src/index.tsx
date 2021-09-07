// eslint-disable-next-line no-use-before-define
import React from 'react'
import ReactDOM from 'react-dom'

import reportWebVitals from './reportWebVitals'
import * as serviceWorker from './serviceWorker'

import './index.css'
import 'semantic-ui-css/semantic.min.css'

// TODO: Uncomment this when the admin panel is ready to develop
// import(
// process.env.REACT_APP_BUILD_TARGET === 'portal'
//   ? './portal'
//   : './admin-portal'
// )
import('./portal').then(({ default: Environment }) =>
  // eslint-disable-next-line react/no-render-return-value
  ReactDOM.render(
    <React.StrictMode>
      <Environment />
    </React.StrictMode>,
    document.getElementById('root'),
  ),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
