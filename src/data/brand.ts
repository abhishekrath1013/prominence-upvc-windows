// Single source of truth for verified Prominance facts.
// Every value here was extracted from the live prominance.com site during research.
// Do not add claims, numbers, or certifications that aren't verified from that source.

export const brand = {
  name: 'Prominance',
  legalName: 'PWDS Extrusions Private Limited',
  tagline: "India's Largest Manufacturer of Weather Resistant and Energy Efficient uPVC Windows & uPVC Doors",
  short: 'Weather-resistant, energy-efficient uPVC windows & doors, engineered for Indian homes.',
};

export const contact = {
  tollFree: '1800 833 4500',
  tollFreeHref: 'tel:18008334500',
  phone: '+91 9500895005',
  phoneHref: 'tel:+919500895005',
  email: 'info@prominance.com',
  fax: '+91 4255-265507',
  hq: {
    line1: 'SF.No. 207/1 B & 1 C, Selakaraichal Road',
    line2: 'Appanaickenpatti, Sulur, Coimbatore – 641 402, Tamil Nadu, India',
  },
  social: {
    facebook: 'https://www.facebook.com/prominancewindows',
    twitter: 'https://twitter.com/prominancewin',
    instagram: 'https://www.instagram.com/prominancewindows',
    youtube: 'https://www.youtube.com/prominancewindows',
    linkedin: 'https://www.linkedin.com/company/prominance-windows',
  },
} as const;

// Verified stats — used across Why Prominance, homepage trust strip, and product pages.
export const stats = [
  { value: '22,000', unit: 'MT', label: 'Annual production capacity' },
  { value: '13', unit: 'yrs', label: 'Years of manufacturing experience' },
  { value: '25,000+', unit: 'hrs', label: 'Accelerated weather testing' },
  { value: '30%', unit: '', label: 'Typical reduction in energy loss' },
] as const;

export const certifications = [
  {
    body: 'SKZ – Germany',
    detail: 'Weatherability and mechanical property testing (25,000+ hour accelerated weathering).',
  },
  {
    body: 'BSI – UK',
    detail: 'Heat reversion, impact resistance and weld strength assessment.',
  },
  {
    body: 'SGS',
    detail: 'RoHS compliance verification — lead not detected.',
  },
  {
    body: 'CIPET',
    detail: 'Flammability and thermal property testing (UL-94 V0 rating).',
  },
] as const;

export const testResults = [
  { metric: 'Flexural Modulus', result: '3070 N/mm²', requirement: '2200+ N/mm²' },
  { metric: 'Tensile Impact Strength', result: '934 KJ/m²', requirement: '600+ KJ/m²' },
  { metric: 'Charpy Impact Strength', result: '74.4 KJ/m²', requirement: '20+ KJ/m²' },
  { metric: 'Accelerated Weathering Colour Change (ΔE)', result: '1.6', requirement: 'Not more than 5' },
  { metric: 'Impact Resistance at −10°C', result: 'Pass', requirement: 'Pass' },
  { metric: 'Post-Weathering Impact Retention', result: '10.4% reduction', requirement: 'Max 40% reduction' },
  { metric: 'Vicat Softening Temperature', result: '80°C', requirement: '—' },
  { metric: 'Thermal Conductivity', result: '0.137 W/mK', requirement: '—' },
] as const;

export const standards = [
  'EN 12608-1:2016',
  'BS EN ISO 178:2013',
  'BS EN ISO 8256:2005',
  'DIN EN 513',
  'BS EN ISO 179',
  'UL-94',
] as const;

// Construction facts used throughout product pages — verified, not per-product marketing copy.
export const constructionFacts = {
  wallThickness: '2.3–2.5mm multi-chambered profile walls',
  steelReinforcement: '1.5mm galvanized steel, hot-dip to 125 GSM',
  joints: 'Fusion-welded corners (not screwed or glued)',
  weatherSeal: 'Dual EPDM (ethylene propylene diene monomer) compression gaskets',
  glazing: 'Single, double or triple glazing with air-tight sealant and desiccant',
  leadContent: '100% lead-free, Calcium-Zinc based formulation',
  rawMaterial: 'European-sourced raw material',
  locking: 'Multi-point locking (2–3 points)',
  soundReduction: 'Up to 40dB sound transmission reduction',
} as const;

export const laminateInfo = {
  origin: 'Imported from Europe',
  coating: 'PVDF-equipped coating, European hot-melt lamination with high-performance PUR adhesives',
  warranty: '20-year warranty',
} as const;

// 3-5 representative regional offices, out of 20+ listed on the live site.
export const sampleCities = [
  { name: 'Coimbatore', slug: 'coimbatore', region: 'Tamil Nadu', isHQ: true },
  { name: 'Chennai', slug: 'chennai', region: 'Tamil Nadu' },
  { name: 'Bangalore', slug: 'bangalore', region: 'Karnataka' },
  { name: 'Hyderabad', slug: 'hyderabad', region: 'Telangana' },
  { name: 'Mumbai', slug: 'mumbai', region: 'Maharashtra' },
] as const;

export const legacyRedirects: Record<string, string> = {
  '/upvc-windows/': '/windows/',
  '/upvc-windows/inventa-casement-window-system/': '/windows/casement/',
  '/upvc-windows/upvc-inventa-sliding-window-system/': '/windows/sliding/',
  '/upvc-windows/inventa-tilt-and-turn-window-system/': '/windows/tilt-turn/',
  '/upvc-windows/optima-casement-window-system/': '/windows/casement/',
  '/upvc-windows/optima-sliding-window-system/': '/windows/sliding/',
  '/upvc-windows/prominance-upvc-windows-laminates-options/': '/colours/',
  '/upvc-doors/': '/doors/',
  '/upvc-doors/upvc-door-inventa-casement-style-system/': '/doors/casement/',
  '/upvc-doors/inventa-sliding-door-system/': '/doors/sliding/',
  '/upvc-doors/inventa-slide-and-fold-door-system/': '/doors/slide-fold/',
  '/about-prominance/': '/why-prominance/',
  '/about-prominance/why-choose-prominance-upvc/': '/why-prominance/',
  '/about-prominance/prominance-infrastructure-upvc-window-profiles/': '/why-prominance/infrastructure/',
  '/about-prominance/quality-assurance-accreditation-bsi-skz/': '/why-prominance/quality-standards/',
  '/upvc-windows-faqs/': '/resources/faqs/',
  '/prominance-upvc-windows-downloads/': '/resources/downloads/',
  '/prominance-contact-us/': '/contact/',
  '/upvc-windows-prominance-contact-us-today/': '/quote/',
};
