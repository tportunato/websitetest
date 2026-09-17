/* Vision & Mission. Boxed hero (image stops short, solid panel carries the
   copy), then the investment-profile hand-off and a news strip, then contact. */
import PageBar from '../sections/PageBar.jsx'
import PageHero from '../sections/PageHero.jsx'
import GetInTouch from '../sections/GetInTouch.jsx'
import NewsStrip from '../sections/NewsStrip.jsx'
import BackToTop from '../sections/BackToTop.jsx'
import { VISION } from '../data/pages.js'

export default function Vision() {
  return (
    <div className="page">
      <PageBar title="Vision & Mission" />

      <PageHero
        variant="boxed"
        eyebrow="DAA Capital Partners"
        title={<>Vision &amp;<br />Mission</>}
        image="/images/vision-hero.jpg"
        lead={VISION.lead}
      >
        <div className="phero-cols">
          {VISION.body.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
        </div>
      </PageHero>

      <section className="pillars">
        <div className="pillars-inner">
          {VISION.pillars.map((p) => (
            <div className="pillar" key={p.t} data-reveal>
              <p className="pillar-t">{p.t}</p>
              <p className="pillar-d">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-band-inner">
          <p className="eyebrow" data-reveal>{VISION.investment.eyebrow}</p>
          <h2 className="firm-statement" data-reveal>{VISION.investment.statement}</h2>
          <p className="cta-band-note" data-reveal>{VISION.investment.note}</p>
          <a className="btn btn--lg btn--solid" href="#/investment-profile">
            <span>Let&rsquo;s work together</span>
            <span className="btn-arrow">&rarr;</span>
          </a>
        </div>
      </section>

      <NewsStrip />
      <GetInTouch />
      <BackToTop />
    </div>
  )
}
