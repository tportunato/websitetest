import BgVideo from './BgVideo.jsx'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <BgVideo src="/videos/beat01-city-vans.mp4" poster="/videos/beat01-city-vans-poster.jpg" eager />
      <div className="scrim" />
      <div className="hero-content">
        <p className="eyebrow" data-reveal>European urban logistics real estate</p>
        <h1 data-reveal>Europe&rsquo;s cities run on goods moving closer to people.</h1>
        <p className="sub" data-reveal>
          DAA Capital Partners invests in the last-mile logistics assets that keep them moving.
        </p>
      </div>
      <div className="scroll-cue">Scroll</div>
    </section>
  )
}
