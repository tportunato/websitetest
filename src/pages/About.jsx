/* About us. Two parts, following axis-re.nl: a large title over an image, then
   a team section that alternates copy and photograph and hands off to the
   leadership page. No results section by request. */
import Footer from '../sections/Footer.jsx'
import PageBar from '../sections/PageBar.jsx'
import PageHero from '../sections/PageHero.jsx'
import GetInTouch from '../sections/GetInTouch.jsx'
import BackToTop from '../sections/BackToTop.jsx'
import { ABOUT } from '../data/pages.js'

export default function About() {
  return (
    <div className="page">
      <PageBar title="About us" />

      <PageHero
        variant="full"
        eyebrow="DAA Capital Partners"
        title="About us"
        image="/images/about-hero.jpg"
        lead={ABOUT.lead}
      >
        <div className="phero-body">
          {ABOUT.body.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
        </div>
      </PageHero>

      <section className="alt" id="our-team">
        <div className="alt-inner">
          <div className="alt-copy">
            <p className="eyebrow" data-reveal>{ABOUT.team.eyebrow}</p>
            <h2 className="firm-statement" data-reveal>{ABOUT.team.statement}</h2>
            <div className="firm-notes">
              {ABOUT.team.notes.map((n) => <p key={n.slice(0, 20)} data-reveal>{n}</p>)}
            </div>
            <a className="btn btn--lg btn--outline" href="#/leadership">
              <span>{ABOUT.team.cta}</span>
              <span className="btn-arrow">&rarr;</span>
            </a>
          </div>
          <div className="alt-media">
            <img src="/images/team-photo.jpg" alt="" />
          </div>
        </div>
      </section>

      <GetInTouch />
      <Footer />
      <BackToTop />
    </div>
  )
}
