/* One person, as a card. Shared by the draggable team row and the advisory
   grid, which is why it lives on its own: the two carried identical copies for
   a while and that is how they drift apart.

   TWO THINGS ARE CONDITIONAL, and both only started mattering when the two new
   seats arrived. A bio shorter than the clamp is shown whole, with no ellipsis
   and no Read more - the old copy truncated unconditionally, which was
   invisible while every bio ran long and then put a "…" and a button that
   revealed nothing on the incoming CIO's two lines. And a null linkedin drops
   the link rather than rendering a dead one; do not guess a URL to fill it. */
import { useState } from 'react'

const CLAMP = 150

export default function TeamCard({ person }) {
  const [open, setOpen] = useState(false)
  const long = person.bio.length > CLAMP

  return (
    <div className={'team-card' + (open ? ' open' : '')}>
      <div className="team-photo" style={{ backgroundImage: 'url(' + person.img + ')' }} />
      <h3>{person.name}</h3>
      <p className="team-role">{person.role}</p>
      <p className="team-bio">
        {long && !open ? person.bio.slice(0, CLAMP) + '…' : person.bio}
      </p>
      {(long || person.linkedin) && (
        <div className="team-actions">
          {long && (
            <button className="team-more" onClick={() => setOpen(!open)}>
              {open ? 'Less' : 'Read more'}
            </button>
          )}
          {person.linkedin && (
            <a className="team-li" href={person.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
        </div>
      )}
    </div>
  )
}
