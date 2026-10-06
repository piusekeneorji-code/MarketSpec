import { MarketResearchResult } from '../types/search';
import { understandProductQuery } from './aiQueryUnderstanding';
import { researchProduct } from './researchProduct';
import { ProductQueryUnderstanding } from '../types/queryUnderstanding';
import { ProductResearchReport } from '../types/research';

export const MAX_QUERY_LENGTH = 200;
export const MIN_QUERY_LENGTH = 1;

export class ValidationError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

/**
 * Pluggable Search Provider Interface.
 * Allows switching search providers without modifying the service orchestration or frontend contract.
 */
export interface ISearchProvider {
  name: string;
  executeSearch(cleanQuery: string): Promise<MarketResearchResult>;
}

/**
 * End-to-end Product Research Search Provider.
 * Executes:
 * 1. AI Query Understanding (specifications, variants, research queries)
 * 2. Grounded Web Product Research (crawls/searches web, extracts specs, prices, sources)
 */
export class ProductResearchSearchProvider implements ISearchProvider {
  name = 'product-research-search-provider';

  async executeSearch(query: string): Promise<MarketResearchResult> {
    // 1. Understand query
    const understanding: ProductQueryUnderstanding = await understandProductQuery(query);

    // 2. Perform web product research using generated queries
    const researchReport: ProductResearchReport = await researchProduct(understanding);

    // Map extracted specifications into structured key-value items
    const specsList = [];
    if (understanding.material) {
      specsList.push({ key: 'Primary Material', value: understanding.material });
    }
    if (understanding.brand) {
      specsList.push({ key: 'Brand / Manufacturer', value: understanding.brand });
    }
    if (understanding.model) {
      specsList.push({ key: 'Model / Series', value: understanding.model });
    }
    understanding.specifications.forEach((spec, idx) => {
      specsList.push({ key: `Identified Spec ${idx + 1}`, value: spec });
    });

    // Also incorporate any newly discovered specs from web sources
    const extraSourceSpecs = new Set<string>();
    researchReport.relevantResults.forEach((r) => {
      r.specifications.forEach((s) => extraSourceSpecs.add(s));
    });
    let extraCount = 1;
    for (const spec of extraSourceSpecs) {
      if (specsList.length >= 8) break;
      if (!specsList.some((s) => s.value.toLowerCase() === spec.toLowerCase())) {
        specsList.push({ key: `Source Attribute ${extraCount++}`, value: spec });
      }
    }

    if (specsList.length === 0) {
      specsList.push({ key: 'Identified Spec', value: 'Standard commercial specification' });
    }

    // Map relevant results to source prices
    const sourcePrices = researchReport.relevantResults.map((r, idx) => {
      const srcLower = r.source.toLowerCase();
      let sourceType: 'distributor' | 'retail' | 'manufacturer' | 'marketplace' = 'distributor';
      if (srcLower.includes('amazon') || srcLower.includes('jumia') || srcLower.includes('ebay') || srcLower.includes('alibaba')) {
        sourceType = 'marketplace';
      } else if (srcLower.includes('home') || srcLower.includes('lowe') || srcLower.includes('walmart') || srcLower.includes('bestbuy')) {
        sourceType = 'retail';
      } else if (r.brand && srcLower.includes(r.brand.toLowerCase())) {
        sourceType = 'manufacturer';
      }

      return {
        id: `res-${idx + 1}`,
        sourceName: r.source || r.seller || 'Verified Supplier',
        title: r.title,
        price: r.price !== null ? r.price : 0,
        currency: r.currency || 'USD',
        unitOfMeasure: 'per unit',
        url: r.url,
        observedDate: 'Current Listing',
        sourceType,
      };
    });

    const confidenceLevel: 'HIGH' | 'MEDIUM' | 'LOW' =
      understanding.confidence >= 0.75 && researchReport.relevantResults.length > 0
        ? 'HIGH'
        : understanding.confidence >= 0.45 || researchReport.relevantResults.length > 0
        ? 'MEDIUM'
        : 'LOW';

    const confidenceReason =
      researchReport.relevantResults.length > 0
        ? `Found ${researchReport.relevantResults.length} active online sources and supplier listings. ${researchReport.summary}`
        : `Identified query intent (${Math.round(understanding.confidence * 100)}%), but limited supplier quotes currently available.`;

    const uncertainties =
      understanding.uncertainties.length > 0
        ? [...understanding.uncertainties]
        : [];
    if (researchReport.relevantResults.length === 0) {
      uncertainties.push('Web research returned no exact current supplier listings.');
    } else {
      uncertainties.push('Price calculation and valuation modeling scheduled for subsequent milestone.');
    }

    return {
      query,
      productName: understanding.name,
      category: understanding.category,
      description: understanding.description,
      specifications: specsList,
      brandsOrVariants: understanding.possible_variants,
      estimatedPrice: {
        typical: 0,
        min: 0,
        max: 0,
        currency: 'USD',
        unitOfMeasure: 'per unit',
        isEstimatedNotice: 'Price calculation engine not active in this research milestone. Verified web sources extracted below.',
      },
      sourcePrices,
      confidenceLevel,
      confidenceReason,
      assumptionsAndUncertainties: uncertainties,
      understanding,
      researchReport,
      timestamp: new Date().toISOString(),
    };
  }
}

// Active provider instance defaults to Full Product Research
let currentProvider: ISearchProvider = new ProductResearchSearchProvider();

export function setSearchProvider(provider: ISearchProvider) {
  currentProvider = provider;
}

/**
 * Main Backend Abstraction: searchProduct(query)
 * 
 * Validates, trims, sanitizes inputs and delegates to the configured search provider.
 */
export async function searchProduct(query: unknown): Promise<MarketResearchResult> {
  if (typeof query !== 'string') {
    throw new ValidationError('Invalid request: Query parameter must be a string.');
  }

  const trimmedQuery = query.trim().replace(/\s+/g, ' ');

  if (!trimmedQuery || trimmedQuery.length < MIN_QUERY_LENGTH) {
    throw new ValidationError('Query cannot be empty. Please enter a product or material name.');
  }

  if (trimmedQuery.length > MAX_QUERY_LENGTH) {
    throw new ValidationError(
      `Query is too long (${trimmedQuery.length} characters). Maximum allowed is ${MAX_QUERY_LENGTH} characters.`
    );
  }

  return await currentProvider.executeSearch(trimmedQuery);
}
