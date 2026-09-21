/* Contact page. Offices, phones and email are the real ones already carried in
   the site footer (taken from daacap.com). The form posts nowhere yet: there is
   no backend on this deploy, so it opens a pre-filled mail draft to
   info@daacap.com instead of silently swallowing the message. Swap in a form
   endpoint (Formspree, Vercel function, HubSpot) when one exists. */
import Wordmark from '../sections/Wordmark.jsx'
import BackToTop from '../sections/BackToTop.jsx'
import { useState } from 'react'

const OFFICES = [
  {
    id: 'geneva',
    city: 'Geneva',
    role: 'Head office',
    entity: 'DAA Capital Partners SA',
    lines: ['Rue de la Pélisserie 16', 'CH-1204 Geneva, Switzerland'],
    phone: '+41 22 344 22 00',
    tel: '+41223442200',
    coords: '46.2044° N · 6.1489° E'
  },
  {
    id: 'luxembourg',
    city: 'Luxembourg',
    role: 'Fund administration',
    entity: 'Clareville Partners Luxembourg Sàrl',
    lines: ['1B, rue Jean Piret', 'L-2350 Luxembourg'],
    phone: '+352 45 12 32 32',
    tel: '+35245123232',
    coords: '49.5951° N · 6.1296° E'
  }
]

const SUBJECTS = [
  'Investor relations',
  'An asset or an off-market opportunity',
  'Media or general enquiry'
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    subject: SUBJECTS[0],
    message: ''
  })

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const body = [
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      `Email: ${form.email}`,
      '',
      form.message
    ].join('\n')
    window.location.href =
      'mailto:info@daacap.com' +
      '?subject=' + encodeURIComponent(form.subject) +
      '&body=' + encodeURIComponent(body)
  }

  return (
    <div className="page-contact">
      <header className="page-bar">
        <a className="page-home" href="#/">
          <Wordmark mode="mount" duration={1100} />
        </a>
        <div className="page-title">Contact</div>
        <a className="login" href="https://daacap.my.site.com/Investor" target="_blank" rel="noreferrer">
          Investor Login
        </a>
      </header>

      <div className="contact-wrap">
        <p className="eyebrow">Contact</p>
        <h1 className="contact-h1">Talk to us.</h1>
        <p className="contact-intro">
          For investor enquiries, off-market opportunities in the &euro;5m to &euro;50m
          segment, or anything else &mdash; reach the Geneva office directly, or send a
          note and the right person will come back to you.
        </p>

        <div className="contact-grid">
          <div className="contact-offices">
            {OFFICES.map((o) => (
              <div className="office-card" key={o.id}>
                <p className="office-role">{o.role}</p>
                <h2 className="office-city">{o.city}</h2>
                <p className="office-entity">{o.entity}</p>
                <p className="office-address">
                  {o.lines.map((l) => (
                    <span key={l}>{l}<br /></span>
                  ))}
                </p>
                <p className="office-contact">
                  <a href={`tel:${o.tel}`}>{o.phone}</a>
                  {o.id === 'geneva' && (
                    <>
                      <br />
                      <a href="mailto:info@daacap.com">info@daacap.com</a>
                    </>
                  )}
                </p>
                <p className="coords">{o.coords}</p>
              </div>
            ))}

            <div className="office-card office-card--quiet">
              <p className="office-role">Existing investors</p>
              <p className="office-address">
                Reporting, capital accounts and fund documents are in the investor portal.
              </p>
              <p className="office-contact">
                <a href="https://daacap.my.site.com/Investor" target="_blank" rel="noreferrer">
                  Investor Login &rarr;
                </a>
              </p>
            </div>
          </div>

          <form className="contact-form" onSubmit={submit}>
            <label className="field">
              <span className="field-label">Name</span>
              <input type="text" required value={form.name} onChange={set('name')} />
            </label>
            <label className="field">
              <span className="field-label">Company</span>
              <input type="text" value={form.company} onChange={set('company')} />
            </label>
            <label className="field">
              <span className="field-label">Email</span>
              <input type="email" required value={form.email} onChange={set('email')} />
            </label>
            <label className="field">
              <span className="field-label">Subject</span>
              <select value={form.subject} onChange={set('subject')}>
                {SUBJECTS.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span className="field-label">Message</span>
              <textarea rows={6} required value={form.message} onChange={set('message')} />
            </label>
            <button className="contact-send" type="submit">
              Send <span className="cta-arrow">&rarr;</span>
            </button>
            <p className="form-note">
              This opens a message to info@daacap.com in your mail client.
            </p>
          </form>
        </div>

        <div className="page-foot">
          <span>&copy; 2026 DAA Capital Partners SA. For professional investors only.</span>
        </div>
      </div>
      <BackToTop />
    </div>
  )
}
