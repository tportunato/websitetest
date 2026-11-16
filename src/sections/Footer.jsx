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
          {/* Was "Investors", over an Investor Login link to a portal that no
              longer answers. The link is gone site-wide; the heading went with
              it because what is left is not investor-specific. */}
          <h3>More</h3>
          <p>
            <a href="https://daaventures.com" target="_blank" rel="noreferrer">DAA Ventures</a><br />
            <a href="#/news">News &amp; Insights</a>
          </p>
        </div>
      </div>
      {/* The FULL regulatory wording, on every page. There is no separate Legal &
          Regulatory page any more: it was removed at the partners' request and
          its exact text moved here.

          The second sentence is PRESCRIBED - do not paraphrase, shorten or drop
          it. SO-FIT's "Conditions d'utilisation de l'image de SO-FIT et de la
          FINMA" (Assujettis, 31.07.2023) require ANY reference to SO-FIT on a
          website to carry it. Because the first sentence names SO-FIT on every
          page, the second must sit beside it on every page, which is exactly
          what this does - it meets the stricter, per-page reading of the rule.
          Do not keep the first sentence and drop the second.

          The original is French; this is a faithful rendering, which the client
          confirmed is acceptable. The French reads: "SO-FIT est un organisme de
          surveillance autorise par l'Autorite federale suisse de surveillance des
          marches financiers (FINMA) pour la surveillance des gestionnaires de
          fortune et des trustees au sens des articles 43ss de la LEFin".

          THE CITATION IN SO-FIT'S OWN TEXT LOOKS WRONG: FinIA art. 43 is
          "Foreign-controlled securities firms"; supervisory organisations are
          FINMASA art. 43a (FinIA art. 61 defers to FINMASA). It is reproduced as
          prescribed rather than corrected on our own initiative; a query to
          SO-FIT is pending. Update this when they answer.

          Still not a selling point: footer type, footer weight, never larger and
          never styled as a badge. */}
      <p className="regstatus">
        DAA Capital Partners SA is authorised as a portfolio manager within the
        meaning of the Swiss Financial Institutions Act (FinIA) and is subject to
        the prudential supervision of SO-FIT. SO-FIT is a supervisory organisation
        authorised by the Swiss Financial Market Supervisory Authority (FINMA) for
        the supervision of portfolio managers and trustees within the meaning of
        articles 43 et seq. of the Financial Institutions Act (FinIA).
      </p>

      <div className="legal">
        <span>&copy; 2026 DAA Capital Partners SA. For professional investors only.</span>
        <span>
          <a href="#/terms">Terms of Use</a>
          &nbsp;&middot;&nbsp;
          <a href="#/privacy">Privacy Policy</a>
        </span>
      </div>
    </footer>
  )
}
