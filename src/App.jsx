/* Hash-based routing: #/ (landing), #/portfolio (asset map), #/leadership.
   Hash routing works on Vercel with zero rewrite configuration. */
import { useEffect, useState } from 'react'
import Landing from './Landing.jsx'
import PortfolioMap from './pages/PortfolioMap.jsx'
import Leadership from './pages/Leadership.jsx'

function getRoute() {
  const h = window.location.hash
  if (h.startsWith('#/portfolio')) return 'portfolio'
  if (h.startsWith('#/leadership')) return 'leadership'
  return 'landing'
}

export default function App() {
  const [route, setRoute] = useState(getRoute())

  useEffect(() => {
    const onHash = () => {
      setRoute(getRoute())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (route === 'portfolio') return <PortfolioMap />
  if (route === 'leadership') return <Leadership />
  return <Landing />
}
