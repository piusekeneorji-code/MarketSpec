import { MarketResearchResult } from '../types/market';

/**
 * Isolated mock repository for UI demonstration during MVP frontend setup.
 * Contains realistic research records for the user's primary test queries.
 */
export const SAMPLE_MOCK_RESULTS: Record<string, MarketResearchResult> = {
  '12mm plywood': {
    query: '12mm plywood',
    productName: '12mm Softwood/Hardwood CDX Plywood (4ft x 8ft)',
    category: 'Building Materials / Structural Timber',
    description: 'Standard 12mm (approx. 1/2 inch) CDX exterior-rated structural plywood sheet commonly utilized for roof decking, subfloors, and general construction sheeting.',
    specifications: [
      { key: 'Nominal Thickness', value: '12 mm (15/32 in)' },
      { key: 'Sheet Dimensions', value: '4 ft x 8 ft (1220 mm x 2440 mm)' },
      { key: 'Grade', value: 'CDX / Exposure 1' },
      { key: 'Core Construction', value: 'Cross-laminated wood veneers' },
      { key: 'Weight per Sheet', value: 'approx. 45 - 50 lbs (20 - 23 kg)' },
      { key: 'Standard Compliance', value: 'PS 1-19 / EN 636-2' }
    ],
    brandsOrVariants: [
      'Weyerhaeuser Edge Gold',
      'Georgia-Pacific CDX',
      'Roseburg RigidFloor',
      'Hardwood Birch 12mm BB/BB Variant'
    ],
    estimatedPrice: {
      typical: 28.50,
      min: 22.00,
      max: 38.00,
      currency: 'USD',
      unitOfMeasure: 'per 4x8 sheet',
      isEstimatedNotice: 'Statistical market estimate based on observed distributor and lumberyard pricing. Not a binding quote.'
    },
    sourcePrices: [
      {
        id: 's-1',
        sourceName: 'The Home Depot',
        title: '15/32 in. x 4 ft. x 8 ft. 3-Ply RTD Sheathing Plywood',
        price: 24.98,
        currency: 'USD',
        unitOfMeasure: 'per sheet',
        url: 'https://www.homedepot.com/p/15-32-in-x-4-ft-x-8-ft-Sheathing-Plywood/100067329',
        observedDate: 'Recent',
        sourceType: 'retail'
      },
      {
        id: 's-2',
        sourceName: "Lowe's Home Improvement",
        title: '1/2-in x 4-ft x 8-ft Southern Yellow Pine CDX Plywood',
        price: 26.48,
        currency: 'USD',
        unitOfMeasure: 'per sheet',
        url: 'https://www.lowes.com/pd/1-2-in-x-4-ft-x-8-ft-Plywood-Sheathing/100000000',
        observedDate: 'Recent',
        sourceType: 'retail'
      },
      {
        id: 's-3',
        sourceName: '84 Lumber Regional Distribution',
        title: 'Structural CDX Plywood 12mm 4x8 Exposure 1 (Bulk 50+ Units)',
        price: 21.80,
        currency: 'USD',
        unitOfMeasure: 'per sheet',
        url: 'https://www.84lumber.com/building-materials/lumber/plywood',
        observedDate: 'Recent',
        sourceType: 'distributor'
      },
      {
        id: 's-4',
        sourceName: 'Rockler Woodworking',
        title: '12mm Baltic Birch Plywood 4x8 BB/BB (Cabinet Grade)',
        price: 74.00,
        currency: 'USD',
        unitOfMeasure: 'per sheet',
        url: 'https://www.rockler.com/baltic-birch-plywood',
        observedDate: 'Recent',
        sourceType: 'specialty' as any
      }
    ],
    confidenceLevel: 'HIGH',
    confidenceReason: 'Consistent pricing across major national lumber yards and home improvement distributors for standard 4x8 CDX dimensions.',
    assumptionsAndUncertainties: [
      'Price assumes construction-grade CDX softwood; cabinet-grade Baltic Birch carries a 2.5x - 3x premium.',
      'Regional lumber transportation costs and local mill availability can fluctuate prices by ±15%.',
      'Contractor bulk rates (pallet of 60 sheets) typically reduce unit price by 10%–18%.'
    ],
    timestamp: new Date().toISOString()
  },

  'cement board': {
    query: 'cement board',
    productName: '1/2 in. Cement Backer Board (3ft x 5ft)',
    category: 'Building Materials / Tile Substrates',
    description: 'High-durability moisture-resistant cementitious backer unit engineered for wet-area tile installations including shower surrounds, bathroom walls, and flooring substrates.',
    specifications: [
      { key: 'Standard Thickness', value: '1/2 in. (12.7 mm)' },
      { key: 'Board Size', value: '3 ft x 5 ft (914 mm x 1524 mm)' },
      { key: 'Substrate Application', value: 'Walls, floors, countertops, exterior' },
      { key: 'Fire Rating', value: 'Class A Non-combustible' },
      { key: 'Weight per Board', value: 'approx. 35 - 40 lbs' }
    ],
    brandsOrVariants: [
      'HardieBacker 500 (1/2 in.)',
      'USG Durock Brand Cement Board',
      'WonderBoard Lite Backer Board',
      'PermaBase Cement Board'
    ],
    estimatedPrice: {
      typical: 14.50,
      min: 11.20,
      max: 18.00,
      currency: 'USD',
      unitOfMeasure: 'per 3x5 board',
      isEstimatedNotice: 'Statistical market estimate based on observed distributor and lumberyard pricing. Not a binding quote.'
    },
    sourcePrices: [
      {
        id: 's-1',
        sourceName: 'The Home Depot',
        title: 'HardieBacker 0.42 in. x 3 ft. x 5 ft. Cement Backerboard',
        price: 13.98,
        currency: 'USD',
        unitOfMeasure: 'per board',
        url: 'https://www.homedepot.com/p/James-Hardie-HardieBacker-3-ft-x-5-ft/100183556',
        observedDate: 'Recent',
        sourceType: 'retail'
      },
      {
        id: 's-2',
        sourceName: "Lowe's",
        title: 'USG Durock 1/2-in x 3-ft x 5-ft Cement Board',
        price: 14.98,
        currency: 'USD',
        unitOfMeasure: 'per board',
        url: 'https://www.lowes.com/pd/USG-Durock-Brand-1-2-in-x-3-ft-x-5-ft/3006429',
        observedDate: 'Recent',
        sourceType: 'retail'
      },
      {
        id: 's-3',
        sourceName: 'ABC Supply Co.',
        title: 'PermaBase 1/2 Cement Board Pallet Price (Pack of 50)',
        price: 11.50,
        currency: 'USD',
        unitOfMeasure: 'per board',
        url: 'https://www.abcsupply.com/products/drywall-plaster/cement-board',
        observedDate: 'Recent',
        sourceType: 'distributor'
      }
    ],
    confidenceLevel: 'HIGH',
    confidenceReason: 'Narrow price spread between USG Durock and HardieBacker across all primary building suppliers.',
    assumptionsAndUncertainties: [
      'Quotes reflect 3ft x 5ft format; larger 4ft x 8ft commercial formats scale proportionally higher.',
      'Does not include alkali-resistant fiberglass tape or polymer-modified thin-set mortar required for installation.'
    ],
    timestamp: new Date().toISOString()
  },

  'samsung a55': {
    query: 'Samsung A55',
    productName: 'Samsung Galaxy A55 5G Smartphone (128GB / 256GB)',
    category: 'Consumer Electronics / Mobile Phones',
    description: 'Mid-range Android smartphone featuring a 6.6-inch Super AMOLED 120Hz display, Exynos 1480 chipset, metal frame, 50MP triple camera system, and 5000mAh battery.',
    specifications: [
      { key: 'Display', value: '6.6" Super AMOLED, 120Hz, FHD+, HDR10+' },
      { key: 'Processor', value: 'Samsung Exynos 1480 (4nm)' },
      { key: 'RAM / Storage', value: '8GB RAM + 128GB or 256GB ROM' },
      { key: 'Main Camera', value: '50 MP (f/1.8, OIS) + 12 MP Ultra-wide + 5 MP Macro' },
      { key: 'Battery & Charging', value: '5,000 mAh, 25W fast charging' },
      { key: 'Protection', value: 'IP67 dust/water resistant, Gorilla Glass Victus+' }
    ],
    brandsOrVariants: [
      'Galaxy A55 5G 128GB (Awesome Navy / Iceblue / Lemon / Lilac)',
      'Galaxy A55 5G 256GB / 8GB RAM',
      'Dual-SIM International Unlocked Version (SM-A556B)'
    ],
    estimatedPrice: {
      typical: 349.00,
      min: 319.00,
      max: 420.00,
      currency: 'USD',
      unitOfMeasure: 'per unit',
      isEstimatedNotice: 'Statistical market estimate based on observed distributor and online retail pricing. Not a binding quote.'
    },
    sourcePrices: [
      {
        id: 's-1',
        sourceName: 'Amazon Global Store',
        title: 'Samsung Galaxy A55 5G (128GB / 8GB) Factory Unlocked International',
        price: 335.00,
        currency: 'USD',
        unitOfMeasure: 'per unit',
        url: 'https://www.amazon.com/dp/B0CX24C68B',
        observedDate: 'Recent',
        sourceType: 'marketplace'
      },
      {
        id: 's-2',
        sourceName: 'B&H Photo Video',
        title: 'Samsung Galaxy A55 Dual-SIM 128GB Smartphone (GSM Only)',
        price: 359.99,
        currency: 'USD',
        unitOfMeasure: 'per unit',
        url: 'https://www.bhphotovideo.com/c/product/samsung-galaxy-a55',
        observedDate: 'Recent',
        sourceType: 'retail'
      },
      {
        id: 's-3',
        sourceName: 'Best Buy Marketplace / Direct Import',
        title: 'Samsung Galaxy A55 5G 256GB Unlocked',
        price: 389.99,
        currency: 'USD',
        unitOfMeasure: 'per unit',
        url: 'https://www.bestbuy.com/site/samsung-galaxy-a55',
        observedDate: 'Recent',
        sourceType: 'retail'
      }
    ],
    confidenceLevel: 'HIGH',
    confidenceReason: 'Strong volume of current retail and marketplace listings for unlocked international SKUs.',
    assumptionsAndUncertainties: [
      'The A55 is primarily distributed in Europe, Asia, and Latin America; US pricing reflects gray-market import or unlocked GSM models without official US carrier warranty.',
      'Pricing varies between 128GB and 256GB storage capacities by roughly $40–$60.'
    ],
    timestamp: new Date().toISOString()
  },

  'industrial safety helmet': {
    query: 'industrial safety helmet',
    productName: 'ANSI Type I / Type II Industrial Safety Helmet with 4-Point Chin Strap',
    category: 'Industrial Safety / PPE (Personal Protective Equipment)',
    description: 'Modern climbing-style industrial safety hard hat with integrated foam impact liner, adjustable ratcheting suspension, 4-point chin strap, and accessory slots for ear protection and visors.',
    specifications: [
      { key: 'Safety Standard', value: 'ANSI/ISEA Z89.1-2014 Type I or II, Class E or C' },
      { key: 'Shell Material', value: 'High-density Polyethylene (HDPE) or Polycarbonate/ABS' },
      { key: 'Suspension System', value: '6-point wheel ratchet with sweatband' },
      { key: 'Chin Strap', value: '4-point secure strap with quick-release buckle' },
      { key: 'Ventilation', value: 'Vented (Class C) or Non-Vented (Class E Electrical up to 20,000V)' }
    ],
    brandsOrVariants: [
      'Milwaukee Bolt Safety Helmet',
      'Petzl Vertex Vent',
      'Kask Zenith X / Superplasma',
      'Klein Tools 60113 Vented Safety Helmet',
      'MSA V-Gard H1'
    ],
    estimatedPrice: {
      typical: 68.00,
      min: 24.50,
      max: 145.00,
      currency: 'USD',
      unitOfMeasure: 'per unit',
      isEstimatedNotice: 'Statistical market estimate based on observed distributor and safety catalog pricing. Not a binding quote.'
    },
    sourcePrices: [
      {
        id: 's-1',
        sourceName: 'Grainger Industrial Supply',
        title: 'Milwaukee BOLT White Type 1 Class C Front Brim Safety Helmet',
        price: 54.97,
        currency: 'USD',
        unitOfMeasure: 'per unit',
        url: 'https://www.grainger.com/product/MILWAUKEE-Safety-Helmet-BOLT',
        observedDate: 'Recent',
        sourceType: 'distributor'
      },
      {
        id: 's-2',
        sourceName: 'Petzl Professional Direct',
        title: 'Petzl VERTEX Vented Climbing Style Safety Helmet ANSI Type I',
        price: 119.95,
        currency: 'USD',
        unitOfMeasure: 'per unit',
        url: 'https://www.petzl.com/US/en/Professional/Helmets/VERTEX',
        observedDate: 'Recent',
        sourceType: 'manufacturer'
      },
      {
        id: 's-3',
        sourceName: 'Northern Safety & Industrial',
        title: 'Klein Tools Vented Hard Hat / Safety Helmet with Headlamp Mount',
        price: 49.98,
        currency: 'USD',
        unitOfMeasure: 'per unit',
        url: 'https://www.northernsafety.com/Product/Klein-Tools-Safety-Helmet',
        observedDate: 'Recent',
        sourceType: 'distributor'
      },
      {
        id: 's-4',
        sourceName: 'Global Industrial',
        title: 'Pyramex Ridgeline Type 1 Full Brim Hard Hat (Basic Entry)',
        price: 16.45,
        currency: 'USD',
        unitOfMeasure: 'per unit',
        url: 'https://www.globalindustrial.com/p/safety/ppe/hard-hats',
        observedDate: 'Recent',
        sourceType: 'distributor'
      }
    ],
    confidenceLevel: 'HIGH',
    confidenceReason: 'Wide market data across both low-cost standard brim hard hats and premium European-style climbing safety helmets.',
    assumptionsAndUncertainties: [
      'Basic non-climbing traditional hard hats cost $15–$25, whereas newer climbing helmets (Petzl/Kask) with chin straps cost $60–$140.',
      'Class E non-vented electrical protection helmets carry slight price variation over Class C vented styles.'
    ],
    timestamp: new Date().toISOString()
  },

  'office chair': {
    query: 'office chair',
    productName: 'Ergonomic Mesh Office Task Chair with Lumbar Support',
    category: 'Commercial & Home Furniture / Seating',
    description: 'Adjustable ergonomic mid-to-high-back desk chair featuring breathable mesh backrest, pneumatic height adjustment, synchronous tilt mechanism, and 3D adjustable armrests.',
    specifications: [
      { key: 'Backrest Material', value: 'Breathable elastomeric mesh' },
      { key: 'Weight Capacity', value: '275 - 330 lbs (125 - 150 kg)' },
      { key: 'Adjustability', value: 'Height, tilt tension, tilt lock, 3D armrests, lumbar pad' },
      { key: 'Base & Casters', value: '5-star heavy duty nylon/aluminum base with dual-wheel casters' },
      { key: 'Certification', value: 'BIFMA X5.1 commercial grade certified' }
    ],
    brandsOrVariants: [
      'Steelcase Series 1 / Series 2 / Gesture',
      'Herman Miller Aeron / Sayl (High-End Commercial)',
      'Autonomous ErgoChair Pro',
      'Branch Ergonomic Chair',
      'Ticova / Sihoo Ergonomic Mesh (Budget Consumer Tier)'
    ],
    estimatedPrice: {
      typical: 249.00,
      min: 119.00,
      max: 699.00,
      currency: 'USD',
      unitOfMeasure: 'per chair',
      isEstimatedNotice: 'Statistical market estimate based on observed distributor and furniture catalog pricing. Not a binding quote.'
    },
    sourcePrices: [
      {
        id: 's-1',
        sourceName: 'Staples Business Advantage',
        title: 'Union & Scale FlexFit Hyken Mesh Task Chair',
        price: 169.99,
        currency: 'USD',
        unitOfMeasure: 'per chair',
        url: 'https://www.staples.com/union-scale-flexfit-hyken-mesh-task-chair',
        observedDate: 'Recent',
        sourceType: 'retail'
      },
      {
        id: 's-2',
        sourceName: 'Branch Furniture Direct',
        title: 'Branch Ergonomic Chair (Contract Grade)',
        price: 349.00,
        currency: 'USD',
        unitOfMeasure: 'per chair',
        url: 'https://www.branchfurniture.com/products/ergonomic-chair',
        observedDate: 'Recent',
        sourceType: 'manufacturer'
      },
      {
        id: 's-3',
        sourceName: 'Steelcase Store',
        title: 'Steelcase Series 1 Ergonomic Work Chair',
        price: 493.00,
        currency: 'USD',
        unitOfMeasure: 'per chair',
        url: 'https://store.steelcase.com/seating/office-chairs/steelcase-series-1',
        observedDate: 'Recent',
        sourceType: 'manufacturer'
      },
      {
        id: 's-4',
        sourceName: 'Amazon Commercial',
        title: 'Ticova Ergonomic Office Chair with Adjustable Lumbar',
        price: 139.99,
        currency: 'USD',
        unitOfMeasure: 'per chair',
        url: 'https://www.amazon.com/dp/B08G8JBL8X',
        observedDate: 'Recent',
        sourceType: 'marketplace'
      }
    ],
    confidenceLevel: 'MEDIUM',
    confidenceReason: 'Office chair category exhibits extreme tier variance ranging from entry-level consumer chairs ($120) to commercial executive grade ($500+).',
    assumptionsAndUncertainties: [
      'Commercial contract warranty (10–12 years) chairs like Steelcase cost substantially more than consumer 1-year warranty models.',
      'Pricing does not include assembly services or corporate freight delivery.'
    ],
    timestamp: new Date().toISOString()
  },

  'stainless steel pipe 2 inch': {
    query: 'stainless steel pipe 2 inch',
    productName: '2-inch Schedule 40 Welded/Seamless 304/316 Stainless Steel Pipe',
    category: 'Industrial Piping / Raw Metals & Alloys',
    description: 'Commercial Schedule 40 standard wall stainless steel pipe (approx. 2.375" OD, 0.154" wall thickness) in Grade 304/304L or Grade 316/316L, sold by linear foot or standard 20-foot random lengths.',
    specifications: [
      { key: 'Nominal Pipe Size (NPS)', value: '2 in. (DN 50)' },
      { key: 'Outer Diameter (OD)', value: '2.375 in. (60.3 mm)' },
      { key: 'Wall Thickness', value: '0.154 in. (3.91 mm) - Schedule 40' },
      { key: 'Common Alloy Grades', value: 'ASTM A312 TP304 / TP304L or TP316 / TP316L' },
      { key: 'Manufacturing Type', value: 'Welded (ERW) or Seamless' },
      { key: 'Weight per Foot', value: 'approx. 3.65 lbs/ft (5.43 kg/m)' }
    ],
    brandsOrVariants: [
      'ASTM A312 Grade 304 Welded Sch 40 (Standard Commercial)',
      'ASTM A312 Grade 316 Welded Sch 40 (Marine/Chemical Resistant)',
      'Seamless 304 Sch 40 (High Pressure Applications)',
      'Sanitary Tubing ASTM A270 (Polished ID/OD for food/pharma)'
    ],
    estimatedPrice: {
      typical: 22.80,
      min: 16.50,
      max: 38.00,
      currency: 'USD',
      unitOfMeasure: 'per linear foot',
      isEstimatedNotice: 'Statistical market estimate based on metal distributor listings and mill surcharges. Not a binding quote.'
    },
    sourcePrices: [
      {
        id: 's-1',
        sourceName: 'McMaster-Carr',
        title: '304 Stainless Steel Welded Pipe, 2" Pipe Size, Schedule 40 (6 Ft Length)',
        price: 24.15,
        currency: 'USD',
        unitOfMeasure: 'per foot ($144.90 for 6ft)',
        url: 'https://www.mcmaster.com/pipe/stainless-steel-pipe/pipe-size~2/',
        observedDate: 'Recent',
        sourceType: 'distributor'
      },
      {
        id: 's-2',
        sourceName: 'OnlineMetals.com',
        title: '304 Stainless Steel Pipe 2" Sch 40 Welded Unpolished',
        price: 19.80,
        currency: 'USD',
        unitOfMeasure: 'per foot',
        url: 'https://www.onlinemetals.com/en/buy/stainless-steel/stainless-pipe-304-sch40',
        observedDate: 'Recent',
        sourceType: 'distributor'
      },
      {
        id: 's-3',
        sourceName: 'Midwest Steel & Alloy Supply',
        title: '316L Stainless Steel Pipe 2" Schedule 40 Welded (20ft Stick)',
        price: 31.50,
        currency: 'USD',
        unitOfMeasure: 'per foot ($630 stick)',
        url: 'https://www.midweststeelsupply.com/316-pipe',
        observedDate: 'Recent',
        sourceType: 'distributor'
      }
    ],
    confidenceLevel: 'HIGH',
    confidenceReason: 'Consistent pricing per foot across industrial metal supply catalogs for 304/316 Schedule 40 standard pipe.',
    assumptionsAndUncertainties: [
      'Alloy Grade 316 incurs a 30%–45% price surcharge compared to standard Grade 304 due to molybdenum content.',
      'Seamless piping is significantly higher priced than longitudinal welded (ERW) piping.',
      'Purchasing full 20-foot stick lengths reduces per-foot cost compared to cut-to-length retail purchases.'
    ],
    timestamp: new Date().toISOString()
  }
};

