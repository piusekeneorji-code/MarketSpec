import { ProductQueryUnderstanding } from '../../types/queryUnderstanding';
import { ProductResearchReport } from '../../types/research';

/**
 * Pluggable Search & Web Research Provider Abstraction.
 * Enables switching search providers (e.g. Google Search Grounding, Serper, Bing Search, Tavily, custom scraper)
 * without modifying UI, API routes, or downstream pricing logic.
 */
export interface IProductResearchProvider {
  name: string;
  researchProduct(understanding: ProductQueryUnderstanding): Promise<ProductResearchReport>;
}
