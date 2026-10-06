import { GoogleGenAI, Type } from '@google/genai';
import { ProductQueryUnderstanding } from '../types/queryUnderstanding';

export class QueryUnderstandingError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'QueryUnderstandingError';
    this.statusCode = statusCode;
  }
}

/**
 * Strict runtime schema validator for AI-generated query understanding response.
 * Verifies that the JSON payload meets all field and typing constraints.
 */
export function validateProductQueryUnderstanding(raw: unknown): ProductQueryUnderstanding {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    throw new QueryUnderstandingError('AI response is not a valid JSON object.');
  }

  const obj = raw as Record<string, unknown>;

  if (typeof obj.name !== 'string' || !obj.name.trim()) {
    throw new QueryUnderstandingError('Invalid AI response: "name" must be a non-empty string.');
  }

  if (typeof obj.category !== 'string' || !obj.category.trim()) {
    throw new QueryUnderstandingError('Invalid AI response: "category" must be a non-empty string.');
  }

  if (typeof obj.description !== 'string' || !obj.description.trim()) {
    throw new QueryUnderstandingError('Invalid AI response: "description" must be a non-empty string.');
  }

  const brand = typeof obj.brand === 'string' && obj.brand.trim() ? obj.brand.trim() : null;
  const model = typeof obj.model === 'string' && obj.model.trim() ? obj.model.trim() : null;
  const material = typeof obj.material === 'string' && obj.material.trim() ? obj.material.trim() : null;

  if (!Array.isArray(obj.specifications)) {
    throw new QueryUnderstandingError('Invalid AI response: "specifications" must be an array.');
  }
  const specifications = obj.specifications
    .filter((s): s is string => typeof s === 'string' && s.trim().length > 0)
    .map((s) => s.trim());

  if (!Array.isArray(obj.possible_variants)) {
    throw new QueryUnderstandingError('Invalid AI response: "possible_variants" must be an array.');
  }
  const possible_variants = obj.possible_variants
    .filter((v): v is string => typeof v === 'string' && v.trim().length > 0)
    .map((v) => v.trim());

  if (!Array.isArray(obj.search_queries) || obj.search_queries.length === 0) {
    throw new QueryUnderstandingError('Invalid AI response: "search_queries" must be a non-empty array.');
  }
  const search_queries = obj.search_queries
    .filter((q): q is string => typeof q === 'string' && q.trim().length > 0)
    .map((q) => q.trim());

  if (typeof obj.confidence !== 'number' || isNaN(obj.confidence)) {
    throw new QueryUnderstandingError('Invalid AI response: "confidence" must be a valid number.');
  }
  // Normalize confidence to 0..1 scale
  let confidence = obj.confidence;
  if (confidence > 1 && confidence <= 100) {
    confidence = confidence / 100;
  }
  confidence = Math.max(0, Math.min(1, confidence));

  if (!Array.isArray(obj.uncertainties)) {
    throw new QueryUnderstandingError('Invalid AI response: "uncertainties" must be an array.');
  }
  const uncertainties = obj.uncertainties
    .filter((u): u is string => typeof u === 'string' && u.trim().length > 0)
    .map((u) => u.trim());

  return {
    name: obj.name.trim(),
    category: obj.category.trim(),
    description: obj.description.trim(),
    brand,
    model,
    material,
    specifications,
    possible_variants,
    search_queries,
    confidence,
    uncertainties,
  };
}

const SYSTEM_INSTRUCTION = `You are a technical product procurement and material specification analyst.
Your task is to analyze user text searches for physical products, materials, items, or industrial equipment, and output a structured query understanding for subsequent web research.

Rules:
1. Understand natural-language product, device, and material searches accurately.
2. Identify and isolate technical specifications explicitly stated in the query (dimensions, thickness, grade, capacity, wattage, schedule, etc.).
3. Strictly preserve measurements, units, and quantities exactly as provided (e.g., "12mm", "2 inch", "Schedule 40", "5000mAh", "15/32 in").
4. Detect brand and model information where provided (e.g. brand: "Samsung", model: "Galaxy A55"). If not specified by user, set them to null.
5. Detect underlying physical material where applicable (e.g. "plywood", "cement", "stainless steel", "polyethylene"). If not clear, set to null.
6. Generate 3 to 6 targeted, highly effective search queries for finding current market prices and suppliers. Incorporate price, distributor, supplier, or location keywords (e.g., if a country/city is mentioned in user input like "in Nigeria", preserve location in search queries).
7. NEVER invent or hallucinate specifications that the user did not provide.
8. If the query is ambiguous, generic, or broad (e.g., "pipe", "chair", "wood"), acknowledge this by lowering the confidence score (e.g. 0.3 - 0.6) and listing specific ambiguities in "uncertainties". If specific, confidence should be 0.85 - 1.0.`;

/**
 * Deterministic fallback extractor for extreme upstream outage resilience.
 */
