/* Full article bodies, reproduced from DAA's own published pieces on
   daacap.com so the articles can be read on this site instead of bouncing the
   reader out to the old WordPress. REAL: the text, headings, figures, dates and
   authors are the firm's own, fetched on 2026-09-17. Every third-party figure
   carries the attribution the article itself gives it (CBRE, Savills, JLL,
   AEW, Barclays, Colliers).

   `img` on each is a PLACEHOLDER from public/images with no relationship to the
   article. Swap for real artwork before this goes live.

   Block types: h2, h3, p, ul. One renderer handles all of them, so every
   article page comes out on the same template. */

export const ARTICLES = [
  {
    id: 'sept-2025-update',
    kind: 'Insight',
    period: 'September 2025',
    date: '10 September 2025',
    author: null,
    title: 'European Logistics Real Estate: September 2025 Update',
    standfirst:
      'Sentiment was cautious in H1 2025 as trade and tariff headlines weighed on leasing conversion. Even so, a thinner development pipeline and firm prime rents point to clear leasing upside as visibility improves.',
    img: '/images/news-hero.jpg',
    link: 'https://www.daacap.com/european-logistics-real-estate-september-2025-update/',
    body: [
      { t: 'h2', v: 'What is slowing decisions: sentiment over fundamentals' },
      { t: 'p', v: 'In European logistics, the direct tariff hit looks limited; confidence is the swing factor. With roughly two-thirds of occupier demand tied to retail, softer consumer and business sentiment slows conversions even when the operational case is strong.' },
      { t: 'p', v: 'Developers and owners report clients returning to discuss strategic investments, with conversations focused more on economic recovery than on tariffs. Many portfolios are geared to inward European consumption, which is less tariff-sensitive; uncertainty still protracts decisions, but it is not derailing plans.' },
      { t: 'p', v: 'Medium-term demand drivers remain intact, with 95% of occupiers surveyed by CBRE intending to launch more or similar requirements over the next 12 months, and 46% planning to expand footprints over three years, despite near-term uncertainty. Enquiries and viewings picked up in Q2, but this has yet to show in take-up.' },

      { t: 'h2', v: 'A recalibration period: structural drivers intact' },
      { t: 'p', v: 'Across Europe, tenants are taking longer, seeking flexibility and deferring capex, but demand for well-located, modern space remains firm. For prime assets, landlords still hold pricing power as obsolescence drives a flight to quality, deepening the two-tier market.' },
      { t: 'p', v: 'Longer-term demand continues to be anchored by structural drivers: continuing e-commerce growth, which lifts service expectations and expands the need for urban fulfilment, returns and parcel hubs; omnichannel and supply-chain optimisation, with retailers shifting inventory closer to customers to cut transport and failed-delivery costs; and a knock-on uplift from nearshoring and defence, as light manufacturing and suppliers move nearer to end-markets.' },
      { t: 'p', v: 'Together, these forces reinforce demand for modern, urban-adjacent, high-throughput space and keep the medium-term outlook intact despite short-term sentiment noise.' },

      { t: 'h2', v: 'Contracting pipelines set the floor' },
      { t: 'p', v: 'Supply is doing the quiet work. Logistics completions have fallen back to 2017 levels, a 35% drop between 2022 and 2025, with speculative development down to around 40%. Analysts expect vacancy to trend down through year-end as the pipeline tightens. That is consistent with a market in recalibration, not retreat. Prime rents are broadly stable; CBRE’s index shows c.3.1% annualised prime rental growth in Q2 2025.' },

      { t: 'h2', v: 'A V-shaped snap-back is on the cards' },
      { t: 'p', v: 'A V-shaped acceleration in take-up is plausible once visibility improves, as flagged by Savills, which uses the UK post-Brexit take-up snap-back as an analogue. Today’s tariff-related uncertainty is creating a similar pause-then-pounce dynamic.' },

      { t: 'h2', v: 'Capital flows are returning' },
      { t: 'p', v: 'European industrial and logistics investment rose 4% year on year in H1 2025 to EUR 17.4bn, with Q2 up 7% to EUR 8.8bn, keeping the sector at around 18% of European commercial real estate. Over the last 12 months capital reached roughly EUR 41.6bn, with around 68% sourced within Europe; cross-border investment rose 16% and North American inflows 38%, underlining widening international appetite.' },
      { t: 'p', v: 'Within our focus markets, Italy was among the standouts at +72% year on year in H1. Germany tallied around EUR 2.6bn in H1, down 14%; France around EUR 0.7bn, up 1%; and Benelux was down 25% in H1 but improved into Q2.' },

      { t: 'h2', v: 'Bottom line' },
      { t: 'p', v: 'Post recalibration, and with supply tightening, rents steady, capital refocusing on core and enquiry pipelines set to convert, the sector is positioned for acceleration, potentially V-shaped, as visibility improves and economic growth picks up.' },

      { t: 'h2', v: 'By the numbers, Q2 2025' },
      { t: 'ul', v: [
        'Take-up: c.20.6m sqm on a rolling 12-month basis, down 3.8% in Q2, still c.9% above the pre-pandemic average.',
        'Vacancy: c.5.4% on average across Europe.',
        'Completions: back to 2017 levels, down to c.40% speculative.',
        'Rents: prime rents broadly stable; CBRE’s index c.3.1% annualised in Q2 2025.'
      ] },

      { t: 'h2', v: 'What to watch next' },
      { t: 'ul', v: [
        'Conversions: Q3 and Q4 take-up from the Q2 enquiry pipeline.',
        'Vacancy and supply: quarter-on-quarter vacancy change versus completions and net absorption.',
        'Pricing: prime yields in core markets.'
      ] }
    ]
  },

  {
    id: 'q2-2025-outlook',
    kind: 'Insight',
    period: 'Q2 2025',
    date: '2 June 2025',
    author: null,
    title: 'European Logistics Real Estate: Q2 2025 Update and Outlook',
    standfirst:
      'Cautious optimism tempered by policy uncertainty. Development has stalled while capital rotates back into urban logistics, and a faster demand rebound in 2026-27 would meet a thin pipeline.',
    img: '/images/investment-hero.jpg',
    link: 'https://www.daacap.com/european-logistics-real-estate-q2-2025-update-and-outlook/',
    body: [
      { t: 'h2', v: 'Macro landscape and policy backdrop' },
      { t: 'p', v: 'As of Q2 2025, the European macro environment is marked by cautious optimism tempered by persistent policy and geopolitical uncertainty. Rising trade tensions have reintroduced volatility and clouded the global growth outlook.' },
      { t: 'p', v: 'While the base case assumes moderate tariffs with a limited impact on GDP, the risk of a downside scenario, characterised by slower growth, higher inflation and sustained uncertainty, is increasing. Such conditions could weigh on cyclical sectors, including industrial real estate, which is sensitive to fluctuations in global trade and manufacturing output.' },
      { t: 'p', v: 'However, monetary and fiscal support is helping cushion the economy. The ECB cut its deposit rate for the seventh time, to 2.25% in April 2025, with further reductions anticipated by year-end. Fiscal policy across the eurozone has turned more expansionary, exemplified by Germany’s suspension of its constitutional debt brake to fund infrastructure and defence initiatives. These measures, along with resilient labour markets and modest real wage growth, could help stabilise domestic demand across the region.' },
      { t: 'p', v: 'In this context, logistics real estate, particularly in markets driven by domestic consumption, continues to show resilience, supported by tight urban supply, ESG-driven demand and e-commerce tailwinds. Listed European industrial REITs, often a leading indicator, have largely rebounded from earlier corrections.' },

      { t: 'h2', v: 'Western European logistics: Q1 2025 snapshot' },
      { t: 'p', v: 'The sector exhibited signs of stabilisation in Q1 2025. While occupier take-up remains below long-term averages, leasing activity rebounded slightly from 2024 lows. Take-up across Europe rose 2% year on year, although still 21% below the 10-year average. Vacancy rates stabilised around 5%, reflecting both weak completions and resilient demand for grade A stock.' },
      { t: 'p', v: 'Spain led growth, with take-up exceeding its 10-year average by 50%. Italy and France showed strength in core nodes such as Milan and Paris, while Germany recorded modest but improving absorption. The Netherlands saw subdued activity driven by cautious occupier sentiment, though limited new supply sustains rental growth for prime, well-located modern assets.' },

      { t: 'h2', v: 'Structural trends and investment landscape' },
      { t: 'h3', v: 'Supply and demand' },
      { t: 'p', v: 'In response to the surge in Covid-related demand during 2021-22, developers increased supply. Demand has declined since, and vacancy has risen from a record low of c.2.5% on average in 2022 to over 5%.' },
      { t: 'p', v: 'On the supply side, development remains subdued, with completions forecast to drop 32%. As of late 2024, only 4.3% of total logistics stock was under construction, well below the five-year average of 6.7% (Barclays), as reduced profitability has made development less attractive. European REITs such as WDP and Montea have indicated a shift in focus to acquisitions, securing portfolios at around 6% yields, with development returns having halved.' },
      { t: 'p', v: 'Looking ahead, new supply and demand are expected to be more balanced. However, if demand rebounds faster than anticipated in 2026-27, the limited development pipeline could lead to a pronounced supply squeeze.' },

      { t: 'h3', v: 'Capital flows and performance' },
      { t: 'p', v: 'Modest yield compression is returning across markets, driven primarily by stabilising interest rates and pricing now in fair territory. The trough in European real estate capital values seems to have passed, with urban logistics now the second most sought-after property sector after residential, driven by its defensive cash flow profile and structural tailwinds. France recorded EUR 3.4bn in logistics investment in Q1 2025, up 67% year on year, while Italy saw over EUR 600m in logistics transactions as part of a broader EUR 2.7bn total (CBRE).' },
      { t: 'p', v: 'Urban logistics continues to outperform the broader sector, underpinned by e-commerce growth, domestic consumption and the need for proximity to end-users. Demand is strongest for modern, ESG-compliant and automation-ready facilities in dense urban corridors. Obsolete or non-compliant stock faces rising vacancy risk unless upgraded or repositioned.' },
      { t: 'p', v: 'Prime stabilised yields in Western Europe currently range between 4.25% and 5.25%. CBRE data shows valuations improved further in Q1, with prime yields compressing 20bps in Spain, 25bps in Belgium and 10bps in Italy. Prime yield spreads versus local 10-year sovereign bonds remain attractive at c.260-320bps, supporting continued institutional interest from insurers and pension funds seeking duration-matched income with embedded inflation protection.' },

      { t: 'h3', v: 'Investment opportunities' },
      { t: 'p', v: 'The market continues to present value-add opportunities, with investors executing capex-driven strategies on existing assets able to underwrite post-capex gross initial yields above 8%. These typically involve short lease durations, ESG-led refurbishments, or the repositioning of underutilised urban logistics stock.' },

      { t: 'h2', v: 'Strategic outlook: H2 2025 and beyond' },
      { t: 'p', v: 'The second half of 2025 is expected to bring improved leasing and investment activity. ECB rate cuts and easing inflation should create a more favourable financing environment, enhancing transaction volumes.' },
      { t: 'p', v: 'Logistics yields are expected to compress selectively into 2026. AEW forecasts 40bps of compression over five years, a view broadly echoed by Savills, CBRE and BNP Paribas Real Estate, who cite constrained supply, resilient occupier demand and an improving rate environment. JLL adopts a more measured stance but concurs that yields have likely peaked.' },
      { t: 'p', v: 'From an occupier perspective, tenant decision-making remains delayed and pre-letting is still sluggish. That said, speculative development has declined sharply, with JLL forecasting a 30% decline in completions across Europe in 2025, which should support rental growth in undersupplied nodes.' },
      { t: 'p', v: 'Medium-term prospects remain strong. Logistics rents are expected to continue outpacing inflation. Capex-heavy repositioning strategies should gain popularity as legacy assets seek to meet ESG and operational benchmarks, and brownfield regeneration is already accelerating across constrained urban markets.' },
      { t: 'p', v: 'Risks include prolonged trade tensions, global monetary misalignment and weaker consumer sentiment. However, logistics’ defensive characteristics, especially in urban segments, provide an enduring buffer as investors prioritise liquidity, location quality and income resilience.' },

      { t: 'h2', v: 'In summary' },
      { t: 'p', v: 'European logistics real estate is emerging from a period of adjustment with core fundamentals intact and early signs of renewed momentum. Market conditions increasingly suggest a cyclical pause rather than a structural downturn.' },
      { t: 'p', v: 'Looking ahead, strategies focused on urban infill redevelopment, ESG-led repositioning and tenant-driven upgrades are well positioned to outperform. For long-term investors, the sector continues to offer a compelling mix of stable income, inflation protection and exposure to enduring structural themes.' }
    ]
  },

  {
    id: 'defense-infrastructure',
    kind: 'Insight',
    period: null,
    date: '17 March 2025',
    author: 'Philippe Riachi',
    title: 'Europe’s Defence and Infrastructure Spending',
    standfirst:
      'Reinforcing structural tailwinds in industrial and logistics real estate. Reforms that were once difficult to implement are now materialising, unlocking new opportunities for strategic industrial investment.',
    img: '/images/futureproof.jpg',
    link: 'https://www.daacap.com/europes-defense-and-infrastructure-spending-reinforcing-structural-tailwinds-in-industrial-and-logistics-real-estate/',
    body: [
      { t: 'p', v: 'Plans to defend Europe with a significant increase in German and European investment have already influenced market movements and capital flows. Reforms that were once difficult to implement are now materialising, unlocking new opportunities for strategic industrial investments. Spending in that field is increasingly viewed as a long-term commitment, and can have a meaningful impact on the industrial and logistics real estate sectors.' },

      { t: 'h2', v: 'A structural shift in investment priorities' },
      { t: 'p', v: 'The incoming German government’s intention to exempt defence spending from budget control measures and to allot EUR 500bn to an infrastructure fund marks a departure from its traditional fiscal conservatism. This fiscal loosening is a response to growing geopolitical tensions and the recognition that Europe’s economic security is closely tied to its industrial and defence capabilities.' },
      { t: 'p', v: 'This strategic pivot aligns with the broader EU defence industrial strategy, which emphasises cross-border collaboration and SME involvement, supported by initiatives like the European Defence Fund, which allocated EUR 1.065bn in 2025 for collaborative R&D projects. These efforts aim to strengthen domestic supply chains, reduce reliance on external suppliers, and create a more resilient industrial base across member states.' },

      { t: 'h2', v: 'Reindustrialisation and reshoring' },
      { t: 'p', v: 'Presently, 80% of military hardware comes from outside the EU. European defence stocks have surged, suggesting markets think Europe will increase domestic procurement. However, reversing decades of underinvestment could take over a decade, especially as existing supply chains are already strained by current demand.' },
      { t: 'p', v: 'Reshoring manufacturing closer to domestic markets presents challenges: higher labour costs, potential supply chain bottlenecks, and the need for significant investment in automation and talent. It also offers benefits, including enhanced sustainability, resilience, and reduced geopolitical risk and cost. Embracing circular business models further strengthens innovative value chains, complementing the growing emphasis on localised production.' },

      { t: 'h2', v: 'Implications for industrial real estate' },
      { t: 'h3', v: 'Expansion of defence manufacturing' },
      { t: 'p', v: 'The surge in defence budgets necessitates increased military equipment production, significantly boosting demand for specialised manufacturing facilities. While defence investment remains relatively small compared with Europe’s overall industrial base, the sector is currently running at full capacity, whereas European factories operate at less than 80% utilisation. This presents an opportunity to revitalise manufacturing by repurposing underused facilities.' },
      { t: 'p', v: 'Illustrating this trend, defence consortium KNDS has agreed to acquire Alstom’s Görlitz rail manufacturing plant in Germany, planning to repurpose it for producing tanks and armoured vehicles. Germany’s Rheinmetall is investing EUR 300m to expand its facilities in Lower Saxony and repurpose two auto-parts plants, and has expressed interest in acquiring Volkswagen’s Osnabrück plant as a potential site for tank manufacturing.' },

      { t: 'h3', v: 'Supply chain restructuring and warehousing demand' },
      { t: 'p', v: 'Efforts to localise defence supply chains require additional warehousing and logistics centres. This restructuring is expected to drive demand for industrial space in strategic locations to ensure efficient movement of raw materials and finished goods.' },

      { t: 'h3', v: 'Regional impact' },
      { t: 'ul', v: [
        'Germany and France are expected to see the highest levels of government-backed industrial investment, translating into increased real estate demand in key logistics and manufacturing zones.',
        'Italy and Spain are also likely to benefit significantly, given their substantial manufacturing bases and strategic positions for logistics and defence supply chains.',
        'Eastern European nations such as Poland and the Czech Republic could experience increased industrial real estate demand as cost-competitive manufacturing locations.'
      ] },

      { t: 'h2', v: 'A new structural shift boosting momentum' },
      { t: 'p', v: 'In the short term, trade tensions and economic uncertainties may pose challenges, potentially slowing projected growth. However, these same uncertainties underscore the urgent need for resilience and self-reliance in strategic sectors. As governments push for localised production and stronger supply chains, demand for logistics hubs, manufacturing facilities and industrial assets is set to grow, further reinforcing the structural momentum in logistics real estate.' }
    ]
  }
]

export const ARTICLE_INDEX = 'https://www.daacap.com/news/'

export function getArticle(id) {
  return ARTICLES.find((a) => a.id === id) || null
}
