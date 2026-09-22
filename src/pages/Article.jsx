/* One template for every article, so they all read identically: the tile image
   as the hero, meta rail, standfirst, then the body rendered from typed blocks.
   Adding an article means adding data, never markup.

   These used to link straight out to daacap.com, which dropped the reader onto
   the old WordPress and lost them. */
import PageBar from '../sections/PageBar.jsx'
import GetInTouch from '../sections/GetInTouch.jsx'
import Footer from '../sections/Footer.jsx'
import BackToTop from '../sections/BackToTop.jsx'
import { ARTICLES, getArticle } from '../data/articles.js'

function Block({ b }) {
  if (b.t === 'h2') return <h2 className="art-h2">{b.v}</h2>
  if (b.t === 'h3') return <h3 className="art-h3">{b.v}</h3>
  if (b.t === 'ul') {
    return (
      <ul className="art-ul">
        {b.v.map((li) => <li key={li.slice(0, 28)}>{li}</li>)}
      </ul>
    )
  }
  /* Charts. Only the September update carries any so far; they are the article's
     own figures, downloaded local like everything else. */
  if (b.t === 'img') {
    return (
      <figure className="art-fig">
        <img src={b.v} alt={b.alt || ''} loading="lazy" />
        {b.cap && <figcaption>{b.cap}</figcaption>}
      </figure>
    )
  }
  return <p className="art-p">{b.v}</p>
}

export default function Article({ id }) {
  const a = getArticle(id)

  if (!a) {
    return (
      <div className="page">
        <PageBar title="News" />
        <section className="art-missing">
          <h1>Article not found</h1>
          <a className="btn btn--lg btn--outline" href="#/news">
            <span>Back to news</span>
            <span className="btn-arrow">&rarr;</span>
          </a>
        </section>
        <Footer />
      </div>
    )
  }

  const others = ARTICLES.filter((x) => x.id !== a.id).slice(0, 2)

  return (
    <div className="page">
      <PageBar title={a.title} />

      <article className="art">
        <header className="art-hero">
          <div className="art-hero-media" aria-hidden="true">
            <img src={a.img} alt="" />
            <span className="art-hero-veil" />
          </div>
          <div className="art-hero-inner">
            <p className="art-meta">
              {a.kind}
              {a.period ? ' · ' + a.period : ''}
              {a.date ? ' · ' + a.date : ''}
            </p>
            <h1 className="art-title">{a.title}</h1>
          </div>
        </header>

        <div className="art-body">
          {/* Skipped when the WP excerpt is just a truncation of the opening
              paragraph, which would otherwise print the same sentence twice. */}
          {!a.standDupe && <p className="art-stand">{a.standfirst}</p>}
          {a.author && <p className="art-byline">By {a.author}</p>}
          {a.body.map((b, i) => <Block b={b} key={i} />)}

          <p className="art-source">
            Originally published on{' '}
            <a href={a.link} target="_blank" rel="noreferrer">daacap.com</a>.
          </p>
        </div>
      </article>

      <section className="art-more">
        <div className="art-more-inner">
          <h2 data-reveal>More insights</h2>
          <div className="art-more-grid">
            {others.map((o) => (
              <a className="ncard" key={o.id} href={'#/news/' + o.id}>
                <span className="ncard-media"><img src={o.img} alt="" /></span>
                <span className="ncard-body">
                  <span className="ncard-meta">
                    {o.kind}{o.period ? ' · ' + o.period : ''}
                  </span>
                  <span className="ncard-title">{o.title}</span>
                </span>
              </a>
            ))}
          </div>
          <a className="btn btn--lg btn--outline btn--spaced" href="#/news">
            <span>All news</span>
            <span className="btn-arrow">&rarr;</span>
          </a>
        </div>
      </section>

      <GetInTouch />
      <Footer />
      <BackToTop />
    </div>
  )
}
