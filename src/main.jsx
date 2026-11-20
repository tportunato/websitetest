import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Gate from './sections/Gate.jsx'
/* Lenis needs its own stylesheet from 1.1 onwards; without it html/body
   heights and scroll-behavior are left in a state it does not expect. */
import 'lenis/dist/lenis.css'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* The access gate, a draft for counsel; inert unless the URL has ?gate. */}
    <Gate>
      <App />
    </Gate>
  </React.StrictMode>
)
