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
    'DAA Capital Partners is a Geneva-based investment manager specialising in European urban logistics real estate. We acquire last-mile and light-industrial assets in the EUR 5m to EUR 50m segment, a band that sits below the threshold of the large institutional buyers and above the reach of most private capital, and where competition is therefore structurally thinner.',
  body: [
    'Acquisitions are predominantly off-market and corporate-sourced, originated through a deep broker network, direct owner relationships and proprietary sourcing technology. Assets are held through the Logistics Opportunities Fund series and managed actively rather than passively: refurbishment, repositioning and ESG-led upgrades that meet evolving tenant requirements.',
    'The firm is regulated in Switzerland and invests across Western Europe’s main logistics corridors.'
  ],
  team: {
    eyebrow: 'Our team',
    statement: 'A small team, close to every asset.',
    notes: [
      'Investment, asset management and finance sit in one office in Geneva. The people who underwrite a building are the people who reposition it and the people who answer to investors for it.',
      'That is deliberate. In the sub-institutional band, returns come from execution on individual assets rather than from portfolio beta, and execution does not survive being handed between desks.'
    ],
    cta: 'Get to know us'
  }
}

export const VISION = {
  title: 'Vision & Mission',
  lead:
    'Urban logistics is the infrastructure layer of European consumption. Our mission is to aggregate a fragmented segment of it into an institutional portfolio.',
  body: [
    'E-commerce penetration and same-day delivery expectations have moved inventory from regional hubs to the edge of the city. At the same time, first-ring industrial land is being absorbed by residential conversion. Demand compounds; the land it needs does not. That imbalance is the thesis, and low vacancy and sustained rental growth across the main corridors are what it looks like in the numbers.',
    'We see these buildings as critical infrastructure rather than as a property type. They are what allows a city to expect goods the same day, and there is no substitute for being inside the ring.'
  ],
  pillars: [
    { t: 'Mission', d: 'Aggregate a fragmented segment into an institutional portfolio: disciplined entry pricing, active asset management and a clear exit at portfolio scale.' },
    { t: 'Method', d: 'Proprietary origination in the sub-institutional band, underwriting to in-place NOI rather than to projected rental growth, and ESG-led repositioning that protects valuation and lettability together.' },
    { t: 'Measure', d: 'Performance reported against the INREV asset-level index, net, over full market cycles, without selection.' }
  ],
  investment: {
    eyebrow: 'Investment profile',
    statement: 'We are actively looking to expand the portfolio.',
    note:
      'Last-mile and light-industrial assets in the EUR 5m to EUR 50m segment, across Western Europe’s main corridors. If you are selling, advising on a sale, or placing capital, our detailed investment profile sets out exactly what we buy.'
  }
}

export const SUSTAINABILITY = {
  title: 'Sustainability',
  lead:
    'ESG is underwritten as a driver of valuation, resilience and lettability, not as a reporting exercise.',
  body: [
    'Older urban logistics stock carries the location advantage but rarely the building specification. That gap is the value-add: refurbishment to modern dock, floor-loading and energy standards converts a constrained legacy asset into institutional-grade product without leaving the catchment.',
    'Upgrades are specified around occupier requirements, so that environmental performance and lettability improve together rather than competing for the same capex.'
  ],
  commitments: [
    { t: 'BREEAM certification', d: 'Targeted on repositioning projects. Heyrieux achieved BREEAM "Very Good" on completion of its repositioning in 2024.' },
    { t: 'Green leases', d: 'Data-sharing and efficiency provisions introduced at renewal and on new lettings.' },
    { t: 'On-site generation', d: 'Roofs surveyed for photovoltaic capacity at acquisition, with solar installed where the structure and the tenant profile support it.' },
    { t: 'Fabric before offset', d: 'Envelope, lighting and dock specification first. An asset that needs less is worth more than one that buys its way level.' }
  ],
  thesis: {
    eyebrow: 'The thesis',
    statement: 'We buy the buildings cities cannot live without.',
    notes: [
      'Last-mile logistics is not a property type. It is the physical condition of everything a city expects to arrive the same day.'
    ],
    rail: [
      { t: 'Proximity', d: 'The value sits in the distance to the consumer, not in the square metres.' },
      { t: 'Scarcity', d: 'First-ring industrial land converts to housing, and it does not convert back.' },
      { t: 'Necessity', d: 'Rent is a small share of supply chain cost, and the last link is the least substitutable.' }
    ]
  }
}

export const INVESTMENT = {
  title: 'Investment profile',
  lead:
    'What we buy, where we buy it, and the shape of a transaction we can execute quickly.',
  criteria: [
    { t: 'Lot size', d: 'EUR 5m to EUR 50m. Single assets and small portfolios.' },
    { t: 'Asset type', d: 'Last-mile, urban logistics and light-industrial. Multi-let and single-let both considered.' },
    { t: 'Geography', d: 'Western Europe’s main logistics corridors, with a bias to first-ring locations around established consumption centres.' },
    { t: 'Condition', d: 'Standing stock, including assets needing refurbishment, reconfiguration or an energy upgrade. Vacancy is not a disqualifier where the location is right.' },
    { t: 'Structure', d: 'Asset deals, share deals and sale-and-leaseback. We can work with a seller’s timetable and confidentiality requirements.' },
    { t: 'Process', d: 'Off-market and bilateral preferred. Decisions are taken in-house, so an indicative view comes back quickly.' }
  ],
  closing: {
    statement: 'If it fits, we will tell you quickly.',
    note: 'Send the asset, or the outline of one, and you will get a considered answer rather than a placeholder.'
  }
}

export const FUTUREPROOF = {
  eyebrow: 'Asset strategy',
  statement: 'Turning standing stock into future-proof assets.',
  notes: [
    'Most of the urban logistics stock inside Europe’s ring roads was built for a different decade of distribution. The location still works. The building often does not.',
    'We buy that gap and close it: reconfigured layouts and vehicle flows, modern docks, upgraded envelopes and roof-mounted generation, delivered around the occupier rather than around a certificate.'
  ]
}
