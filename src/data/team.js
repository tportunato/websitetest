/* The team, and the advisory board behind it.

   The three original principals and all three advisers are REAL and already
   published on daacap.com/leadership; their bios and photos come from there.
   Tomaso was added in September 2026 and his copy is the client's own.

   A seat for an incoming CIO, "Joining in December 2026", sat second in this
   list and was pulled on the client's instruction before the appointment was
   announced. It is in the git history with its copy and its grey placeholder
   portrait, which is still in /images/team/ for it; restore both together.

   ORDER IS DELIBERATE and is the order the row runs in: the chair, then the
   two partners, then the associate. It is not alphabetical and it is not the
   old grid's order - set by the client, so do not "tidy" it.

   Photos: the published ones are hotlinked from the WordPress media library.
   Those under /images/team/ are local because they were supplied to us
   directly. They are cut the same way as the published set - head and
   shoulders on white, the head measured to the same size in frame - so the row
   does not change character as it scrolls. */
export const TEAM = [
  {
    name: 'Dominique Turpin',
    role: 'Chairman',
    img: '/images/team/dominique-turpin.jpg',
    linkedin: 'https://www.linkedin.com/in/dominiqueturpin/',
    bio: 'Dr. Turpin is President (Europe) of the China Europe International Business School (CEIBS), the leading business school in Asia, and Emeritus Professor in Marketing at IMD, where he served as Dean and President from 2010 to 2016. He has extensive teaching, consulting and research experience in marketing and international strategy across Europe, Asia and the Americas, and has worked with international companies including Coca-Cola, Danone, Nestlé, Novo Nordisk and Philips. He holds a doctorate in economics from Sophia University, Tokyo.'
  },
  {
    name: 'Philippe Riachi',
    role: 'Partner · CEO',
    img: '/images/team/philippe-riachi.jpg',
    linkedin: 'https://www.linkedin.com/in/philippe-riachi-0a17b0189/',
    bio: 'Philippe has over 30 years of experience in investment banking and alternative asset management and has led the real estate portfolio since 2020. He was co-founder and Managing Partner at Jabre Capital Partners, which grew to $6 billion in assets under management at its peak. Before that he spent a long career at Morgan Stanley, ultimately as Managing Director and co-head of Global Prime Brokerage Risk Management. He holds a degree in Economics from Concordia University.'
  },
  {
    name: 'Anne-Lorraine de Malliard',
    role: 'Partner · Head of Investments',
    img: '/images/team/anne-lorraine-de-malliard.jpg',
    linkedin: 'https://www.linkedin.com/in/annelorrainedemalliard/',
    bio: 'Anne-Lorraine has over 15 years of experience in real estate investment. Since 2020 she has been responsible for real estate acquisitions and asset management at DAA Capital Partners. She began her career at BNP Paribas in Real Estate Financing in Paris, originating and executing core financing transactions, and later contributed to the launch and management of the AB European Real Estate Fund. She holds an MSc in Real Estate Finance and is a chartered surveyor (RICS).'
  },
  {
    name: 'Tomaso Portunato',
    role: 'Associate',
    img: '/images/team/tomaso-portunato.jpg',
    linkedin: null,   /* not supplied yet; the card drops the link when it is null */
    bio: 'Tomaso is a former entrepreneur with expertise in operations and fundraising. He leads the firm’s work on applied AI, building the origination tooling that screens urban logistics catchments down to the assets worth underwriting, and extending it across the investment workflow from market mapping to document review.'
  }
]

export const ADVISORS = [
  {
    name: 'Alain Dargham',
    role: 'Senior Advisor',
    img: '/images/team/alain-dargham.jpg',
    linkedin: 'https://www.linkedin.com/in/alaindargham/',
    bio: 'Over 20 years in investment banking and private equity. Former Chief Investment Officer at Arab Bank (Switzerland) Ltd., where he oversaw investments of USD 1.4bn. Ph.D. from Paris 1 Panthéon-Sorbonne with HEC Paris, MBA from IMD.'
  },
  {
    name: 'Susanne Hundsbæk-Pedersen',
    role: 'Senior Advisor',
    img: '/images/team/susanne-hundsbaek-pedersen.jpg',
    linkedin: 'https://www.linkedin.com/in/susanne-hundsb%C3%A6k-pedersen-4b14601',
    bio: 'Member of the real estate investment committee. Global Head of Pharma Technical Operations at Roche; previously SVP roles at Novo Nordisk, where her supply chain organisation was recognised in Gartner’s Top 25 and by the World Economic Forum as a global lighthouse in advanced manufacturing.'
  },
  {
    name: 'Gianluca Colombo',
    role: 'Senior Advisor',
    img: '/images/team/gianluca-colombo.jpg',
    linkedin: 'https://www.linkedin.com/in/gianlcol/',
    bio: 'Member of the real estate investment committee. Chief Procurement Officer at Firmenich, the world’s largest privately-owned fragrance and flavour company; previously CPO at Coty and 11 years at Ferrero as Head of Group Supply Chain. MSc in Mechanical Engineering, Polytechnic Institute of Milan.'
  }
]
