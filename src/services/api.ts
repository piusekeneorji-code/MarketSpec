import { MarketResearchResult } from '../types/market';

export const MAX_QUERY_LENGTH = 200;

export class ApiError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

let activeAbortController: AbortController | null = null;

/**
 * Sends a validated search query to the secure backend endpoint /api/search.
 * Cancels previous pending requests to prevent duplicate in-flight responses.
 */
export async function executeSearchProduct(rawQuery: string): Promise<MarketResearchResult> {
  // 1. Client-side whitespace trimming
  const trimmed = rawQuery.trim().replace(/\s+/g, ' ');

  // 2. Validate empty query
  if (!trimmed) {
    throw new ApiError('Query cannot be empty. Please enter a product or material name.', 400);
  }

  // 3. Validate maximum query length
  if (trimmed.length > MAX_QUERY_LENGTH) {
    throw new ApiError(
      `Query is too long (${trimmed.length} characters). Maximum allowed is ${MAX_QUERY_LENGTH} characters.`,
      400
    );
  }

  // 4. Abort previous in-flight request if present
  if (activeAbortController) {
    activeAbortController.abort();
  }
  activeAbortController = new AbortController();
  const currentSignal = activeAbortController.signal;

  try {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: trimmed }),
      signal: currentSignal,
    });

    let json;
    try {
      json = await response.json();
    } catch {
      throw new ApiError('Server returned an unreadable response format.', response.status);
    }

    if (!response.ok || !json.success) {
      const errorMsg = json.error || `Server responded with status code ${response.status}.`;
      throw new ApiError(errorMsg, response.status);
    }

    return json.data as MarketResearchResult;
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError('Search cancelled by new user query.', 0);
    }
    if (error instanceof ApiError) {
      throw error;
    }
    const message = error instanceof Error ? error.message : 'Network error or server connection failed.';
    throw new ApiError(message, 500);
  } finally {
    if (activeAbortController?.signal === currentSignal) {
      activeAbortController = null;
    }
  }
}
