/* Header. One grouped dropdown (DAA) following axis-re.nl's information
   architecture; Strategy was a second group until it became a single page,
   and every dropdown item is its own route rather than an anchor on a
   one-pager. The same bar is used on the landing page and on every content
   page (via PageBar), so it never resizes between routes.

   The Investor Login pill replaced the Investor Login link at the client's
   request. Its paper plane comes from ./Icons.jsx. */
import { useEffect, useRef, useState } from 'react'
import { Plane } from './Icons.jsx'
import Wordmark from './Wordmark.jsx'

const GROUPS = [
  {
    id: 'daa',
    label: 'DAA',
    items: [
      { label: 'About us', href: '#/about' },
      { label: 'Vision & Mission', href: '#/vision' },
      { label: 'Sustainability', href: '#/sustainability' },
      { label: 'Leadership', href: '#/leadership' }
    ]
  }
]

const FLAT = [
  { label: 'Home', href: '#/', first: true },
  { label: 'Strategy', href: '#/strategy' },
  { label: 'Portfolio', href: '#/portfolio' },
  { label: 'Investment profile', href: '#/investment-profile' },
  { label: 'News', href: '#/news' }
]


export default function Nav({ pageTitle }) {
  const [open, setOpen] = useState(null)
  const [mobile, setMobile] = useState(false)
  const barRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setOpen(null)
      setMobile(false)
    }
    const onDown = (e) => {
      if (barRef.current && !barRef.current.contains(e.target)) setOpen(null)
    }
    /* The bar hides itself on scroll-down; an open dropdown would be left
       floating with nothing attached to it. */
    const onScroll = () => setOpen((cur) => (cur ? null : cur))

    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!mobile) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [mobile])

  const close = () => { setOpen(null); setMobile(false) }
  const home = FLAT[0]
  const rest = FLAT.slice(1)

  return (
    <>
      <header className="nav" ref={barRef}>
        <a className="wordmark" href="#/" onClick={close}>
          {/* The mark draws itself on pointer enter. The full draw is the
              arrival veil on the landing page; here it is opt-in, so it never
              re-animates the furniture on a route change. */}
          <Wordmark mode="hover" duration={1500} />
        </a>

        <nav className="nav-main" aria-label="Primary">
          <a className="nav-link" href={home.href} onClick={close}>{home.label}</a>

          {GROUPS.map((g) => (
            <div
              key={g.id}
              className={'nav-group' + (open === g.id ? ' open' : '')}
              onMouseEnter={() => setOpen(g.id)}
              onMouseLeave={() => setOpen((cur) => (cur === g.id ? null : cur))}
            >
              <button
                type="button"
                className="nav-trigger"
                aria-expanded={open === g.id}
                onClick={() => setOpen((cur) => (cur === g.id ? null : g.id))}
              >
                {g.label}
                <svg className="nav-caret" viewBox="0 0 10 6" aria-hidden="true">
                  <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </button>
              <div className="nav-menu">
                {g.items.map((it) => (
                  <a key={it.href} href={it.href} onClick={close}>{it.label}</a>
                ))}
              </div>
            </div>
          ))}

          {rest.map((it) => (
            <a key={it.href} className="nav-link" href={it.href} onClick={close}>{it.label}</a>
          ))}
        </nav>

        <div className="nav-end">
          <a className="btn btn--solid btn--nav" href="#/contact" onClick={close}>
            <span>Get in touch</span>
            <Plane />
          </a>
          <button
            type="button"
            className={'nav-burger' + (mobile ? ' open' : '')}
            aria-label={mobile ? 'Close menu' : 'Open menu'}
            aria-expanded={mobile}
            onClick={() => setMobile((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {pageTitle && <span className="sr-title">{pageTitle}</span>}

      {/* Sibling of the bar, NOT a child: .nav carries backdrop-filter, which
          makes it the containing block for fixed descendants, so nested here the
          panel collapsed to zero height. */}
      <div className={'nav-panel' + (mobile ? ' open' : '')}>
        <div className="nav-panel-inner">
          <div className="panel-group">
            <p className="panel-group-label">Menu</p>
            <a href={home.href} onClick={close}>{home.label}</a>
            {rest.map((it) => <a key={it.href} href={it.href} onClick={close}>{it.label}</a>)}
          </div>
          {GROUPS.map((g) => (
            <div className="panel-group" key={g.id}>
              <p className="panel-group-label">{g.label}</p>
              {g.items.map((it) => <a key={it.href} href={it.href} onClick={close}>{it.label}</a>)}
            </div>
          ))}
          <a className="btn btn--lg btn--solid" href="#/contact" onClick={close}>
            <span>Get in touch</span>
            <Plane />
          </a>
        </div>
      </div>
    </>
  )
}
