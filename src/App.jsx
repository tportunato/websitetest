/* Hash routing. Every nav destination is now its own route rather than an
   anchor on a one-pager, so the dropdown items behave like real pages.

   Scroll is only reset when the ROUTE changes. It used to reset on every
   hashchange through window.scrollTo, which threw in-page anchors to the top
   and fought Lenis. In-page anchors are handled by the landing page itself
   through src/lib/scroll.js. */
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Landing from './Landing.jsx'
import PortfolioMap from './pages/PortfolioMap.jsx'
import Leadership from './pages/Leadership.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'
import Vision from './pages/Vision.jsx'
import Sustainability from './pages/Sustainability.jsx'
import InvestmentProfile from './pages/InvestmentProfile.jsx'
import News from './pages/News.jsx'
import Article from './pages/Article.jsx'
import Strategy from './pages/Strategy.jsx'
import Legal from './pages/Legal.jsx'
import { jumpToTop } from './lib/scroll.js'

/* Order matters: '#/news/<id>' has to be tested before the bare '#/news'. */
const ROUTES = [
  ['#/portfolio', 'portfolio', PortfolioMap],
  ['#/leadership', 'leadership', Leadership],
  ['#/contact', 'contact', Contact],
  ['#/about', 'about', About],
  ['#/vision', 'vision', Vision],
  ['#/sustainability', 'sustainability', Sustainability],
  ['#/investment-profile', 'investment', InvestmentProfile],
  ['#/news/', 'article', Article],
  ['#/news', 'news', News],
  ['#/strategy', 'strategy', Strategy],
  ['#/legal', 'legal', Legal]
]

function getRoute() {
  const h = window.location.hash
  const hit = ROUTES.find(([prefix]) => h.startsWith(prefix))
  return hit ? hit[1] : 'landing'
}

/* What counts as "a different page" for the purpose of resetting scroll. Two
   articles are two pages even though they share the 'article' route, so the id
   is part of the identity; otherwise following More insights from one article
   to the next left you at the same depth in the new one. */
function pageKey(route) {
  return route === 'article' ? window.location.hash : route
}

export default function App() {
  const [route, setRoute] = useState(getRoute())
  const [key, setKey] = useState(() => pageKey(getRoute()))
  const first = useRef(true)

  useEffect(() => {
    const onHash = () => {
      const next = getRoute()
      setRoute(next)
      setKey(pageKey(next))
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  /* AFTER the new page has rendered and BEFORE it is painted, so the reader
     never sees the old scroll position on the new page. Skipped on first mount:
     a deep link should land where it was asked to, and #/about scrolls itself
     to the requested section. */
  useLayoutEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    jumpToTop()
  }, [key])

  if (route === 'article') {
    return <Article id={window.location.hash.replace('#/news/', '').replace(/\/$/, '')} />
  }

  const hit = ROUTES.find(([, name]) => name === route)
  if (hit) {
    const Page = hit[2]
    return <Page />
  }
  return <Landing />
}
