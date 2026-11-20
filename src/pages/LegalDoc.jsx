/* Terms of Use and Privacy Policy. One template, two routes, so the two legal
   documents read as a set. (There was a third, #/legal; its regulatory wording
   now lives in the footer of every page.)

   They used to be outbound links to daacap.com. The site has to stand on its
   own once WordPress is switched off, so the text lives here. */
import PageBar from '../sections/PageBar.jsx'
import Footer from '../sections/Footer.jsx'
import BackToTop from '../sections/BackToTop.jsx'

export default function LegalDoc({ doc, eyebrow = 'Legal' }) {
  return (
    <div className="page">
      <PageBar title={doc.title} />

      <div className="legalpage">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="legalpage-title">{doc.title}</h1>

        {doc.blocks.map((b, i) => {
          if (b.t === 'h2') return <h2 className="legalpage-h2" key={i}>{b.v}</h2>
          /* A list item is [term, definition]: the risk list in the Terms
             names each risk, then says what it is. */
          if (b.t === 'ul') {
            return (
              <ul className="legalpage-list" key={i}>
                {b.v.map(([term, def]) => (
                  <li key={term}><strong>{term}:</strong> {def}</li>
                ))}
              </ul>
            )
          }
          return <p className="legalpage-body" key={i}>{b.v}</p>
        })}

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
