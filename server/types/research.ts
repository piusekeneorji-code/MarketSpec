export interface NormalizedProductSourceResult {
  source: string;
  title: string;
  url: string;
  seller: string | null;
  brand: string | null;
  product: string;
  price: number | null;
  currency: string | null;
  availability: string | null;
  specifications: string[];
  retrievedAt: string;
}

export interface ProductResearchReport {
  query: string;
  productName: string;
  searchQueriesUsed: string[];
  totalResultsFound: number;
  relevantResults: NormalizedProductSourceResult[];
  summary: string;
  retrievedAt: string;
}
