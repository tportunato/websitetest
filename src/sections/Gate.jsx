/* Access restriction, DRAFT FOR COUNSEL REVIEW (November 2026).

   Counsel advised that the site should only open to investors domiciled in
   jurisdictions whose cross-border rules allow it, and that Swiss visitors
   should confirm their domicile and their status as qualified investors under
   CISA. This is a working prototype of that screen so the wording and the
   flow can be reviewed on the real site.

   It is OFF unless the URL carries ?gate (e.g. /?gate#/), the same kind of
   hatch as ?bg= on the firm section, so ordinary visitors never see it. To
   make it live, drop the ?gate test in `gateEnabled`.

   Three things are PROVISIONAL and are counsel's to settle:
   - ALLOWED, the jurisdictions that may enter. The list below is a
     placeholder, not advice.
   - every line of wording on the screen;
   - whether an answer is remembered. Today it lasts for this page load only,
     so the screen shows again on a refresh, which is right for a review.

   It REPLACES the site rather than covering it: until a visitor is through,
   nothing else is mounted. That keeps the content out of the page, avoids
   another full-screen overlay (see CLAUDE.md on what an overlay needs to be
   inert), and means the wordmark's arrival veil plays AFTER the gate, as the
   arrival moment it is meant to be, rather than behind it.

   The Terms of Use and Privacy Policy stay reachable from the gate: a visitor
   is asked to accept the Terms, so they must be able to read them first. */
import { useEffect, useState } from 'react'
import Wordmark from './Wordmark.jsx'

export function gateEnabled() {
  return new URLSearchParams(window.location.search).has('gate')
}

/* Routes a visitor can open without passing the gate. */
const OPEN = ['#/terms', '#/privacy']

/* PLACEHOLDER - counsel to confirm. */
const COUNTRIES = [
  'Switzerland',
  'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic',
  'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary',
  'Iceland', 'Ireland', 'Italy', 'Latvia', 'Liechtenstein', 'Lithuania',
  'Luxembourg', 'Malta', 'Netherlands', 'Norway', 'Poland', 'Portugal',
  'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden',
  'United Kingdom', 'United States', 'Other'
]
const BLOCKED = new Set(['United States', 'Other'])

/* Module-level, like the veil's flag in Landing: it survives route changes
   (the gate does not re-ask between pages) but not a reload. */
let passed = false

export default function Gate({ children }) {
  const [hash, setHash] = useState(window.location.hash)
  const [through, setThrough] = useState(passed)
  const [step, setStep] = useState('ask')
  const [country, setCountry] = useState('')
  const [status, setStatus] = useState('')
  const [agreed, setAgreed] = useState(false)

  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (!gateEnabled() || through || OPEN.some((p) => hash.startsWith(p))) {
    return children
  }

  const swiss = country === 'Switzerland'
  const ready = country && status && agreed

  const submit = (e) => {
    e.preventDefault()
    if (!ready) return
    if (BLOCKED.has(country) || status === 'retail') {
      setStep('blocked')
      window.scrollTo(0, 0)
      return
    }
    passed = true
    setThrough(true)
  }

  return (
    <main className="gate">
      <div className="gate-inner">
        <Wordmark mode="none" />
        <p className="gate-draft">Draft for counsel review</p>

        {step === 'blocked' ? (
          <>
            <p className="eyebrow">Important information</p>
            <h1 className="gate-title">This website is not available to you.</h1>
            <p className="gate-body">
              Based on the information you have provided, we are unable to give
              you access to this website. Its content is intended only for
              eligible investors domiciled in jurisdictions where it may lawfully
              be made available.
            </p>
            <button
              type="button"
              className="btn btn--outline gate-btn"
              onClick={() => { setStep('ask'); setAgreed(false) }}
            >
              Change my answers
            </button>
          </>
        ) : (
          <form onSubmit={submit}>
            <p className="eyebrow">Important information</p>
            <h1 className="gate-title">Before you enter</h1>
            <p className="gate-body">
              The information on this website is intended only for eligible
              investors domiciled in jurisdictions where it may lawfully be made
              available. It does not constitute an offer or a solicitation.
              Please confirm where you are domiciled and your investor status.
            </p>

            <label className="field gate-field">
              <span className="field-label">Country of domicile</span>
              <select
                value={country}
                onChange={(e) => { setCountry(e.target.value); setStatus('') }}
                required
              >
                <option value="" disabled>Select a country</option>
                {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>

            {country && (
              <fieldset className="gate-field gate-status">
                <legend className="field-label">Investor status</legend>
                <label className="gate-choice">
                  <input
                    type="radio"
                    name="status"
                    value="eligible"
                    checked={status === 'eligible'}
                    onChange={() => setStatus('eligible')}
                  />
                  <span>
                    {swiss
                      ? 'I am a qualified investor within the meaning of the Collective Investment Schemes Act (CISA), being an institutional or professional client.'
                      : 'I do not qualify as a retail investor in my home jurisdiction, and my access to this website does not give rise to a duty to register or obtain an authorisation there.'}
                  </span>
                </label>
                <label className="gate-choice">
                  <input
                    type="radio"
                    name="status"
                    value="retail"
                    checked={status === 'retail'}
                    onChange={() => setStatus('retail')}
                  />
                  <span>
                    {swiss
                      ? 'I am a private client and not a qualified investor.'
                      : 'I am a retail investor in my home jurisdiction.'}
                  </span>
                </label>
              </fieldset>
            )}

            <label className="gate-choice gate-agree">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>
                I confirm that the information above is correct and that I have
                read, understood and accept the{' '}
                <a href="#/terms">Terms of Use</a>.
              </span>
            </label>

            <button type="submit" className="btn btn--solid gate-btn" disabled={!ready}>
              Enter <span className="btn-arrow">&rarr;</span>
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
