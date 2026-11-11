// Makeover copy — written with the Billion-Dollar Board frameworks.
// Facts come ONLY from brand.ts (verified). No invented numbers, clients or guarantees.
//
// Board routing:
//  Godin    → positioning + "who it's for / not for"
//  Hormozi  → value equation: dream outcome, proof, speed, low effort; the named offer
//  Kennedy  → message/market/media match; headline → proof → CTA structure
//  Brunson  → value ladder: brochure → site visit → quote → project partnership
//  Robbins  → certainty + significance for the ₹25L+ buyer
//  Belfort  → certainty triad on the page: product / trust / company

export const positioning = {
  // Godin: [Brand] is for [people] who believe [worldview]. Unlike [alt], we [difference] so that [outcome].
  statement:
    'Prominance is for people who build once and expect it to last. Unlike importers and assemblers, we extrude our own lead-free profiles, test them for 25,000+ hours, and stand behind the finish for 20 years.',
  forWho: 'Builders, developers, architects and homeowners with projects where the window cannot be the weak point.',
  notForWho: 'Not for projects that buy on the lowest quote and replace in five years.',
};

export const hero = {
  eyebrow: 'Prominance · Coimbatore, India',
  headline: ['Built to outlast', 'the weather.'],
  sub: 'Lead-free German-engineered uPVC windows and doors, extruded in our own factory and proven for 25,000+ hours before they reach your wall.',
  primaryCta: { label: 'Request a quote', href: '/quote/' },
  secondaryCta: { label: 'Book a site visit', href: '/contact/' },
};

// Hormozi value equation, expressed as four quiet statements.
export const manifesto =
  'A window is the part of a home you touch every day and think about once. We make it to be forgotten, in the best way.';

export const proof = [
  { value: '25,000+', unit: 'hrs', label: 'Accelerated weathering, tested at SKZ, Germany' },
  { value: '22,000', unit: 'MT', label: 'Annual capacity, so large projects ship on time' },
  { value: '100%', unit: '', label: 'Lead-free, calcium-zinc formulation, verified by SGS' },
  { value: '20', unit: 'yrs', label: 'Warranty on imported European laminates' },
];

// Belfort's three certainties, one section each: Product, Trust, Company.
export const certainty = {
  product: {
    label: 'The product',
    title: 'Engineered, not assembled.',
    body: 'Multi-chambered walls of 2.3–2.5 mm. 1.5 mm galvanised steel reinforcement. Fusion-welded corners. Dual EPDM seals. Multi-point locking. Every detail is specified, none is left to the installer.',
  },
  trust: {
    label: 'The proof',
    title: 'Tested by people who have no reason to be kind.',
    body: 'SKZ Germany for weathering. BSI UK for impact and weld strength. SGS for lead-free compliance. CIPET for fire behaviour (UL-94 V0). Independent labs, published results.',
  },
  company: {
    label: 'The company',
    title: 'One factory. One standard.',
    body: 'From European raw material to extrusion, welding and quality checks, the whole line sits under one roof in Coimbatore, with regional offices across India.',
  },
};

// Kennedy: lead with emotion, close with logic.
export const pillars = [
  { title: 'Quiet', body: 'Up to 40 dB less noise. The road, the monsoon, the neighbours, softened.' },
  { title: 'Cool', body: 'Typically 30% less energy lost through the frame. The air conditioner works less.' },
  { title: 'Secure', body: 'Steel-reinforced profiles with two- to three-point locking.' },
  { title: 'Lasting', body: 'Colour change of ΔE 1.6 after accelerated weathering, against a limit of 5.' },
  { title: 'Clean', body: 'No lead. No painting. No termites. Wipe it down and carry on.' },
  { title: 'Beautiful', body: 'Imported laminates in woodgrain and colour, finished to a 20-year warranty.' },
];

// Brunson value ladder, rewritten as the buyer's path.
export const journey = [
  { step: '01', title: 'Look', body: 'Browse the systems and finishes. Download the brochure.' },
  { step: '02', title: 'Talk', body: 'Tell us about the project. A specialist replies within one working day.' },
  { step: '03', title: 'See', body: 'Site visit, measurements and a written specification, with no obligation.' },
  { step: '04', title: 'Build', body: 'Manufactured to your drawings, delivered and installed by trained teams.' },
];

// Named offer (Hormozi: name it like a product).
export const offer = {
  name: 'The Prominance Project Service',
  headline: 'From drawing to handover, one accountable partner.',
  includes: [
    'Site visit and measurement',
    'Written specification and glazing advice',
    'Profile and laminate samples',
    'Factory production to your drawings',
    'Trained installation teams',
    'Warranty documentation',
  ],
  cta: { label: 'Start your project', href: '/quote/' },
};

export const systems = {
  windows: {
    title: 'Windows',
    line: 'Casement, sliding and tilt & turn.',
    href: '/windows/',
  },
  doors: {
    title: 'Doors',
    line: 'Casement, sliding and slide & fold.',
    href: '/doors/',
  },
  finishes: {
    title: 'Finishes',
    line: 'Eight colours and woodgrains, imported from Europe.',
    href: '/colours/',
  },
};

export const dealersStrip = {
  headline: 'Building with us, not just buying from us.',
  body: 'Dealers, fabricators and channel partners get the same engineering, plus training and marketing support.',
  cta: { label: 'Talk to the partnerships team', href: '/contact/' },
};

export const finalCta = {
  headline: ['Tell us about', 'your project.'],
  sub: 'Drawings, a rough plan, or just an idea. We will reply within one working day.',
  primary: { label: 'Request a quote', href: '/quote/' },
  secondary: { label: 'Download the brochure', href: '/resources/downloads/' },
};

export const marquee = ['Prominance', 'Lead-free', 'Weather-proof', 'Made in Coimbatore'];
