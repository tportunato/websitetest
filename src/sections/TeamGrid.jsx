/* The team section of the About page: the draggable row of members, then the
   advisory board as a grid.

   The members used to be a three-up grid too. Five of them made that a row of
   three and a row of two, which reads as a team with a hole in it, so the row
   scrolls sideways instead. The CARDS are unchanged - same width, same 108px
   portrait, same copy - only the container moved. The advisers stay a grid:
   there are three of them and they are a board, not a sequence. */
import { ADVISORS } from '../data/team.js'
import TeamCard from './TeamCard.jsx'
import TeamCarousel from './TeamCarousel.jsx'

export default function TeamGrid() {
  return (
    <>
      <TeamCarousel />
      <p className="eyebrow" style={{ marginTop: '9vh' }}>Advisory members</p>
      <div className="team-grid">
        {ADVISORS.map((p) => <TeamCard key={p.name} person={p} />)}
      </div>
    </>
  )
}
