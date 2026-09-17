/* Investment profile. Set out plainly enough that a broker can qualify a
   building against it in under a minute: six statements at reading size with an
   arrow against each, rather than a grid of labelled cards. The arrow is inline
   SVG — the PNG supplied for it, like the paper plane, exported as a blank
   white square. */
import PageBar from '../sections/PageBar.jsx'
import PageHero from '../sections/PageHero.jsx'
import GetInTouch from '../sections/GetInTouch.jsx'
import Footer from '../sections/Footer.jsx'
import BackToTop from '../sections/BackToTop.jsx'
import { INVESTMENT } from '../data/pages.js'

function Arrow() {
  return (
    <svg className="bullet-arrow" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12h15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function InvestmentProfile() {
  return (
    <div className="page">
      <PageBar title="Investment profile" />

      <PageHero
        variant="boxed"
        eyebrow="DAA Capital Partners"
        title={<>Investment<br />profile</>}
        image="/images/investment-hero.jpg"
        lead={INVESTMENT.lead}
        action={
          <a className="btn btn--lg btn--solid" href="#/contact">
            <span>Connect</span>
            <span className="btn-arrow">&rarr;</span>
          </a>
        }
      />

      <section className="points">
        <ul className="points-list">
          {INVESTMENT.points.map((t) => (
            <li key={t.slice(0, 24)} data-reveal>
              <Arrow />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="cta-band">
        <div className="cta-band-inner">
          <h2 className="firm-statement" data-reveal>{INVESTMENT.closing.statement}</h2>
          <p className="cta-band-note" data-reveal>{INVESTMENT.closing.note}</p>
          <a className="btn btn--lg btn--solid" href="#/contact">
            <span>Let&rsquo;s talk</span>
            <span className="btn-arrow">&rarr;</span>
          </a>
        </div>
      </section>

      <GetInTouch />
      <Footer />
      <BackToTop />
    </div>
  )
}
