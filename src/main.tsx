import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import ProtectedRoutes from './Router/ProtectedRoutes.tsx'
import './index.css'
import { store } from './redux/containers/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ProtectedRoutes>
          <App />
        </ProtectedRoutes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
