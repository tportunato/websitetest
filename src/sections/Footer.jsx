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
            <a href="https://www.daacap.com/news/" target="_blank" rel="noreferrer">News &amp; Insights</a>
          </p>
        </div>
      </div>
      <div className="legal">
        <span>&copy; 2026 DAA Capital Partners SA. For professional investors only.</span>
        <span>
          <a href="https://www.daacap.com/termsofuse/" target="_blank" rel="noreferrer">Terms of Use</a>
          &nbsp;&middot;&nbsp;
          <a href="https://www.daacap.com/privacypolicy/" target="_blank" rel="noreferrer">Privacy Policy</a>
        </span>
      </div>
    </footer>
  )
}
