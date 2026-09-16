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
        </div>
      </div>
    </section>
  )
}
