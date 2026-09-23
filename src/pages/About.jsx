/* About us, and the whole of the DAA group with it.

   Vision & Mission, Sustainability and Leadership used to be three separate
   routes. They are sections of this page now, because clicking the DAA nav
   item ought to take you somewhere rather than only open a menu, and because
   the four read as one story about the firm rather than four destinations.

   EACH SECTION KEEPS THE HERO IT HAD AS A PAGE. Vision & Mission and
   Sustainability open on the same boxed PageHero, with the same photograph, as
   when they were routes of their own; Leadership opens on the team photograph.
   The first attempt folded them in as plain eyebrow-and-statement bands, which
   stripped exactly the thing that made them feel like places. `section` on
   PageHero is what carries that over: a <section> with an id and an h2 instead
   of a <header> with the page's one h1.

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
    /* page--about scopes THE TONE SEQUENCE in styles.css. The bands it
       retones (.cta-band above all) are shared with other pages. */
    <div className="page page--about">
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

      <PageHero
        section
        id="vision"
        variant="boxed"
        eyebrow="DAA Capital Partners"
        title={<>Vision &amp;<br />Mission</>}
        image="/images/solar-roof.jpg"
        lead={VISION.lead}
      >
        <div className="phero-cols">
          {VISION.body.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
        </div>
      </PageHero>

      <PageHero
        section
        id="sustainability"
        variant="boxed"
        eyebrow="DAA Capital Partners"
        title="Sustainability"
        image="/images/fleet-field.jpg"
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

      {/* THE SECTION IS LABELLED "Team", THE ID AND THE URL ARE STILL
          "leadership". That is not an oversight: #/leadership is a published
          address and SECTION_OF in App.jsx maps it here, so renaming the id to
          match the label would break every existing link for the sake of a
          word nobody sees. Rename both together or neither.

          It opens on the team photograph, which is what the About page
          used to spend its own `alt` band on. That band carried a button down
          to the leadership PAGE; on one page it would have scrolled you a few
          hundred pixels, so it is the section's opener instead of a teaser for
          it. */}
      <PageHero
        section
        id="leadership"
        variant="boxed"
        eyebrow={ABOUT.team.eyebrow}
        title="Team"
        image="/images/team-photo.jpg"
        lead={ABOUT.team.statement}
      >
        <div className="phero-cols">
          {ABOUT.team.notes.map((n) => <p key={n.slice(0, 20)}>{n}</p>)}
        </div>
      </PageHero>

      <section className="about-sec about-sec--team">
        <div className="about-sec-inner">
          <TeamGrid />
        </div>
      </section>

      {/* The hand-off to the investment profile closes the page rather than
          interrupting it. It used to sit between Vision & Mission and
          Sustainability, which broke the run of three sections the DAA group
          is made of. */}
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

      <NewsStrip />
      <GetInTouch />
      <Footer />
      <BackToTop />
    </div>
  )
}
