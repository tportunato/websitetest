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
          DAA Capital Partners SA is authorised as a portfolio manager within the
          meaning of the Swiss Financial Institutions Act (FinIA) and is subject to
          the prudential supervision of SO-FIT.
        </p>

        {/* PRESCRIBED TEXT - do not paraphrase, shorten or drop.
            SO-FIT's "Conditions d'utilisation de l'image de SO-FIT et de la FINMA"
            (Assujettis version, 31.07.2023) requires that ANY reference to SO-FIT on
            a website carry this sentence. The site says "supervised by SO-FIT" in the
            footer too, so the requirement is live and this paragraph is what answers
            it. The original is French; this is a faithful rendering, kept here
            because the site is English-only. The French reads:
            "SO-FIT est un organisme de surveillance autorise par l'Autorite federale
            suisse de surveillance des marches financiers (FINMA) pour la surveillance
            des gestionnaires de fortune et des trustees au sens des articles 43ss de
            la LEFin".

            TWO THINGS TO PUT TO SO-FIT BEFORE TREATING THIS AS SETTLED:
            1. The site is English-only. Ask whether the French must appear
               verbatim or whether this rendering is accepted.
            2. THE CITATION IN SO-FIT'S OWN TEXT LOOKS WRONG. It says "articles
               43ss de la LEFin", but FinIA art. 43 is "Foreign-controlled
               securities firms" and FinIA contains no supervisory-organisation
               regime at all: FinIA art. 61 defers to FINMASA, and supervisory
               organisations are FINMASA art. 43a. The likely intent is FINMASA
               (LFINMA) 43a et seq., not FinIA. It is reproduced as prescribed
               rather than silently corrected - deviating from a regulator's
               prescribed wording on our own initiative is the worse error - but
               it should be raised, and this comment updated when they answer. */}
        <p className="legalpage-body">
          SO-FIT is a supervisory organisation authorised by the Swiss Financial Market
          Supervisory Authority (FINMA) for the supervision of portfolio managers and
          trustees within the meaning of articles 43 et seq. of the Financial
          Institutions Act (FinIA).
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
