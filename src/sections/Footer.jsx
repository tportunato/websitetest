export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <h2 data-reveal>Contact us</h2>
      <div className="footer-grid">
        <div data-reveal>
          <h3>Geneva</h3>
          <p>
            DAA Capital Partners SA<br />
            Rue de la P&eacute;lisserie 16<br />
            CH-1204 Geneva, Switzerland<br />
            +41 22 344 22 00<br />
            <a href="mailto:info@daacap.com">info@daacap.com</a>
          </p>
          <p className="coords">46.2023&deg; N &middot; 6.1459&deg; E</p>
        </div>
        <div data-reveal>
          <h3>Luxembourg</h3>
          <p>
            Clareville Partners Luxembourg S&agrave;rl<br />
            1B, rue Jean Piret<br />
            L-2350 Luxembourg<br />
            +352 45 12 32 32
          </p>
        </div>
        <div data-reveal>
          <h3>Investors</h3>
          <p>
            <a href="https://daacap.my.site.com/Investor" target="_blank" rel="noreferrer">Investor Login</a><br />
            <a href="https://daaventures.com" target="_blank" rel="noreferrer">DAA Ventures</a><br />
            <a href="#/news">News &amp; Insights</a>
          </p>
        </div>
      </div>
      {/* Regulatory status, stated once and quietly. It is not a selling point
          and must never be set as one; the full wording is on #/legal.

          SO-FIT IS DELIBERATELY NOT NAMED HERE. Its "Conditions d'utilisation de
          l'image de SO-FIT et de la FINMA" (Assujettis, 31.07.2023) require that
          a reference to SO-FIT on a website carry a prescribed sentence saying
          what SO-FIT is. Whether that binds the site once or every page that
          names it is ambiguous in their wording - so the reference lives in one
          place only, on #/legal, with the prescribed sentence beside it, and the
          ambiguity stops applying. The alternative was 35 words about SO-FIT in
          the footer of every page, which is the opposite of stating this
          quietly. Do not add "supervised by SO-FIT" back here without bringing
          the prescribed sentence with it. */}
      <p className="regstatus">
        DAA Capital Partners SA is authorised by FINMA as a portfolio manager
        under the Financial Institutions Act (FinIA).
      </p>

      <div className="legal">
        <span>&copy; 2026 DAA Capital Partners SA. For professional investors only.</span>
        <span>
          <a href="#/legal">Legal &amp; Regulatory</a>
          &nbsp;&middot;&nbsp;
          <a href="#/terms">Terms of Use</a>
          &nbsp;&middot;&nbsp;
          <a href="#/privacy">Privacy Policy</a>
        </span>
      </div>
    </footer>
  )
}
