import BgVideo from './BgVideo.jsx'

export default function Work() {
  return (
    <section className="beat" id="assets">
      <div className="stage">
        <BgVideo src="/videos/beat04-facade-dolly.mp4" poster="/videos/beat04-facade-dolly-poster.jpg" />
        <div className="scrim" />
        <div className="beat-content beat-content--right">
          <p className="eyebrow" data-reveal>Asset management</p>
          <h2 data-reveal>We buy well. Then we make assets better.</h2>
          <p className="body" data-reveal>
            Refurbishment, repositioning and ESG-led upgrades: modern docks, solar roofs,
            BREEAM certification and stronger tenant relationships, compounding into resilient income.
          </p>
        </div>
      </div>
    </section>
  )
}
