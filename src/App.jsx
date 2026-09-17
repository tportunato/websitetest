/* Hash-based routing: #/ (landing), #/about, #/portfolio, #/leadership,
   #/contact. Hash routing works on Vercel with zero rewrite configuration.

   Scroll is only reset when the ROUTE changes. It used to reset on every
   hashchange, which meant in-page anchors (#market, #news) scrolled to the top
   of the page instead of to their section — and did it through
   window.scrollTo, which fights Lenis. In-page anchors are handled by the
   landing page itself, through src/lib/scroll.js. */
import { useEffect, useRef, useState } from 'react'
import Landing from './Landing.jsx'
import PortfolioMap from './pages/PortfolioMap.jsx'
import Leadership from './pages/Leadership.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'
import { scrollToTop } from './lib/scroll.js'

function getRoute() {
  const h = window.location.hash
  if (h.startsWith('#/portfolio')) return 'portfolio'
  if (h.startsWith('#/leadership')) return 'leadership'
  if (h.startsWith('#/contact')) return 'contact'
  if (h.startsWith('#/about')) return 'about'
  return 'landing'
}

export default function App() {
  const [route, setRoute] = useState(getRoute())
  const prev = useRef(route)

  useEffect(() => {
    const onHash = () => {
      const next = getRoute()
      setRoute(next)
      if (next === prev.current) return
      prev.current = next
      /* About scrolls itself to the requested section on arrival. */
      if (next !== 'about') scrollToTop()
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (route === 'portfolio') return <PortfolioMap />
  if (route === 'leadership') return <Leadership />
  if (route === 'contact') return <Contact />
  if (route === 'about') return <About />
  return <Landing />
}
