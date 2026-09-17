/* Latest articles, mirrored from daacap.com. REAL: titles and links are the
   firm's own published pieces. Publication dates are deliberately omitted —
   they are not carried here to avoid guessing; the `period` field is only used
   where the article itself names the period it covers.

   This list is hand-maintained for now. When the WordPress REST feed is wired
   (https://www.daacap.com/wp-json/wp/v2/posts), replace this file with a fetch
   and drop the hard-coded entries. */
export const NEWS = [
  {
    id: 'sept-2025-update',
    kind: 'Insight',
    period: 'September 2025',
    title: 'European Logistics Real Estate: September 2025 Update',
    standfirst:
      'Completions back to 2017 levels, speculative development down to ~40%, and ~3.1% annualised prime rental growth in Q2 (CBRE).',
    link: 'https://www.daacap.com/european-logistics-real-estate-september-2025-update/'
  },
  {
    id: 'q2-2025-outlook',
    kind: 'Insight',
    period: 'Q2 2025',
    title: 'European Logistics Real Estate: Q2 2025 Update and Outlook',
    standfirst:
      'Prime stabilised yields of 4.25%–5.25% in Western Europe, with selective compression expected into 2026 on constrained supply and resilient occupier demand.',
    link: 'https://www.daacap.com/european-logistics-real-estate-q2-2025-update-and-outlook/'
  },
  {
    id: 'defense-infrastructure',
    kind: 'Insight',
    period: null,
    title: 'Europe’s Defense and Infrastructure Spending',
    standfirst:
      'Reinforcing structural tailwinds in industrial and logistics real estate.',
    link: 'https://www.daacap.com/europes-defense-and-infrastructure-spending-reinforcing-structural-tailwinds-in-industrial-and-logistics-real-estate/'
  }
]

export const NEWS_INDEX = 'https://www.daacap.com/news/'
