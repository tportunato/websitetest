/* Get in touch banner. Sits at the foot of every content page.
   Deliberately the loudest thing on the page: an inset plate on the section
   ground, one line of type and one large address button. */
export default function GetInTouch({ note }) {
  return (
    <section className="git" id="get-in-touch">
      <div className="git-plate">
        <div className="git-plate-bg" aria-hidden="true">
          <img src="/images/warehouse-trucks.jpg" alt="" />
        </div>
        <div className="git-row">
          <h2 className="git-title">Get in touch</h2>
          <a className="btn btn--lg btn--solid" href="mailto:info@daacap.com">
            <span>info@daacap.com</span>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="btn-ico">
              <path d="M3 5h18v14H3z" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M3 6l9 7 9-7" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </a>
        </div>
        {note && <p className="git-note">{note}</p>}
      </div>
    </section>
  )
}
