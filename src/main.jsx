import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Globalstate from './components/Globalstate.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Globalstate>
      <App />
    </Globalstate>
 
  </React.StrictMode>,
)
