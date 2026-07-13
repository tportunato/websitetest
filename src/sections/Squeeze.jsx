import BgVideo from './BgVideo.jsx'

export default function Squeeze() {
  return (
    <section className="beat" id="market">
      <div className="stage">
        <BgVideo src="/videos/beat02-warehouse-timelapse.mp4" poster="/videos/beat02-warehouse-timelapse-poster.jpg" />
        <div className="scrim" />
        <div className="beat-content">
          <p className="eyebrow" data-reveal>The market</p>
          <h2 data-reveal>Demand keeps rising. The land it needs does not.</h2>
          <p className="body" data-reveal>
            Last-mile demand compounds while first-ring industrial land is absorbed by housing.
            The result is a structural supply shortfall across Western Europe&rsquo;s main corridors.
          </p>
          <div className="stat" data-reveal>
            <span className="stat-num">&minus;35%</span>
            <span className="stat-label">logistics completions, 2022&ndash;2025 (CBRE)</span>
            <span className="badge">Placeholder &middot; verify before publication</span>
          </div>
        </div>
      </div>
    </section>
  )
}
