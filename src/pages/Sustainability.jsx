/* Sustainability. Boxed hero, the commitments, then the thesis section that
   used to sit on the landing page, closing on the investment-profile button. */
import PageBar from '../sections/PageBar.jsx'
import PageHero from '../sections/PageHero.jsx'
import SplitFeature from '../sections/SplitFeature.jsx'
import GetInTouch from '../sections/GetInTouch.jsx'
import BackToTop from '../sections/BackToTop.jsx'
import { SUSTAINABILITY as S } from '../data/pages.js'

export default function Sustainability() {
  return (
    <div className="page">
      <PageBar title="Sustainability" />

      <PageHero
        variant="boxed"
        eyebrow="DAA Capital Partners"
        title="Sustainability"
        image="/images/sustainability-hero.jpg"
        lead={S.lead}
      >
        <div className="phero-cols">
          {S.body.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
        </div>
      </PageHero>

      <section className="pillars">
        <div className="pillars-inner pillars-inner--four">
          {S.commitments.map((c) => (
            <div className="pillar" key={c.t} data-reveal>
              <p className="pillar-t">{c.t}</p>
              <p className="pillar-d">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The thesis, moved off the landing page. */}
      <SplitFeature
        id="thesis"
        eyebrow={S.thesis.eyebrow}
        statement={S.thesis.statement}
        notes={S.thesis.notes}
        image="/images/warehouse-trucks.jpg"
      >
        <ul className="manifesto-rail" data-reveal>
          {S.thesis.rail.map((r) => (
            <li key={r.t}>
              <span className="manifesto-rail-t">{r.t}</span>
              <span className="manifesto-rail-d">{r.d}</span>
            </li>
          ))}
        </ul>
        <a className="btn btn--lg btn--solid btn--spaced" href="#/investment-profile">
          <span>Let&rsquo;s work together</span>
          <span className="btn-arrow">&rarr;</span>
        </a>
      </SplitFeature>

      <GetInTouch />
      <BackToTop />
    </div>
  )
}
