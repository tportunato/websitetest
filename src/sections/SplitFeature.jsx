/* The firm section's layout, reusable: one claim at display size with notes
   demoted under it on the left, a full-height photo panel cropped and feathered
   on the right. The firm section and the future-proof section on the home page
   are deliberate mirrors of each other, so they share this. */
export default function SplitFeature({ id, eyebrow, statement, notes = [], image, flip, children }) {
  return (
    <section className={'firm firm--photo firm--hold split' + (flip ? ' split--flip' : '')} id={id}>
      <div className="firm-bg firm-bg--hold" aria-hidden="true">
        <span className="firm-grain" />
      </div>

      <div className="firm-photo" aria-hidden="true">
        <img src={image} alt="" />
      </div>

      <div className="firm-inner">
        {eyebrow && <p className="eyebrow" data-reveal>{eyebrow}</p>}
        <h2 className="firm-statement" data-reveal>{statement}</h2>
        {notes.length > 0 && (
          <div className="firm-notes">
            {notes.map((n) => <p key={n.slice(0, 20)} data-reveal>{n}</p>)}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
