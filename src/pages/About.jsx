/* About us, and the whole of the DAA group with it.

   Vision & Mission, Sustainability and Leadership used to be three separate
   routes. They are sections of this page now, because clicking the DAA nav
   item ought to take you somewhere rather than only open a menu, and because
   the four read as one story about the firm rather than four destinations.

   THE OLD URLS STILL WORK AND STILL MEAN SOMETHING. `#/vision`,
   `#/sustainability` and `#/leadership` render this page and land on the
   matching section, so every existing link, bookmark and dropdown item goes
   where it says it goes. App.jsx maps all four to this component and does the
   scrolling; the section ids below are the contract between the two. Rename
   one and fix SECTION_OF there in the same commit. */
import Footer from '../sections/Footer.jsx'
import PageBar from '../sections/PageBar.jsx'
import PageHero from '../sections/PageHero.jsx'
import GetInTouch from '../sections/GetInTouch.jsx'
import BackToTop from '../sections/BackToTop.jsx'
import NewsStrip from '../sections/NewsStrip.jsx'
import TeamGrid from '../sections/TeamGrid.jsx'
import { ABOUT, VISION, SUSTAINABILITY as S } from '../data/pages.js'

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

      <section className="about-sec" id="vision">
        <div className="about-sec-inner">
          <p className="eyebrow" data-reveal>Vision &amp; Mission</p>
          <h2 className="firm-statement" data-reveal>{VISION.lead}</h2>
          <div className="phero-cols">
            {VISION.body.map((p) => <p key={p.slice(0, 20)} data-reveal>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="cta-band cta-band--media">
        <div className="cta-band-inner">
          <div className="cta-band-copy">
            <p className="eyebrow" data-reveal>{VISION.investment.eyebrow}</p>
            <h2 className="firm-statement" data-reveal>{VISION.investment.statement}</h2>
            <p className="cta-band-note" data-reveal>{VISION.investment.note}</p>
            <a className="btn btn--lg btn--solid" href="#/investment-profile">
              <span>Let&rsquo;s work together</span>
              <span className="btn-arrow">&rarr;</span>
            </a>
          </div>
          <div className="cta-band-media" aria-hidden="true">
            <img src="/images/investment-side.jpg" alt="" />
          </div>
        </div>
      </section>

      <section className="about-sec" id="sustainability">
        <div className="about-sec-inner">
          <p className="eyebrow" data-reveal>Sustainability</p>
          <h2 className="firm-statement" data-reveal>{S.lead}</h2>
          <div className="phero-cols">
            {S.body.map((p) => <p key={p.slice(0, 20)} data-reveal>{p}</p>)}
          </div>
        </div>
      </section>

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

      <section className="about-sec about-sec--team" id="leadership">
        <div className="about-sec-inner">
          <p className="eyebrow" data-reveal>Leadership</p>
          <h2 className="firm-statement" data-reveal>The people who answer for the portfolio.</h2>
          <TeamGrid />
        </div>
      </section>

      <NewsStrip />
      <GetInTouch />
      <Footer />
      <BackToTop />
    </div>
  )
}