/**
 * Normalizes query string for mock lookup
 */
function normalizeQuery(q: string): string {
  return q.trim().toLowerCase().replace(/\s+/g, ' ');
}

/**
 * Generates an intelligent synthetic mock result for any unknown user query
 * during this frontend foundation phase so the user can test arbitrary inputs.
 */
function generateDynamicMock(rawQuery: string): MarketResearchResult {
  const clean = rawQuery.trim();
  const sampleLow = 45;
  const sampleHigh = 85;
  const sampleTypical = 62;

  return {
    query: clean,
    productName: `${clean.charAt(0).toUpperCase() + clean.slice(1)} (Commercial Standard)`,
    category: 'General Industrial & Commercial Goods',
    description: `Market specification profile and pricing observations for "${clean}". Detailed specifications and price quotes retrieved from distributor and retail sources.`,
    specifications: [
      { key: 'Target Query', value: clean },
      { key: 'Standard Classification', value: 'Commercial / Industrial Grade' },
      { key: 'Availability', value: 'Readily available via standard distribution channels' },
      { key: 'Packaging / Form Factor', value: 'Standard manufacturer unit packaging' }
    ],
    brandsOrVariants: [
      `${clean} - Standard Grade`,
      `${clean} - Heavy Duty / High-Spec Variant`,
      `${clean} - Contractor Bulk Package`
    ],
    estimatedPrice: {
      typical: sampleTypical,
      min: sampleLow,
      max: sampleHigh,
      currency: 'USD',
      unitOfMeasure: 'per unit',
      isEstimatedNotice: 'Statistical market estimate based on observed distributor and supplier listings. Not a binding quote.'
    },
    sourcePrices: [
      {
        id: 'dyn-1',
        sourceName: 'National Industrial Supply',
        title: `${clean} - Standard Commercial Specification`,
        price: sampleTypical,
        currency: 'USD',
        unitOfMeasure: 'per unit',
        url: 'https://www.google.com/search?q=' + encodeURIComponent(clean + ' price distributor'),
        observedDate: 'Recent',
        sourceType: 'distributor'
      },
      {
        id: 'dyn-2',
        sourceName: 'Commercial Direct Marketplace',
        title: `${clean} - Bulk Packaging SKU`,
        price: sampleLow,
        currency: 'USD',
        unitOfMeasure: 'per unit',
        url: 'https://www.google.com/search?q=' + encodeURIComponent(clean + ' wholesale supplier'),
        observedDate: 'Recent',
        sourceType: 'marketplace'
      }
    ],
    confidenceLevel: 'MEDIUM',
    confidenceReason: 'Simulated preview model. Real AI & live Google search grounding will connect in the subsequent phase.',
    assumptionsAndUncertainties: [
      'This preview is operating in isolated mock mode for UI testing.',
      'Real price ranges will be extracted directly from live web search citations once the backend is linked.',
      'Regional taxes, freight shipping, and volume tiering apply.'
    ],
    timestamp: new Date().toISOString()
  };
}

/**
 * Mock service function simulating search latency and error triggering.
 */
export async function mockSearchProduct(query: string): Promise<MarketResearchResult> {
  const trimmed = query.trim();
  if (!trimmed) {
    throw new Error('Please enter a product or material name to search.');
  }

  // Simulate network latency (800ms)
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Allow testing error state by typing "error"
  if (trimmed.toLowerCase() === 'error' || trimmed.toLowerCase() === 'trigger-error') {
    throw new Error('Unable to complete market research request. Connection timed out or source data could not be retrieved.');
  }

  const normalized = normalizeQuery(trimmed);

  // Exact or partial match in predefined mocks
  for (const [key, result] of Object.entries(SAMPLE_MOCK_RESULTS)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return result;
    }
  }

  // Fallback to dynamic mock for any custom typed query
  return generateDynamicMock(trimmed);
}
