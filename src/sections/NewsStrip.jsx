/* News. Two shapes from one component:

   - `limit` set (the strip on Vision): a lead card plus two followers, the crop
     doing the work so the row reads as an edit rather than equal tiles.
   - `full`: the whole archive, lead card then an even grid. With 22 articles
     the lead-plus-column layout collapses, so the archive uses its own grid.

   Cards link to the article page on this site. They used to bounce the reader
   out to the old WordPress. */
import { ARTICLES } from '../data/articles.js'

function Card({ n, lead }) {
  return (
    <a className={'ncard' + (lead ? ' ncard--lead' : '')} href={'#/news/' + n.id} data-reveal>
      <span className="ncard-media">
        <img src={n.img} alt="" loading="lazy" />
      </span>
      <span className="ncard-body">
        <span className="ncard-meta">{n.kind} &middot; {n.date}</span>
        <span className="ncard-title">{n.title}</span>
        {(lead || !n.compact) && <span className="ncard-stand">{n.standfirst}</span>}
      </span>
    </a>
  )
}

export default function NewsStrip({ limit = 3, full = false, heading = 'News & press releases' }) {
  const items = full ? ARTICLES : ARTICLES.slice(0, limit)
  const [first, ...rest] = items

  return (
    <section className="newsstrip" id="news">
      <div className="newsstrip-head">
        <h2 data-reveal>{heading}</h2>
        {!full && (
          <a className="btn btn--outline" href="#/news">
            <span>All news</span>
            <span className="btn-arrow">&rarr;</span>
          </a>
        )}
        {full && <p className="newsstrip-count">{ARTICLES.length} articles since 2020</p>}
      </div>

      {full ? (
        <>
          <div className="newsstrip-lead">
            <Card n={first} lead />
          </div>
          <div className="newsstrip-archive">
            {rest.map((n) => <Card n={n} key={n.id} />)}
          </div>
        </>
      ) : (
        <div className="newsstrip-grid">
          {items.map((n, i) => <Card n={n} key={n.id} lead={i === 0} />)}
        </div>
      )}

    </section>
  )
}
