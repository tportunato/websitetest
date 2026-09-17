/* The manifesto. This is the page's ONE serif moment (see CLAUDE.md) — the
   claim is the whole point and nothing here may compete with it.

   It used to be the line alone, which read as a pull quote with nothing behind
   it: a reader who did not already agree was given no reason to. The substance
   is therefore added in the page's OTHER voice, not a second display voice —
   one sans sub-line carrying the argument, then a mono rail on a hairline in
   the same idiom as the firm section's spec rail. No second serif, no numbers
   (NOTES-data-honesty.md: nothing unverified goes on the page). */

const RAIL = [
  {
    t: 'Proximity',
    d: 'The value sits in the distance to the consumer, not in the square metres.'
  },
  {
    t: 'Scarcity',
    d: 'First-ring industrial land converts to housing, and it does not convert back.'
  },
  {
    t: 'Necessity',
    d: 'Rent is a small share of supply chain cost, and the last link is the least substitutable.'
  }
]

export default function Manifesto() {
  return (
    <section className="manifesto">
      <div className="manifesto-inner">
        <h2 data-reveal>
          We buy the buildings<br />cities cannot live without.
        </h2>

        <p className="manifesto-sub" data-reveal>
          Last-mile logistics is not a property type. It is the physical condition of
          everything a city expects to arrive the same day.
        </p>

        <ul className="manifesto-rail" data-reveal>
          {RAIL.map((r) => (
            <li key={r.t}>
              <span className="manifesto-rail-t">{r.t}</span>
              <span className="manifesto-rail-d">{r.d}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
