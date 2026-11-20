/* Terms of Use and Privacy Policy, reproduced verbatim from daacap.com on
   2026-09-22 so the site can stand on its own when WordPress is switched off.

   ONE DEPARTURE FROM VERBATIM: the Privacy Policy's "Cookies Policy" section
   was removed in November 2026 at the client's instruction. It said the site
   uses cookies and fed Google Analytics, which described the old WordPress
   site; this one sets no cookies and runs no analytics. If either is ever
   added, the policy has to say so again before it goes live.
   The footer used to link out to both; now they are routes here.

   These are NOT the regulatory statement (in the footer) and NOT the full investor
   disclaimer. See CLAUDE.md: three separate documents, deliberately kept
   apart. */

export const TERMS = {
  title: 'Terms of Use',
  blocks: [
    { t: 'p', v: 'This website is for information purposes only and is not intended to be relied upon as a forecast, research or tax, accounting, regulatory, legal, insurance or investment advice. The information on this website does not constitute a recommendation, offer, or solicitation to adopt any investment strategy and readers thereof should consult their legal and/or financial advisers before concluding any transaction on the basis of the information contained herein.' },
    { t: 'p', v: 'Although this website is based upon information that DAA Capital Partners SA considers reliable and endeavor to keep current, DAA Capital Partners SA does not assure that this information is accurate, current, or complete, and it should not be relied upon as such. The information on this website does not constitute an offer or solicitation for any services or products in any jurisdiction in which such offer or solicitation is not authorized. Any entity or person should make its own assessment in light of the laws and regulations applicable to it as to whether it is authorized to access the information and/or products to which this website may refer and otherwise refrain from doing so. The investments and strategies discussed in the website may not be suitable for all investors.' },
    { t: 'p', v: 'DAA Capital Partners SA makes no representations that the contents are appropriate for use in all jurisdictions or countries, or by all investors or counterparties. By making available information on the website, DAA Capital Partners SA does not represent that any investment or strategy is available or suitable for any particular user. All persons and entities accessing the website do so on their own initiative and are responsible for compliance with applicable local laws and regulations.' },
    { t: 'p', v: 'DAA Capital Partners SA shall in no event be liable for any damages arising out of or in connection with the reliance on the information contained on this website. Decisions based on information contained on this website are the sole responsibility of the visitor. In exchange for using this website, the visitor agrees to indemnify and hold DAA Capital Partners SA, their officers, directors, employees, affiliates, agents, licensors, and suppliers harmless against any and all claims, losses, liability, costs, and expenses (including but not limited to attorneys’ fees) arising from the use of this website or from any decisions that the visitor makes based on such information.' },

    /* Everything below was added in November 2026 on counsel's advice. It is
       the information art. 8 para. 1 FinSA requires a financial services
       provider to give its clients (name and address, field of activity and
       supervision, ombudsman, general risks), plus a statement of who the firm
       deals with and the governing law. Reproduced as counsel wrote it, with
       three typos corrected ("which means", "Partners", one "It" made "This
       website" because it followed a sentence about SO-FIT).

       "articles 43 et seq. of the Financial Institutions Act" is the same
       citation SO-FIT's prescribed sentence uses, and it looks wrong for the
       same reason (supervisory organisations are FINMASA art. 43a). Kept as
       written; the question is with counsel and SO-FIT.

       THE OMBUDSMAN BLOCK IS NOT FILLED IN. The firm has to say which
       ombudsman it is affiliated with. Do not publish to main with the
       bracketed placeholders still in it. */
    { t: 'h2', v: 'Eligible investors' },
    { t: 'p', v: 'DAA Capital Partners SA only deals with eligible investors, which means any investor who does not qualify as a retail investor in its home jurisdiction and whose investments do not give rise to a duty to register or obtain an authorisation in its home jurisdiction. In Switzerland, DAA Capital Partners SA only deals with institutional and professional clients and qualified investors.' },

    { t: 'h2', v: 'Publisher and supervision' },
    { t: 'p', v: 'This website is published by DAA Capital Partners SA, with registered office at 16 rue de la P\u00e9lisserie, 1204 Geneva, Switzerland, a portfolio manager within the meaning of the Swiss Financial Institutions Act (FinIA) and subject to the prudential supervision of SO-FIT. SO-FIT is a supervisory organisation authorised by the Swiss Financial Market Supervisory Authority (FINMA) for the supervision of portfolio managers and trustees within the meaning of articles 43 et seq. of the Financial Institutions Act (FinIA). This website is intended only for eligible investors who are domiciled in Switzerland or in jurisdictions where its content may be lawfully made available.' },

    { t: 'h2', v: 'Ombudsman' },
    { t: 'p', v: 'DAA Capital Partners SA is affiliated with the following ombudsman under Art. 74 et seq. FinSA: [Name of ombudsman], [Address], [Phone] \u2013 [Email] \u2013 [Website].' },
    { t: 'p', v: 'If a client has a dispute about a financial service provided by DAA Capital Partners SA, the client may start mediation proceedings before this ombudsman. The client must first have submitted the complaint to DAA Capital Partners SA in writing and given it the opportunity to respond.' },

    { t: 'h2', v: 'General risks associated with financial instruments' },
    { t: 'p', v: 'Any investment in financial instruments involves risks. They may lead to losses, up to the total loss of the capital invested and, for some instruments, beyond it. The value of an investment can fall as well as rise, and past performance is no indication of future results. The main risks include:' },
    { t: 'ul', v: [
      ['Market risk', 'price changes caused by developments in the markets, interest rates or the economy.'],
      ['Credit and issuer risk', 'insolvency or a deterioration in the creditworthiness of the issuer or of a counterparty.'],
      ['Liquidity risk', 'inability to sell an investment quickly or at a reasonable price. This risk is higher for unlisted or alternative investments.'],
      ['Currency risk', 'exchange-rate movements for investments denominated in a currency other than the reference currency.'],
      ['Concentration risk', 'insufficient diversification of the portfolio.'],
      ['Leverage and derivatives risk', 'amplified losses and margin calls.'],
      ['Legal, political, tax and regulatory risks', 'especially for investments abroad.'],
      ['Operational and sustainability risks', 'failure of systems or third parties, and environmental, social and governance (ESG) factors.']
    ] },
    { t: 'p', v: 'The Swiss Bankers Association brochure \u201cRisks Involved in Trading Financial Instruments\u201d describes these risks and the features of the main financial instruments in detail.' },

    { t: 'h2', v: 'Acceptance and governing law' },
    { t: 'p', v: 'By accessing this website, you confirm that you have read, understood and accepted this information. This website and this legal information are governed by Swiss law. The courts of Geneva have exclusive jurisdiction.' },
  ]
}

export const PRIVACY = {
  title: 'Privacy Policy',
  blocks: [
    { t: 'p', v: 'By browsing further on this website, you consent to the Privacy Policy as described below. We may, at any time, revise this policy by updating this page. Every time you wish to use our website, please check this policy to ensure that you understand the terms that apply at that time. As you navigate our website, our server automatically registers information relating to your visit such as the IP address, the referring website, the type of browser used, as well as your navigation history on the website including the date and time of your visit. DAA Capital Partners SA does not use this information to identify any particular person and does not disclose it. Our website may contain links to other websites and resources that are not operated by us. These hyperlinks are provided for your reference and convenience only and do not imply any endorsement of the activities of such third-party websites or any association with their operators.' },
  ]
}
