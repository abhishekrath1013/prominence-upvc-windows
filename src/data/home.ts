// Home page copy — one place, so the page components stay markup only.
//
// Sources:
//   • docs/Prominance-Website-Content.docx (v1.1) — blue APPROVED blocks are verbatim client copy, keep them word for word.
//   • the Prominance uPVC brochure + laminates brochure (facts, test results, finishes).
//   • src/data/brand.ts — verified facts. Do not add claims here that are not in those three.
//
// Open CONFIRM items from the doc that touch this file are marked  // CONFIRM.

import { contact } from './brand';

/* ------------------------------------------------------------------ 1 · hero */
export const hero = {
  eyebrow: 'Prominance uPVC window systems',
  // split around the ambassador: the left half reads "Built to outlast", the right half "the weather."
  titleLeft: ['Built to', 'outlast'],
  titleRight: ['the', 'weather.'],
  // doc: the page's single H1 and the 46-word direct-answer block. Both are spoken/crawled text; the display headline above
  // is what people see.
  seoH1: 'Built to outlast the weather: lead-free uPVC windows and doors made in India',
  directAnswer:
    'Prominance makes uPVC windows and doors in Coimbatore, India. Every profile is lead-free, extruded in our own factory from European-sourced raw materials, and independently tested by SKZ Germany and BSI UK to EN 12608. Choose casement, sliding, tilt-and-turn or slide-and-fold, in the Optima or Inventa series.',
  // doc: "SUB-HEADLINE"
  sub: 'Lead-free, German-tested uPVC windows and doors, extruded in our own factory and proven for 25,000+ hours of simulated sun and rain before they reach your wall.',
  primary: { label: 'Request your quote', href: '/quote/' },
  secondary: { label: 'Explore products', href: '/products/' },
  trust: 'Tested by SKZ Germany · BSI UK · SGS · CIPET',
  // doc: Segment 2, "Supporting proof strip" (approved figures)
  proof: [
    { value: '25,000+', label: 'Hours of Weatherability Testing' },
    { value: '100%', label: 'Lead Free Profiles' },
    { value: '2.3–2.5', label: 'mm Profile Wall Thickness' }, // CONFIRM: from the existing site, not the brochure
  ],
};

/* ------------------------------------------------ 2 · Let Life In (APPROVED) */
export const comfort = {
  title: ['Let Life In.', 'Keep the', 'Worries Out.'],
  titleLabel: 'Let Life In. Keep the Worries Out.',
  intro:
    'The best things about home are the moments you enjoy inside it. Prominance uPVC windows are designed to create a more comfortable environment, helping protect your spaces from outside noise, harsh weather and everyday disturbances.',
  cta: { label: 'Discover Everyday Comfort', href: '/windows/' },
  cards: [
    {
      n: '01',
      title: ['Keep the Noise', 'Outside.'],
      text: 'Make space for calmer mornings, uninterrupted conversations and peaceful evenings. Precision sealing and suitable glazing help reduce unwanted outdoor noise.',
      proof: 'Acoustic glazing, sealing gaskets and multi-chamber profiles.',
    },
    {
      n: '02',
      title: ['Comfort in', 'Every Season.'],
      text: 'From intense summer heat to cooler evenings, our insulating uPVC window systems help reduce heat transfer and support indoor comfort.',
      // CONFIRM: the approved tag says "tested thermal transmittance", but the brochure only reports the material's thermal
      // conductivity (0.137 W/mK, CIPET), not a window U-value. Worded to match the test that exists, as the doc suggests.
      proof: 'Multi-chamber construction and tested thermal conductivity (0.137 W/mK).',
    },
    {
      n: '03',
      title: ['Ready for', 'Changing Skies.'],
      text: 'Thoughtfully designed weather seals and drainage solutions help protect your interiors against wind-driven rain and unwanted air infiltration.',
      proof: 'EPDM weather seals, water-drain holes and reinforced chambers.',
    },
    {
      n: '04',
      title: ['Protection You', 'Can Rely On.'],
      text: 'Reinforced profiles and multi-point locking systems add confidence to the moments and people that matter most.',
      proof: 'Galvanized steel reinforcement and multi-point locking.',
    },
  ],
};

