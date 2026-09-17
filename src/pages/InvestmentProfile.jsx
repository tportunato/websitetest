/* Investment profile. What we buy, set out plainly enough that a broker can
   qualify a building against it in under a minute. */
import PageBar from '../sections/PageBar.jsx'
import PageHero from '../sections/PageHero.jsx'
import GetInTouch from '../sections/GetInTouch.jsx'
import BackToTop from '../sections/BackToTop.jsx'
import { INVESTMENT } from '../data/pages.js'

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
      />

      <section className="criteria">
        <div className="criteria-inner">
          {INVESTMENT.criteria.map((c, i) => (
            <div className="crit" key={c.t} data-reveal>
              <span className="crit-n">{String(i + 1).padStart(2, '0')}</span>
              <div className="crit-body">
                <p className="crit-t">{c.t}</p>
                <p className="crit-d">{c.d}</p>
              </div>
            </div>
          ))}
        </div>
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
      <BackToTop />
    </div>
  )
}
