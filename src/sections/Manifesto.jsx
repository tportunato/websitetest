/* The manifesto. Built to mirror the firm section: same type, same left-hand
   positioning, same photo panel on the right.

   NOTE: this used to be the page's one centred serif moment. It is now sans and
   left-aligned at the client's request, so the Cormorant italic no longer
   appears anywhere on the landing page. If the serif is ever wanted back, it is
   .manifesto .firm-statement that carries it. */

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
    <section className="manifesto manifesto--photo">
      <div className="manifesto-photo" aria-hidden="true">
        <img src="/images/warehouse-trucks.jpg" alt="" />
      </div>

      <div className="firm-inner manifesto-inner">
        <p className="eyebrow" data-reveal>The thesis</p>

        <h2 className="firm-statement" data-reveal>
          We buy the buildings cities cannot live without.
        </h2>

        <div className="firm-notes">
          <p data-reveal>
            Last-mile logistics is not a property type. It is the physical condition of
            everything a city expects to arrive the same day.
          </p>
        </div>

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