/* ------------------------------------- 3 · the frame collection (brochure sections) */
// Heading and intro are the client-approved "Product Collection" copy. The images are the brochure's corner sections
// (src/assets/images/brochure/profiles); the facts come from src/content/products and doc §4.10 (Low Threshold).
export const frames = {
  eyebrow: 'The frame collection',
  title: 'A Window for Every Way of Living.',
  intro:
    'From contemporary apartments to spacious independent homes, Prominance offers thoughtfully designed windows and doors to suit different spaces, opening requirements and architectural preferences.',
  note: 'Corner sections from the Prominance brochure. Every frame: 2.3–2.5 mm multi-chambered walls, 1.5 mm galvanised steel, fusion-welded corners, dual EPDM gaskets.',
  finishes: { label: 'See the finishes', href: '/colours/' },
};

export const frameList = [
  {
    key: 'inventa-casement',
    name: 'Inventa Casement',
    kind: 'Window',
    tagline: 'Built for strength and large openings',
    text: 'Designed for strength with twin gasket sealing and multi-point locks. Supports large fixed glass panels and is well suited to noisy streets.',
    facts: ['Single, double or triple glazing', 'Multi-point locking, 2–3 points', 'Twin gasket sealing'],
    href: '/windows/casement/',
    img: 'inventa-casement',
    alt: 'Corner section of an Inventa casement window frame showing steel-reinforced chambers and glazing',
  },
  {
    key: 'optima-casement',
    name: 'Optima Casement',
    kind: 'Window',
    tagline: 'Engineered for small-to-medium openings',
    text: 'Engineered for small-to-medium openings in medium-rise buildings, delivering 100% opening capability where Inventa’s larger reinforcement isn’t required.',
    facts: ['Single or double glazing', 'Opens 100%', 'Small-to-medium openings'],
    href: '/windows/casement/',
    img: 'optima-casement',
    alt: 'Corner section of an Optima casement window frame',
  },
  {
    key: 'inventa-sliding',
    name: 'Inventa Sliding',
    kind: 'Window',
    tagline: 'Reinforced for larger openings',
    text: 'Sashes glide on rollers within the frame, so nothing projects into the room. Slim vertical separators give more glass.',
    facts: ['Single, double or triple glazing', 'Up to 66% opening', '2-track or 3-track'],
    href: '/windows/sliding/',
    img: 'inventa-sliding',
    alt: 'Cross-section of an Inventa sliding window frame with three glazing tracks',
  },
  {
    key: 'optima-sliding',
    name: 'Optima Sliding',
    kind: 'Window',
    tagline: 'Simple and space-efficient',
    text: 'Compact, simple and strong. Works in tight balconies and corridors because it needs no clearance to open.',
    facts: ['Single or double glazing', 'No swing space needed', '2-track or 3-track'],
    href: '/windows/sliding/',
    img: 'optima-sliding',
    alt: 'Corner section of an Optima sliding window frame',
  },
  {
    key: 'tilt-turn',
    name: 'Inventa Tilt & Turn',
    kind: 'Window',
    tagline: 'Z-sash, dual function',
    text: 'Tilt inward from the top for secure ventilation you can leave unattended, or turn fully open on a side hinge for cleaning and full airflow.',
    facts: ['Tilts for ventilation', 'Turns 100% open', 'Single, double or triple glazing'],
    href: '/windows/tilt-turn/',
    img: 'tilt-turn-3g',
    alt: 'Corner section of a tilt-and-turn window frame with triple glazing',
  },
  {
    key: 'door-casement',
    name: 'Casement Door',
    kind: 'Door',
    tagline: 'Weatherproof balcony and entry doors',
    text: 'A side-hinged door for balcony and entry openings, built for weatherproofing and dust resistance.',
    facts: ['Toughened or laminated glass', 'Up to 1200 mm per leaf', 'Dust-resistant sealing'],
    href: '/doors/casement/',
    img: 'door-casement',
    alt: 'Cross-section of a uPVC casement door profile with steel reinforcement',
  },
  {
    key: 'door-sliding',
    name: 'Sliding Door',
    kind: 'Door',
    tagline: 'Wide openings, maximum light',
    text: 'Large glass panels that slide horizontally, built for maximum daylight and airflow across wide openings.',
    facts: ['3-track, 3 or 6 shutters', 'Toughened or laminated glass', 'Wall-sized openings'],
    href: '/doors/sliding/',
    img: 'door-sliding',
    alt: 'Cross-section of a uPVC sliding door profile',
  },
  {
    key: 'low-threshold',
    name: 'Low Threshold',
    kind: 'Door innovation',
    tagline: 'No step to hop over',
    text: 'A concealed aluminium threshold that sits almost flush: easy to roll a trolley over, airtight to keep dust out.',
    facts: ['Concealed aluminium system', 'Almost flush with the floor', 'Airtight against dust'],
    href: '/doors/',
    img: 'low-threshold',
    alt: 'Corner section of a low-threshold door frame',
  },
] as const;

