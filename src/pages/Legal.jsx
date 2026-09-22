/* Legal & Regulatory. Deliberately short and plain.

   Regulatory status is not a marketing argument and is not presented as one
   anywhere on this site: the homepage carries no FINMA treatment, the footer
   states the status in one quiet line, and the full wording sits here. Keep it
   that way. This page is NOT the full investor disclaimer, which is a separate
   document and should not be folded in here. */
import PageBar from '../sections/PageBar.jsx'
import Footer from '../sections/Footer.jsx'
import BackToTop from '../sections/BackToTop.jsx'

export default function Legal() {
  return (
    <div className="page">
      <PageBar title="Legal & Regulatory" />

      <div className="legalpage">
        <p className="eyebrow">Legal &amp; Regulatory</p>
        <h1 className="legalpage-title">Regulatory information</h1>

        <p className="legalpage-body">
          DAA Capital Partners SA is a Swiss portfolio manager licensed by the Swiss
          Financial Market Supervisory Authority FINMA and supervised by SO-FIT. FINMA
          authorisation does not constitute approval or endorsement of any investment
          product or investment strategy.
        </p>

        <div className="legalpage-links">
          <a href="#/terms">Terms of Use &rarr;</a>
          <a href="#/privacy">Privacy Policy &rarr;</a>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </div>
  )
}
