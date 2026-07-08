export default function Proof() {
  return (
    <section className="proof" id="track-record">
      <p className="eyebrow" data-reveal>Track record</p>
      <h2 data-reveal>Sustained performance over several market cycles.</h2>
      <p className="body" data-reveal>
        All figures below are placeholders pending compliance sign-off.
        Final versions will present performance against the INREV asset-level index.
      </p>
      <div className="counters">
        <div className="counter" data-reveal>
          <span className="stat-num">
            <span data-count="12">0</span>%+
          </span>
          <span className="stat-label">target net IRR, Logistics Opportunities Fund II</span>
          <span className="badge">Placeholder &middot; pending sign-off</span>
        </div>
        <div className="counter" data-reveal>
          <span className="stat-num">
            &euro;<span data-count="300">0</span>m
          </span>
          <span className="stat-label">target fund size, Fund II</span>
          <span className="badge">Placeholder &middot; pending sign-off</span>
        </div>
        <div className="counter" data-reveal>
          <span className="stat-num">
            <span data-count="6">0</span>
          </span>
          <span className="stat-label">target markets: FR, NL, IT, ES, DE, BE</span>
          <span className="badge">Placeholder &middot; pending sign-off</span>
        </div>
      </div>
      <div className="quote" data-reveal>
        <p className="quote-text">
          &ldquo;Placeholder for a short conviction statement from the partners, or an LP quote,
          alongside real team photography.&rdquo;
        </p>
        <p className="quote-attr">Name Surname, Title</p>
      </div>
    </section>
  )
}
