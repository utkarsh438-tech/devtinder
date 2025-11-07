import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import appstore from './utils/appstore.js'

createRoot(document.getElementById('root')).render(
  <Provider store={appstore}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
)
