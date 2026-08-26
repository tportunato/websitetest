/* News & insights. Replaces the old Proof / track-record beat: real published
   articles instead of placeholder counters. Data in src/data/news.js. */
import { NEWS, NEWS_INDEX } from '../data/news.js'

export default function News() {
  return (
    <section className="news" id="news">
      <div className="news-head">
        <div>
          <p className="eyebrow" data-reveal>News &amp; insights</p>
          <h2 data-reveal>See our latest articles.</h2>
        </div>
        <a className="news-all" data-reveal href={NEWS_INDEX} target="_blank" rel="noreferrer">
          All articles <span className="cta-arrow">&rarr;</span>
        </a>
      </div>

      <div className="news-grid">
        {NEWS.map((n) => (
          <a
            className="news-card"
            key={n.id}
            href={n.link}
            target="_blank"
            rel="noreferrer"
            data-reveal
          >
            <span className="news-meta">
              <span className="news-kind">{n.kind}</span>
              {n.period && <span className="news-period">{n.period}</span>}
            </span>
            <h3 className="news-title">{n.title}</h3>
            <p className="news-standfirst">{n.standfirst}</p>
            <span className="news-read">
              Read <span className="cta-arrow">&rarr;</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
