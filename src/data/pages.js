/* Copy for the content pages, written in DAA house voice.

   NOTES-data-honesty.md sets the rule that no unverified figure goes on the
   page. Nothing here quotes a fund size, a target return, a market count or a
   third-party market statistic. The only figures are the EUR 5m-50m mandate
   band and Heyrieux's BREEAM rating, both already published by DAA. If a
   fund-level number is wanted on any of these pages it needs sign-off, and the
   placeholder badge brought back out of the stylesheet first. */

export const ABOUT = {
  title: 'About us',
  lead:
    'DAA Capital Partners is a Swiss investment manager specialising in urban logistics real estate across Western Europe. We focus on small- and mid-box last-mile and light-industrial assets, combining local knowledge, active asset management and disciplined execution to create long-term value.',
  body: [
    'The firm invests across the region\u2019s main logistics corridors, with geographic focus defined by each investment mandate.',
    'We buy in the \u20ac5m to \u20ac50m segment, where assets often change hands off-market or through a single adviser rather than a broad process.',
    'Buildings are acquired to be improved rather than simply held. Specification, energy performance and lease structure are key levers and are addressed from the outset.'
  ],
  team: {
    eyebrow: 'DAA Capital Partners',
    statement: 'One team, from underwriting to exit.',
    notes: [
      'Investment, asset management and finance sit in one office in Geneva. The team that underwrites an asset remains involved through repositioning and exit, maintaining continuity throughout the investment process.'
    ],
    cta: 'Get to know us'
  }
}

export const VISION = {
  title: 'Vision & Mission',
  /* Partner-supplied, November 2026. The section is titled "Vision & Mission"
     but until then carried no mission at all; it now has both, each labelled. */
  lead:
    'We believe the future of logistics is about proximity, not scale.',
  body: [
    'Cities have changed what they ask of a warehouse. Speed and flexibility now matter more than floor area, and the buildings that can deliver them sit inside the ring rather than out on the motorway. Urban logistics has quietly become infrastructure: much of what a city expects to arrive the same day passes through buildings that have served these locations for decades.',
    'We back small- and mid-box assets because we believe this is where resilience is strongest. Real occupier demand, very little replacement supply, and locations that cannot be recreated once the land goes to housing.',
    'What we are building is a portfolio that still works in ten years. Well located, properly specified, and adaptable enough to remain lettable as standards tighten. In practice, that means making buildings cleaner and more adaptable rather than relying on passive ownership.'
  ],
  mission:
    'To create long-term value by sourcing, improving and aggregating urban logistics assets through local knowledge, active asset management and disciplined execution.',
  investment: {
    eyebrow: 'Investment profile',
    statement: 'We are actively looking for new investment opportunities.',
    note:
      'If you are selling, advising on a sale or introducing an opportunity, our investment profile sets out what we buy and how we transact.'
  }
}

export const SUSTAINABILITY = {
  title: 'ESG',
  lead:
    'ESG is underwritten as a driver of valuation, resilience and lettability, not solely as a reporting exercise.',
  body: [
    'Older urban logistics stock carries the location advantage but often lacks the building specification required by modern occupiers. That gap creates the value-add opportunity: refurbishment to modern dock, floor-loading and energy standards can transform a constrained legacy asset while preserving its location advantage.',
    'Upgrades are specified around occupier requirements, so that environmental performance and lettability improve together rather than competing for the same capex.'
  ],
  commitments: [
    { t: 'BREEAM certification', d: 'Targeted on repositioning projects. Heyrieux achieved BREEAM "Very Good" on completion of its repositioning in 2024.' },
    { t: 'Green leases', d: 'Data-sharing and efficiency provisions introduced at renewal and on new lettings.' },
    { t: 'On-site generation', d: 'Roofs surveyed for photovoltaic capacity at acquisition, with solar installed where the structure and the tenant profile support it.' },
    { t: 'Fabric before offset', d: 'Envelope, lighting and dock specification first. An asset that needs less is worth more than one that buys its way level.' }
  ]
}

export const INVESTMENT = {
  title: 'Investment profile',
  lead: 'What we buy, where we buy it, and how we transact.',
  points: [
    'Small- and mid-box last-mile and light-industrial assets, individually or in small portfolios.',
    'Western Europe\u2019s main logistics corridors, with geographic focus defined by each investment mandate.',
    'Standing stock, including buildings that need work. Vacancy can represent an opportunity where the underlying location is compelling.',
    'Asset deals, share deals and sale-and-leasebacks, structured around the seller\u2019s timetable.',
    'Off-market and bilateral conversations preferred to broad processes.',
    'Investment decisions are taken in-house, enabling clear and timely feedback.'
  ],
  closing: {
    statement: 'We respond promptly to opportunities that meet our investment criteria.',
    note: 'Send us an asset or opportunity outline and we will respond promptly with a considered view.'
  }
}

export const FUTUREPROOF = {
  eyebrow: 'Asset strategy',
  /* Was "Turning standing stock into future-proof assets." - near word for word
     axis-re.nl's homepage line "Turning assets into future proof solutions.",
     in the same place on the page doing the same job. The partners asked for
     distance. This states the gap the strategy buys; the first note below
     says why it is a gap, the second how it is closed. */
  statement: 'Irreplaceable locations. Outdated buildings.',
  notes: [
    'Much of the urban logistics stock inside Europe’s ring roads was built for a different decade of distribution. The location still works. The building often does not.',
    'We buy that gap and close it: reconfigured layouts and vehicle flows, modern docks, upgraded envelopes and roof-mounted generation, designed around occupier requirements rather than around a certificate.'
  ]
}
