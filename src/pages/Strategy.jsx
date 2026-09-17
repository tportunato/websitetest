/* Strategy. One page rather than a dropdown of two, and it runs in the order
   the argument actually makes sense in: what we do with a building, the thesis
   behind doing it, then how we find the building in the first place.

   The "Off-market" band that used to close the origination page is gone at the
   client's request. */
import PageBar from '../sections/PageBar.jsx'
import Work from '../sections/Work.jsx'
import Edge from '../sections/Edge.jsx'
import SplitFeature from '../sections/SplitFeature.jsx'
import GetInTouch from '../sections/GetInTouch.jsx'
import Footer from '../sections/Footer.jsx'
import BackToTop from '../sections/BackToTop.jsx'
import { FUTUREPROOF } from '../data/pages.js'

export default function Strategy() {
  return (
    <div className="page page--beat">
      <PageBar title="Strategy" />

      {/* 1. Asset management, on the facade video */}
      <Work />

      {/* 2. Asset strategy */}
      <SplitFeature
        id="future-proof"
        eyebrow={FUTUREPROOF.eyebrow}
        statement={FUTUREPROOF.statement}
        notes={FUTUREPROOF.notes}
        image="/images/futureproof.jpg"
      >
        <a className="btn btn--lg btn--solid btn--spaced" href="#/investment-profile">
          <span>Let&rsquo;s work together</span>
          <span className="btn-arrow">&rarr;</span>
        </a>
      </SplitFeature>

      {/* 3. Origination, on the Sonar sweep */}
      <Edge />

      <GetInTouch />
      <Footer />
      <BackToTop />
    </div>
  )
}
