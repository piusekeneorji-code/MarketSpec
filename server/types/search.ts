import { ProductQueryUnderstanding } from './queryUnderstanding';
import { ProductResearchReport } from './research';

export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface SpecificationItem {
  key: string;
  value: string;
  unit?: string;
}

export interface SourcePriceItem {
  id: string;
  sourceName: string;
  title: string;
  price: number;
  currency: string;
  unitOfMeasure: string;
  url: string;
  observedDate?: string;
  sourceType: 'distributor' | 'retail' | 'manufacturer' | 'marketplace' | 'specialty';
}

export interface EstimatedPriceData {
  typical: number;
  min: number;
  max: number;
  currency: string;
  unitOfMeasure: string;
  isEstimatedNotice: string;
}

export interface MarketResearchResult {
  query: string;
  productName: string;
  category: string;
  description: string;
  specifications: SpecificationItem[];
  brandsOrVariants: string[];
  estimatedPrice: EstimatedPriceData;
  sourcePrices: SourcePriceItem[];
  confidenceLevel: ConfidenceLevel;
  confidenceReason: string;
  assumptionsAndUncertainties: string[];
  understanding?: ProductQueryUnderstanding;
  researchReport?: ProductResearchReport;
  timestamp: string;
}

export interface SearchApiRequest {
  query: string;
  currency?: string;
}

export interface SearchApiResponse {
  success: boolean;
  data?: MarketResearchResult;
  error?: string;
  details?: string;
}
