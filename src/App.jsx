/* Hash routing. Every nav destination is now its own route rather than an
   anchor on a one-pager, so the dropdown items behave like real pages.

   Scroll is only reset when the ROUTE changes. It used to reset on every
   hashchange through window.scrollTo, which threw in-page anchors to the top
   and fought Lenis. In-page anchors are handled by the landing page itself
   through src/lib/scroll.js. */
import { useEffect, useRef, useState } from 'react'
import Landing from './Landing.jsx'
import PortfolioMap from './pages/PortfolioMap.jsx'
import Leadership from './pages/Leadership.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'
import Vision from './pages/Vision.jsx'
import Sustainability from './pages/Sustainability.jsx'
import InvestmentProfile from './pages/InvestmentProfile.jsx'
import News from './pages/News.jsx'
import Origination from './pages/Origination.jsx'
import AssetManagement from './pages/AssetManagement.jsx'
import { scrollToTop } from './lib/scroll.js'

const ROUTES = [
  ['#/portfolio', 'portfolio', PortfolioMap],
  ['#/leadership', 'leadership', Leadership],
  ['#/contact', 'contact', Contact],
  ['#/about', 'about', About],
  ['#/vision', 'vision', Vision],
  ['#/sustainability', 'sustainability', Sustainability],
  ['#/investment-profile', 'investment', InvestmentProfile],
  ['#/news', 'news', News],
  ['#/origination', 'origination', Origination],
  ['#/asset-management', 'assets', AssetManagement]
]

function getRoute() {
  const h = window.location.hash
  const hit = ROUTES.find(([prefix]) => h.startsWith(prefix))
  return hit ? hit[1] : 'landing'
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
      scrollToTop()
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const hit = ROUTES.find(([, name]) => name === route)
  if (hit) {
    const Page = hit[2]
    return <Page />
  }
  return <Landing />
}
