import { ProductQueryUnderstanding } from '../types/queryUnderstanding';
import { ProductResearchReport } from '../types/research';
import { IProductResearchProvider } from './research/researchProvider';
import { GeminiSearchResearchProvider } from './research/geminiSearchResearchProvider';

let currentResearchProvider: IProductResearchProvider = new GeminiSearchResearchProvider();

export function setResearchProvider(provider: IProductResearchProvider) {
  currentResearchProvider = provider;
}

export function getResearchProvider(): IProductResearchProvider {
  return currentResearchProvider;
}

/**
 * Main Service Abstraction: researchProduct(understanding)
 * 
 * Takes structured query understanding, queries web search provider,
 * filters irrelevant content, extracts verified product metadata and prices,
 * and preserves exact source URLs.
 */
export async function researchProduct(
  understanding: ProductQueryUnderstanding
): Promise<ProductResearchReport> {
  if (!understanding || typeof understanding !== 'object') {
    throw new Error('Invalid query understanding provided to researchProduct service.');
  }

  return await currentResearchProvider.researchProduct(understanding);
}
