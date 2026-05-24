import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from "react-redux"
import { store } from './store/store.js'
import './index.css'
import Header from './components/Header.jsx'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Header/>
          <App/>
        </BrowserRouter>    
      </Provider>
    </AuthProvider> 
  </StrictMode>
)
