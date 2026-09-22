/* Hash routing. Every nav destination is now its own route rather than an
   anchor on a one-pager, so the dropdown items behave like real pages.

   Scroll is only reset when the ROUTE changes. It used to reset on every
   hashchange through window.scrollTo, which threw in-page anchors to the top
   and fought Lenis. In-page anchors are handled by the landing page itself
   through src/lib/scroll.js. */
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Landing from './Landing.jsx'
import PortfolioMap from './pages/PortfolioMap.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'
import InvestmentProfile from './pages/InvestmentProfile.jsx'
import News from './pages/News.jsx'
import Article from './pages/Article.jsx'
import Strategy from './pages/Strategy.jsx'
import Legal from './pages/Legal.jsx'
import LegalDoc from './pages/LegalDoc.jsx'
import { TERMS, PRIVACY } from './data/legal.js'
import { jumpToTop, scrollToTop, goToSection } from './lib/scroll.js'

/* Order matters: '#/news/<id>' has to be tested before the bare '#/news'. */
const ROUTES = [
  ['#/portfolio', 'portfolio', PortfolioMap],
  ['#/leadership', 'about', About],
  ['#/contact', 'contact', Contact],
  ['#/about', 'about', About],
  ['#/vision', 'about', About],
  ['#/sustainability', 'about', About],
  ['#/investment-profile', 'investment', InvestmentProfile],
  ['#/news/', 'article', Article],
  ['#/news', 'news', News],
  ['#/strategy', 'strategy', Strategy],
  ['#/legal', 'legal', Legal],
  ['#/terms', 'terms', () => <LegalDoc doc={TERMS} />],
  ['#/privacy', 'privacy', () => <LegalDoc doc={PRIVACY} />]
]

/* Vision & Mission, Sustainability and Leadership are SECTIONS of the About
   page now rather than routes of their own, but their URLs still exist and
   still mean something: each one opens About at the matching section. Keeping
   the addresses is what makes every old link, bookmark and dropdown item land
   where it claims to. The ids live on the sections in pages/About.jsx. */
const SECTION_OF = {
  '#/vision': 'vision',
  '#/sustainability': 'sustainability',
  '#/leadership': 'leadership'
}

function sectionFor(hash) {
  const hit = Object.keys(SECTION_OF).find((prefix) => hash.startsWith(prefix))
  return hit ? SECTION_OF[hit] : null
}

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
  const [mark, setMark] = useState(() => window.location.hash)
  const first = useRef(true)
  const wasAbout = useRef(getRoute() === 'about')

  useEffect(() => {
    const onHash = () => {
      const next = getRoute()
      setRoute(next)
      setKey(pageKey(next))
      setMark(window.location.hash)
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

  /* Landing on an About section.

     ARRIVING from another page is a page opening, so it JUMPS, per the rule in
     CLAUDE.md - there is no relationship between where the reader was and the
     section they asked for. MOVING between sections while already on About is
     an in-page anchor, so it eases. `wasAbout` is what tells the two apart, and
     it is a ref rather than state because it must be read and updated inside
     the same effect without causing a second render.

     useLayoutEffect, not useEffect: after the new page has rendered and before
     it is painted, so the reader never sees the top of About on the way to the
     section they clicked. */
  useLayoutEffect(() => {
    if (route !== 'about') {
      wasAbout.current = false
      return
    }
    const id = sectionFor(mark)
    const eased = wasAbout.current
    wasAbout.current = true
    /* Bare #/about means the top of the page. Without this it did nothing at
       all when you were already on About: the page key has not changed, so the
       jumpToTop above does not fire, and there is no section to go to - so
       clicking About us from the Leadership section left you in the team
       grid. */
    if (!id) {
      if (eased) scrollToTop()
      return
    }
    goToSection(id, { instant: !eased })
  }, [route, mark])

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
