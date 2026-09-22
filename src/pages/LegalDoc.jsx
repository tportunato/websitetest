/* Terms of Use and Privacy Policy. One template, two routes, same shape as
   #/legal so the three legal documents read as a set.

   They used to be outbound links to daacap.com. The site has to stand on its
   own once WordPress is switched off, so the text lives here. */
import PageBar from '../sections/PageBar.jsx'
import Footer from '../sections/Footer.jsx'
import BackToTop from '../sections/BackToTop.jsx'

export default function LegalDoc({ doc, eyebrow = 'Legal & Regulatory' }) {
  return (
    <div className="page">
      <PageBar title={doc.title} />

      <div className="legalpage">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="legalpage-title">{doc.title}</h1>

        {doc.blocks.map((b, i) =>
          b.t === 'h2'
            ? <h2 className="legalpage-h2" key={i}>{b.v}</h2>
            : <p className="legalpage-body" key={i}>{b.v}</p>
        )}

        <div className="legalpage-links">
          <a href="#/legal">Regulatory information &rarr;</a>
          <a href="#/terms">Terms of Use &rarr;</a>
          <a href="#/privacy">Privacy Policy &rarr;</a>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </div>
  )
}
