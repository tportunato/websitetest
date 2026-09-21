/* Sustainability. Boxed hero, the commitments, then the thesis section that
   used to sit on the landing page, closing on the investment-profile button. */
import Footer from '../sections/Footer.jsx'
import PageBar from '../sections/PageBar.jsx'
import PageHero from '../sections/PageHero.jsx'
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


      <GetInTouch />
      <Footer />
      <BackToTop />
    </div>
  )
}