/* ------------------------------------------- 4 · statement + factory (new copy) */
export const craft = {
  statement: ['From powder', 'to profile.', 'One roof.', 'One standard.'],
  statementLabel: 'From powder to profile. One roof. One standard.',
  alt: 'The Prominance extrusion hall in Coimbatore, with uPVC profile extrusion lines running side by side',
  cta: { label: 'Take the factory tour', href: '/why-prominance/infrastructure/' },
  // doc: Segment 9 — the six stations, shown under the photograph
  stations: [
    'Raw materials',
    'Weighing & blending',
    'Tooling',
    'Extrusion',
    'Testing',
    'To your wall',
  ],
};

/* ---------------------------------- 5 · the 20-year lockup (replaces "21-day") */
export const warranty = {
  big: { n: '20', unit: 'YEAR', word: 'WARRANTY' },
  // client-supplied copy. CONFIRM: "6 lakh sq. ft." is the figure from the aluminium site; check it is the UPVC facility's area.
  lead: [
    'Spanning an impressive 6 lakh sq. ft., ',
    'our world-class manufacturing facility ',
    'brings together cutting-edge robotics, ',
    'sophisticated automation and an ',
    'unwavering pursuit of excellence.',
  ],
  // The brochure states the warranty is "against colour degradation"; the terms are not published yet.
  // CONFIRM: what is covered, who honours it, transferability, how to claim.
  small: '20-year warranty against colour degradation on profiles and laminates.',
  way: 'The Prominance way.',
};

/* -------------------------------------------- 6 · Every Component (APPROVED) */
export const anatomy = {
  eyebrow: 'Inside the frame',
  title: 'Every Component Has a Purpose.',
  intro:
    'True performance comes from the details working together. From profile construction and reinforcement to sealing, glazing and locking, every component contributes to the reliability of a Prominance window.',
  hint: 'Select a component',
  quote:
    'A Prominance uPVC window combines multi-chambered profiles, galvanised steel reinforcement, twin EPDM gaskets, multi-point locking and a built-in drainage slope.',
};

export const components = [
  {
    key: 'profile',
    name: 'Multi-chambered profiles',
    kicker: 'Profile',
    blurb: 'Engineered construction that supports strength and insulation.',
    detail: 'Walls of 2.3–2.5 mm. Air chambers trap air to insulate. Lead-free, 100% calcium-zinc formulation.',
    image: 'multi-chambered-profile',
    alt: 'Cut-away of a multi-chambered uPVC profile showing air chambers and steel reinforcement',
  },
  {
    key: 'steel',
    name: 'Steel reinforcement',
    kicker: 'Strength',
    blurb: 'Added structural stability for suitable configurations.',
    detail: '1.5 mm galvanised steel, hot-dip coated to 125 GSM, in a dedicated reinforcement chamber.',
    image: 'steel-reinforcement',
    alt: 'Galvanised steel reinforcement inside a uPVC profile chamber',
  },
  {
    key: 'lock',
    name: 'Multi-point locking',
    kicker: 'Security',
    blurb: 'Secure and dependable closure.',
    detail: 'Locks at 2–3 points around the sash. The Euro-groove channel accepts international hardware.',
    image: 'multi-point-lock',
    alt: 'Multi-point locking mechanism on a uPVC sash',
  },
  {
    key: 'gasket',
    name: 'Twin gasket sealing',
    kicker: 'Sealing',
    blurb: 'Improved sealing against unwanted air and water infiltration.',
    detail: 'Dual EPDM compression gaskets, co-extruded along the bead.',
    image: 'weather-seal',
    alt: 'Weather seal strip used between sashes',
  },
  {
    key: 'drain',
    name: 'Drainage design',
    kicker: 'Drainage',
    blurb: 'Helps manage water during rainfall.',
    detail: 'Built-in slope and designed water outlets keep water from standing in the system.',
    image: 'drain-holes',
    alt: 'Water-drain slot on the outer face of a uPVC window frame',
  },
  {
    key: 'weld',
    name: 'Fusion-welded corners',
    kicker: 'Joints',
    blurb: 'Corners are welded into one piece, not screwed or glued.',
    detail: 'Weld strength tested at 25.32 MPa against a 20 MPa minimum (BSI UK).',
    image: 'fusion-welded-joints',
    alt: 'Fusion-welded mitred corner of a uPVC window frame',
  },
] as const;

