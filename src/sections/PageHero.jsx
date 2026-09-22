/* Page hero, two variants, both following axis-re.nl's pattern.

   full   - the image fills the hero behind a large title.
   boxed  - the image stops short of the bottom and a solid panel carries the
            copy underneath it, so the title sits on the image and the argument
            sits on the ground colour. Used on Vision & Mission and
            Sustainability.

   The title is set big and flat. It is the one place on the site where type is
   allowed to be the whole composition.

   `section` makes it an IN-PAGE opener rather than the top of a page: a
   <section> with an id instead of a <header>, and an h2 instead of the h1.
   Vision & Mission, Sustainability and Leadership are sections of the About
   page now, and they each keep the boxed hero they had when they were pages of
   their own. Folding them in as plain text bands was the first attempt and it
   threw that away, so the page read as one long document rather than as the
   three destinations it actually carries. One h1 per page, so the level has to
   move with the tag. */
export default function PageHero({
  variant = 'full', eyebrow, title, lead, image, action, children, section = false, id
}) {
  const Tag = section ? 'section' : 'header'
  const Heading = section ? 'h2' : 'h1'

  return (
    <Tag className={'phero phero--' + variant + (section ? ' phero--section' : '')} id={id}>
      <div className="phero-head">
        {/* The media lives INSIDE the head, not across the whole hero: covering
            the panel too put the lead paragraph on top of a busy photograph. */}
        <div className="phero-media" aria-hidden="true">
          <img src={image} alt="" />
          <span className="phero-veil" />
        </div>

        <div className="phero-head-inner">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <Heading className="phero-title">{title}</Heading>
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
    </Tag>
  )
}
