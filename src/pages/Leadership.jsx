/* Leadership page. Content and photos from the existing daacap.com/leadership. */
import { useState } from 'react'
import { PRINCIPALS, ADVISORS } from '../data/team.js'

function Card({ person }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={'team-card' + (open ? ' open' : '')}>
      <div className="team-photo" style={{ backgroundImage: 'url(' + person.img + ')' }} />
      <h3>{person.name}</h3>
      <p className="team-role">{person.role}</p>
      <p className="team-bio">{open ? person.bio : person.bio.slice(0, 150) + '…'}</p>
      <div className="team-actions">
        <button className="team-more" onClick={() => setOpen(!open)}>
          {open ? 'Less' : 'Read more'}
        </button>
        <a className="team-li" href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </div>
  )
}

export default function Leadership() {
  return (
    <div className="page-team">
      <header className="page-bar">
        <a className="page-home" href="#/"><span className="back-arrow">&larr;</span><img className="logo-img" src="/images/daa-logo-white.svg" alt="DAA Capital Partners" /></a>
        <div className="page-title">Leadership</div>
        <a className="login" href="https://daacap.my.site.com/Investor" target="_blank" rel="noreferrer">Investor Login</a>
      </header>
      <div className="team-wrap">
        <p className="eyebrow">Principals</p>
        <div className="team-grid">
          {PRINCIPALS.map((p) => <Card key={p.name} person={p} />)}
        </div>
        <p className="eyebrow" style={{ marginTop: '9vh' }}>Advisory members</p>
        <div className="team-grid">
          {ADVISORS.map((p) => <Card key={p.name} person={p} />)}
        </div>
      </div>
      <footer className="page-foot">
        <span>&copy; 2026 DAA Capital Partners SA. For professional investors only.</span>
      </footer>
    </div>
  )
}
