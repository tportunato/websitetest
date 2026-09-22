/* The team section of the About page: the carousel of principals, then the
   advisory board as a grid.

   The principals used to be a three-up grid too. Five members made that a row
   of three and a row of two, which reads as a team with a gap in it, so they
   turn one at a time instead. The advisers stay a grid - there are three of
   them and they are a board, not a sequence. */
import { useState } from 'react'
import { ADVISORS } from '../data/team.js'
import TeamCarousel from './TeamCarousel.jsx'

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
      <TeamCarousel />
      <p className="eyebrow" style={{ marginTop: '9vh' }}>Advisory members</p>
      <div className="team-grid">
        {ADVISORS.map((p) => <Card key={p.name} person={p} />)}
      </div>
    </>
  )
}
