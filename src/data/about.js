/* Copy for the #/about route (About us · Vision & Mission · Sustainability).
   Written in DAA house voice.

   NOTE ON NUMBERS: NOTES-data-honesty.md sets the rule that no unverified
   figure goes on the page, and the pass-5 edits removed every one of them
   (fund size, target IRR, market count, the CBRE completions stat). Nothing
   here reintroduces one. The only figures below are the €5m-€50m mandate band,
   which is already stated on the Origination beat and the contact page, and
   Heyrieux's BREEAM rating, which comes from DAA's own press release. If a
   fund-level number is wanted here, it needs sign-off AND the badge system
   brought back out of the stylesheet first. */

export const ABOUT = {
  eyebrow: 'About us',
  statement:
    'A FINMA regulated Swiss investment firm, specializing in logistics real estate across key European corridors.',
  body: [
    'DAA Capital Partners invests in last-mile and light-industrial assets in the €5m to €50m segment — a band that sits below the threshold of the large institutional buyers and above the reach of most private capital, and where competition is therefore structurally thinner.',
    'Acquisitions are predominantly off-market and corporate-sourced, originated through a wide broker network and proprietary sourcing technology. Assets are held through the Logistics Opportunities Fund series and managed actively: refurbishment, repositioning and ESG-led upgrades that meet evolving tenant requirements.'
  ],
  spec: ['Geneva · FINMA regulated', 'Last-mile & urban logistics', 'Western European corridors']
}

export const VISION = {
  eyebrow: 'Vision & Mission',
  statement: 'Urban logistics is the infrastructure layer of European consumption.',
  body: [
    'E-commerce penetration and same-day delivery expectations have moved inventory from regional hubs to the edge of the city. At the same time, first-ring industrial land is being absorbed by residential conversion. Demand compounds; the land it needs does not.',
    'That imbalance is the thesis. Low vacancy and sustained rental growth in the main corridors reflect a supply shortfall that cannot be built away quickly, and rent reversion on legacy leases remains substantial.'
  ],
  pillars: [
    {
      t: 'Mission',
      d: 'Aggregate a fragmented segment into an institutional portfolio: disciplined entry pricing, active asset management, and a clear exit path at portfolio scale.'
    },
    {
      t: 'Method',
      d: 'Proprietary origination in the sub-institutional band, underwriting to in-place NOI rather than to projected rental growth, and ESG-led repositioning that protects both valuation and lettability.'
    },
    {
      t: 'Measure',
      d: 'Performance is reported against the INREV asset-level index, net, over full market cycles, without selection.'
    }
  ]
}

export const SUSTAINABILITY = {
  eyebrow: 'Sustainability',
  statement:
    'ESG is underwritten as a driver of valuation, resilience and lettability — not as a reporting exercise.',
  body: [
    'Older urban logistics stock carries the location advantage but rarely the building specification. That gap is the value-add: refurbishment to modern dock, floor-loading and energy standards converts a constrained legacy asset into institutional-grade product without leaving the catchment.'
  ],
  commitments: [
    {
      t: 'BREEAM certification',
      d: 'Targeted on repositioning projects. Heyrieux achieved BREEAM "Very Good" on completion of its repositioning in 2024.'
    },
    {
      t: 'Green leases',
      d: 'Data-sharing and efficiency provisions introduced at renewal and on new lettings.'
    },
    {
      t: 'On-site generation',
      d: 'Roofs are surveyed for photovoltaic capacity at acquisition, and solar is installed where the structure and the tenant profile support it.'
    },
    {
      t: 'Tenant alignment',
      d: 'Upgrades are specified around occupier requirements — dock configuration, clear height, power — so that environmental performance and lettability improve together.'
    }
  ]
}
