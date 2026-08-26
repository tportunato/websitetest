/* The firm. Sits directly under the hero video: a quiet, code-drawn backdrop
   (layered radial washes over a hairline corridor grid) so the statement reads
   without competing with the footage above it. Copy supplied by DAA. */
export default function Firm() {
  return (
    <section className="firm" id="firm">
      <div className="firm-bg" aria-hidden="true">
        <span className="firm-grid" />
        <span className="firm-glow firm-glow--a" />
        <span className="firm-glow firm-glow--b" />
        <span className="firm-sheen" />
      </div>

      <div className="firm-inner">
        <p className="eyebrow" data-reveal>The firm</p>
        <div className="firm-cols">
          <p className="firm-lead" data-reveal>
            DAA Capital Partners is a FINMA regulated Swiss-based investment firm
            specializing in logistics real estate across key European corridors.
            We focus on last-mile properties in prime locations, leveraging our
            expertise, global network, and market insights to create long-term value.
          </p>
          <p className="firm-body" data-reveal>
            We enhance asset performance through strategic asset management,
            including refurbishment, repositioning, and ESG-driven upgrades,
            all while meeting evolving tenant needs.
          </p>
        </div>
      </div>
    </section>
  )
}