/* -------------------------------------------- 7 · tested to the limit (new copy) */
// All results from the doc's Test Lab table / brochure (EN 12608-1:2016). Impact is stated as a multiple so it is true
// whichever of 74.4 / 74.5 kJ/m² the current report shows (CONFIRM).
export const lab = {
  title: ['Tested', 'to the', 'limit.'],
  titleLabel: 'Tested to the limit.',
  sub: 'Independent labs in Germany and the UK. Every number, every lab, in plain English.',
  cta: { label: 'See the Test Lab', href: '/why-prominance/quality-standards/' },
  cards: [
    {
      title: ['Colour', 'Stability'],
      big: 'ΔE 1.6',
      text: 'After 25,000 hours of accelerated weathering. The EN 12608 limit is 5.',
      lab: 'SKZ Germany · BSI UK',
      icon: 'sun',
    },
    {
      title: ['Impact', 'Strength'],
      big: '3.7×',
      text: 'The EN 12608 minimum for Charpy impact strength, so profiles resist knocks in fabrication, transport and use.',
      lab: 'SKZ · BSI',
      icon: 'hit',
    },
    {
      title: ['Weld', 'Strength'],
      big: '25.32 MPa',
      text: 'Individual specimen result against a 20 MPa minimum, so corners stay put.',
      lab: 'BSI UK',
      icon: 'weld',
    },
    {
      title: ['Lead', 'Free'],
      big: 'Not detected',
      text: 'Calcium-zinc stabilisers instead of lead. Tested against RoHS Directive 2011/65/EU.',
      lab: 'SGS',
      icon: 'leaf',
    },
    {
      title: ['Fire', 'Behaviour'],
      big: 'UL 94 V0',
      text: 'Flammability rating for the profile material.',
      lab: 'CIPET',
      icon: 'flame',
    },
    {
      title: ['Heat &', 'Cold'],
      big: 'Pass',
      text: 'Heat reversion, behaviour after 150 °C and impact resistance at −10 °C all pass EN 12608-1:2016.',
      lab: 'BSI UK',
      icon: 'temp',
    },
  ],
};

/* ------------------------------------------------------------- 8 · contact CTA */
export const cta = {
  eyebrow: 'Let’s build something better',
  title: ['Your windows', 'should be the', 'last thing you', 'worry about.'],
  titleLabel: 'Your windows should be the last thing you worry about.',
  lead: 'Tell us about your home or project. A technical advisor will recommend the right system, glass and finish. No pressure, no jargon.',
  talk: 'Prefer to talk?',
  phone: contact.tollFree,
  phoneHref: contact.tollFreeHref,
  email: contact.email,
  form: {
    title: 'Let’s find your perfect fit.',
    sub: 'Request a free consultation',
    interests: ['uPVC windows', 'uPVC doors', 'Windows and doors', 'Dealer / fabricator partnership', 'Export enquiry', 'Not sure yet'],
    fine: 'By submitting, you agree to be contacted about your enquiry.',
    submit: 'Request a callback',
  },
};
