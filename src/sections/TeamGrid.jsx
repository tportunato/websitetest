/* The principals and advisory grids, lifted out of what used to be the
   standalone Leadership page so the About page can carry them as a section.
   Content and photos from the existing daacap.com/leadership. */
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

export default function TeamGrid() {
  return (
    <>
      <p className="eyebrow">Principals</p>
      <div className="team-grid">
        {PRINCIPALS.map((p) => <Card key={p.name} person={p} />)}
      </div>
      <p className="eyebrow" style={{ marginTop: '9vh' }}>Advisory members</p>
      <div className="team-grid">
        {ADVISORS.map((p) => <Card key={p.name} person={p} />)}
      </div>
    </>
  )
}
