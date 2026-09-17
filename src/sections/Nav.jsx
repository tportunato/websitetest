/* Header. Grouped dropdowns, following the information architecture on
   axis-re.nl: one brand group collects the "who we are" pages instead of
   spilling them across the bar, and a strategy group collects the landing
   page's story beats. Flat items are the three destinations that earn their
   own slot.

   The bar keeps the three-column grid it shares with .page-bar, so it does not
   resize between routes (see CLAUDE.md). Below 980px the links collapse into a
   full-screen panel — before this there was no mobile navigation at all, and
   every subpage was unreachable on a phone.

   NOTE: there is no #track-record link. That section was deleted in pass 5
   along with every unverified fund figure; see NOTES-data-honesty.md. */
import { useEffect, useRef, useState } from 'react'

const GROUPS = [
  {
    id: 'daa',
    label: 'DAA',
    items: [
      { label: 'About us', href: '#/about' },
      { label: 'Vision & Mission', href: '#/about/vision' },
      { label: 'Leadership', href: '#/leadership' },
      { label: 'Sustainability', href: '#/about/sustainability' }
    ]
  },
  {
    id: 'strategy',
    label: 'Strategy',
    items: [
      { label: 'The market', href: '#market' },
      { label: 'Origination', href: '#origination' },
      { label: 'Asset management', href: '#assets' }
    ]
  }
]

const FLAT = [
  { label: 'Portfolio', href: '#/portfolio' },
  { label: 'News', href: '#news' },
  { label: 'Contact', href: '#/contact' }
]

export default function Nav() {
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
    /* The bar hides itself on scroll-down. An open dropdown is positioned
       against the bar but extends past it, so it would be left floating on
       screen with nothing attached to it. */
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

  /* The panel owns the scroll lock while it is up, otherwise the page behind it
     keeps moving under Lenis. */
  useEffect(() => {
    if (!mobile) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [mobile])

  const close = () => { setOpen(null); setMobile(false) }

  return (
    <>
      <header className="nav" ref={barRef}>
      <a className="wordmark" href="#/" onClick={close}>
        <img className="logo-img" src="/images/daa-logo-white.svg" alt="DAA Capital Partners" />
      </a>

      <nav className="nav-main" aria-label="Primary">
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

        {FLAT.map((it) => (
          <a key={it.href} className="nav-link" href={it.href} onClick={close}>
            {it.label}
          </a>
        ))}
      </nav>

      <div className="nav-end">
        <a className="login" href="https://daacap.my.site.com/Investor" target="_blank" rel="noreferrer">
          Investor Login
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

      {/* Sibling of the bar, NOT a child of it. .nav carries backdrop-filter,
          which makes it the containing block for position:fixed descendants —
          nested here the panel resolved top/bottom against the 76px bar and
          collapsed to zero height, so the burger toggled and nothing appeared. */}
      <div className={'nav-panel' + (mobile ? ' open' : '')}>
        <div className="nav-panel-inner">
          {GROUPS.map((g) => (
            <div className="panel-group" key={g.id}>
              <p className="panel-group-label">{g.label}</p>
              {g.items.map((it) => (
                <a key={it.href} href={it.href} onClick={close}>{it.label}</a>
              ))}
            </div>
          ))}
          <div className="panel-group">
            <p className="panel-group-label">More</p>
            {FLAT.map((it) => (
              <a key={it.href} href={it.href} onClick={close}>{it.label}</a>
            ))}
            <a href="https://daacap.my.site.com/Investor" target="_blank" rel="noreferrer">
              Investor Login
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
