/* News & press releases. Bolder than the strip: a full-bleed title over the
   dock photograph, then every article at card size. */
import Footer from '../sections/Footer.jsx'
import PageBar from '../sections/PageBar.jsx'
import PageHero from '../sections/PageHero.jsx'
import NewsStrip from '../sections/NewsStrip.jsx'
import GetInTouch from '../sections/GetInTouch.jsx'
import BackToTop from '../sections/BackToTop.jsx'

export default function News() {
  return (
    <div className="page">
      <PageBar title="News" />

      <PageHero
        variant="full"
        eyebrow="DAA Capital Partners"
        title={<>News &amp;<br />press releases</>}
        image="/images/news-hero.jpg"
        lead="Market commentary and transaction announcements from the firm."
      />

      <NewsStrip full heading="Latest" />
      <GetInTouch />
      <Footer />
      <BackToTop />
    </div>
  )
}
