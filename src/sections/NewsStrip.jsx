/* News strip. Cards are image-led with the crop doing the work: the first card
   is tall and the rest are wide, so the row reads as an edit rather than a grid
   of equal tiles. Cards link to the article page on this site; they used to
   bounce the reader out to the old WordPress. */
import { ARTICLES, ARTICLE_INDEX } from '../data/articles.js'

export default function NewsStrip({ limit = 3, heading = 'News & press releases' }) {
  const items = ARTICLES.slice(0, limit)
  return (
    <section className="newsstrip" id="news">
      <div className="newsstrip-head">
        <h2 data-reveal>{heading}</h2>
        <a className="btn btn--outline" href="#/news">
          <span>All news</span>
          <span className="btn-arrow">&rarr;</span>
        </a>
      </div>

      <div className="newsstrip-grid">
        {items.map((n, i) => (
          <a
            className={'ncard' + (i === 0 ? ' ncard--lead' : '')}
            key={n.id}
            href={'#/news/' + n.id}
            data-reveal
          >
            <span className="ncard-media">
              <img src={n.img} alt="" />
            </span>
            <span className="ncard-body">
              <span className="ncard-meta">
                {n.kind}
                {n.period ? ' · ' + n.period : ''}
              </span>
              <span className="ncard-title">{n.title}</span>
              <span className="ncard-stand">{n.standfirst}</span>
            </span>
          </a>
        ))}
      </div>

      <a className="newsstrip-src" href={ARTICLE_INDEX} target="_blank" rel="noreferrer">
        daacap.com/news &rarr;
      </a>
    </section>
  )
}