function generateDeterministicFallback(query: string): ProductQueryUnderstanding {
  const measurements: string[] = [];
  const measurementRegex = /\b\d+(?:\.\d+)?\s*(?:mm|cm|m|in|inch|"|'|ft|kg|g|lbs|mah|v|w|schedule\s*\d+|sch\s*\d+)\b/gi;
  let match;
  while ((match = measurementRegex.exec(query)) !== null) {
    measurements.push(match[0]);
  }

  const clean = query.replace(/\b(?:price|cost|supplier|in|for|buy)\b/gi, '').trim();
  const name = clean.charAt(0).toUpperCase() + clean.slice(1);

  return {
    name,
    category: 'Commercial & Industrial Products',
    description: `Procurement search for "${query}". Preserved measurements: ${measurements.join(', ') || 'standard sizing'}.`,
    brand: null,
    model: null,
    material: null,
    specifications: measurements.length > 0 ? measurements : ['Standard commercial specification'],
    possible_variants: [`${name} - Standard Grade`, `${name} - Commercial Variant`],
    search_queries: [
      `${query} price`,
      `${query} distributor supplier`,
      `${query} specification sheet datasheet`,
    ],
    confidence: 0.6,
    uncertainties: ['Fallback parsing used due to upstream demand spike.'],
  };
}

/**
 * Server-side AI Query-Understanding Service: understandProductQuery(query)
 * 
 * Invokes Gemini 3.8 Flash to interpret user's natural language input,
 * extracts technical properties, and generates targeted search queries.
 */
export async function understandProductQuery(query: string): Promise<ProductQueryUnderstanding> {
  const cleanQuery = query.trim().replace(/\s+/g, ' ');
  if (!cleanQuery) {
    throw new QueryUnderstandingError('Query cannot be empty.', 400);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    throw new QueryUnderstandingError(
      'Gemini API key is not configured on the server. Please check your GEMINI_API_KEY environment variable.',
      500
    );
  }

  const ai = new GoogleGenAI();

  // Call with retry for transient 503/429 spikes
  const maxAttempts = 3;
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `User search query: "${cleanQuery}"`,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: {
                type: Type.STRING,
                description: 'Clear, standardized product or material name derived from the query.',
              },
              category: {
                type: Type.STRING,
                description: 'Broad procurement or industry category (e.g. "Building Materials", "Electronics", "Industrial Piping").',
              },
              description: {
                type: Type.STRING,
                description: 'Concise summary of what the user is searching for and its intended industrial or commercial role.',
              },
              brand: {
                type: Type.STRING,
                description: 'Brand or manufacturer name if specified in the query, else null.',
              },
              model: {
                type: Type.STRING,
                description: 'Specific model or series identifier if specified, else null.',
              },
              material: {
                type: Type.STRING,
                description: 'Primary material composition (e.g. "plywood", "stainless steel 304", "polycarbonate"), else null.',
              },
              specifications: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Explicit specifications, dimensions, ratings, or grades directly identified from the query.',
              },
              possible_variants: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Common variants, grades, or packagings relevant to this item (e.g. "CDX", "Marine Grade", "128GB", "256GB").',
              },
              search_queries: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '3 to 6 targeted web search queries optimized for finding current distributor prices and suppliers.',
              },
              confidence: {
                type: Type.NUMBER,
                description: 'Confidence score from 0.0 (highly ambiguous) to 1.0 (highly specific and clear).',
              },
              uncertainties: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'List of ambiguities or missing details (e.g. unspecified thickness, finish, brand, or regional market).',
              },
            },
            required: [
              'name',
              'category',
              'description',
              'specifications',
              'possible_variants',
              'search_queries',
              'confidence',
              'uncertainties',
            ],
          },
        },
      });

      const responseText = response.text?.trim();
      if (!responseText) {
        throw new QueryUnderstandingError('Empty response received from AI service.');
      }

      let parsedJson: unknown;
      try {
        parsedJson = JSON.parse(responseText);
      } catch {
        throw new QueryUnderstandingError('Failed to parse AI response as valid JSON.');
      }

      // Strict schema validation
      return validateProductQueryUnderstanding(parsedJson);
    } catch (error: unknown) {
      lastError = error;
      const errorStr = String(error);
      const isTransient =
        errorStr.includes('503') ||
        errorStr.includes('UNAVAILABLE') ||
        errorStr.includes('429') ||
        errorStr.includes('high demand');

      if (isTransient && attempt < maxAttempts) {
        const delay = attempt * 1200 + Math.random() * 500;
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
      break;
    }
  }

  // If retries exhausted or rate quota exceeded, use deterministic fallback to maintain uninterrupted user experience
  const errorStr = String(lastError);
  if (
    errorStr.includes('503') ||
    errorStr.includes('UNAVAILABLE') ||
    errorStr.includes('high demand') ||
    errorStr.includes('429') ||
    errorStr.includes('RESOURCE_EXHAUSTED') ||
    errorStr.includes('quota')
  ) {
    console.warn('Gemini upstream rate limit or unavailable; serving deterministic fallback understanding.');
    return generateDeterministicFallback(cleanQuery);
  }

  if (lastError instanceof QueryUnderstandingError) {
    throw lastError;
  }

  const message = lastError instanceof Error ? lastError.message : 'Unknown AI service error';
  console.error('AI query understanding error:', lastError);
  throw new QueryUnderstandingError(`AI Query Understanding failed: ${message}`);
}
