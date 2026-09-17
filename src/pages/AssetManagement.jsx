/* Asset management. Moved off the landing page onto its own route, paired with
   the future-proofing argument that the home page only gestures at. */
import Footer from '../sections/Footer.jsx'
import PageBar from '../sections/PageBar.jsx'
import Work from '../sections/Work.jsx'
import SplitFeature from '../sections/SplitFeature.jsx'
import GetInTouch from '../sections/GetInTouch.jsx'
import BackToTop from '../sections/BackToTop.jsx'
import { FUTUREPROOF } from '../data/pages.js'

export default function AssetManagement() {
  return (
    <div className="page page--beat">
      <PageBar title="Asset management" />
      <Work />
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
      <GetInTouch />
      <Footer />
      <BackToTop />
    </div>
  )
}
