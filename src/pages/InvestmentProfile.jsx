/* Investment profile. Set out plainly enough that a broker can qualify a
   building against it in under a minute: six statements at reading size with an
   arrow against each, rather than a grid of labelled cards. The arrow comes
   from ../sections/Icons.jsx. */
import PageBar from '../sections/PageBar.jsx'
import PageHero from '../sections/PageHero.jsx'
import GetInTouch from '../sections/GetInTouch.jsx'
import Footer from '../sections/Footer.jsx'
import BackToTop from '../sections/BackToTop.jsx'
import { INVESTMENT } from '../data/pages.js'
import { Arrow } from '../sections/Icons.jsx'


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
