/* About route. One page, three sections, reached as #/about, #/about/vision and
   #/about/sustainability so the DAA nav group can point at each one directly
   without three near-empty routes.

   The sections borrow the firm section's language rather than inventing a new
   one: eyebrow, a single claim at display size, supporting notes demoted under
   it, and a mono spec rail on a hairline. See CLAUDE.md on why this page must
   not read as a generic "about us" band. */
import { useEffect } from 'react'
import BackToTop from '../sections/BackToTop.jsx'
import { ABOUT, VISION, SUSTAINABILITY } from '../data/about.js'

/* #/about/<section> scrolls to that block. The nav group links straight here,
   so this runs on arrival and on every hash change while the page is mounted. */
function useSectionScroll() {
  useEffect(() => {
    const go = () => {
      const part = window.location.hash.replace(/^#\/about\/?/, '')
      const el = part ? document.getElementById('about-' + part) : null
      if (!el) {
        window.scrollTo(0, 0)
        return
      }
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    }
    go()
    window.addEventListener('hashchange', go)
    return () => window.removeEventListener('hashchange', go)
  }, [])
}

function Block({ id, data, children }) {
  return (
    <section className="about-block" id={id}>
      <p className="eyebrow">{data.eyebrow}</p>
      <h2 className="about-statement">{data.statement}</h2>
      <div className="about-notes">
        {data.body.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
      </div>
      {children}
    </section>
  )
}

export default function About() {
  useSectionScroll()

  return (
    <div className="page-about">
      <header className="page-bar">
        <a className="page-home" href="#/">
          <img className="logo-img" src="/images/daa-logo-white.svg" alt="DAA Capital Partners" />
        </a>
        <div className="page-title">About</div>
        <a className="login" href="https://daacap.my.site.com/Investor" target="_blank" rel="noreferrer">
          Investor Login
        </a>
      </header>

      <div className="about-wrap">
        <Block id="about-us" data={ABOUT}>
          <ul className="firm-spec about-spec">
            {ABOUT.spec.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </Block>

        <Block id="about-vision" data={VISION}>
          <div className="about-pillars">
            {VISION.pillars.map((p) => (
              <div className="about-pillar" key={p.t}>
                <p className="about-pillar-t">{p.t}</p>
                <p className="about-pillar-d">{p.d}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block id="about-sustainability" data={SUSTAINABILITY}>
          <div className="about-pillars">
            {SUSTAINABILITY.commitments.map((c) => (
              <div className="about-pillar" key={c.t}>
                <p className="about-pillar-t">{c.t}</p>
                <p className="about-pillar-d">{c.d}</p>
              </div>
            ))}
          </div>
        </Block>

        <div className="about-onward">
          <a href="#/leadership">Leadership &rarr;</a>
          <a href="#/portfolio">Portfolio &rarr;</a>
          <a href="#/contact">Contact &rarr;</a>
        </div>
      </div>

      <footer className="page-foot">
        <span>&copy; 2026 DAA Capital Partners SA. For professional investors only.</span>
      </footer>
      <BackToTop />
    </div>
  )
}
