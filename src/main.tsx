import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import AppLoader from './components/common/AppLoader'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppLoader>
        <App />
      </AppLoader>
    </BrowserRouter>
  </React.StrictMode>
)
