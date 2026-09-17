/* Origination. Moved off the landing page onto its own route: the Sonar beat
   is the argument, so it gets the whole page rather than one slot in a scroll. */
import PageBar from '../sections/PageBar.jsx'
import Edge from '../sections/Edge.jsx'
import GetInTouch from '../sections/GetInTouch.jsx'
import BackToTop from '../sections/BackToTop.jsx'

export default function Origination() {
  return (
    <div className="page page--beat">
      <PageBar title="Origination" />
      <Edge />
      <section className="cta-band">
        <div className="cta-band-inner">
          <p className="eyebrow">Off-market</p>
          <h2 className="firm-statement">Most of what we buy is never on the market.</h2>
          <p className="cta-band-note">
            If you are selling, or advising on a sale, in the EUR 5m to EUR 50m segment,
            our investment profile sets out exactly what we buy and how quickly we can
            come back to you.
          </p>
          <a className="btn btn--lg btn--solid" href="#/investment-profile">
            <span>Investment profile</span>
            <span className="btn-arrow">&rarr;</span>
          </a>
        </div>
      </section>
      <GetInTouch />
      <BackToTop />
    </div>
  )
}
