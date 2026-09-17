/* Page hero, two variants, both following axis-re.nl's pattern.

   full   - the image fills the hero behind a large title.
   boxed  - the image stops short of the bottom and a solid panel carries the
            copy underneath it, so the title sits on the image and the argument
            sits on the ground colour. Used on Vision & Mission and
            Sustainability.

   The title is set big and flat. It is the one place on the site where type is
   allowed to be the whole composition. */
export default function PageHero({ variant = 'full', eyebrow, title, lead, image, action, children }) {
  return (
    <header className={'phero phero--' + variant}>
      <div className="phero-head">
        {/* The media lives INSIDE the head, not across the whole hero: covering
            the panel too put the lead paragraph on top of a busy photograph. */}
        <div className="phero-media" aria-hidden="true">
          <img src={image} alt="" />
          <span className="phero-veil" />
        </div>

        <div className="phero-head-inner">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="phero-title">{title}</h1>
        </div>
      </div>

      {(lead || children || action) && (
        <div className="phero-panel">
          <div className="phero-panel-inner">
            {(lead || action) && (
              <div className={'phero-leadrow' + (action ? ' phero-leadrow--split' : '')}>
                {lead && <p className="phero-lead">{lead}</p>}
                {action}
              </div>
            )}
            {children}
          </div>
        </div>
      )}
    </header>
  )
}
