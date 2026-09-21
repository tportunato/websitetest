import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
/* Lenis needs its own stylesheet from 1.1 onwards; without it html/body
   heights and scroll-behavior are left in a state it does not expect. */
import 'lenis/dist/lenis.css'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
