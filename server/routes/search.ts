import { Router, Request, Response } from 'express';
import { searchProduct, ValidationError } from '../services/searchProduct';
import { understandProductQuery, QueryUnderstandingError } from '../services/aiQueryUnderstanding';
import { researchProduct } from '../services/researchProduct';
import { SearchApiResponse } from '../types/search';
import { ProductQueryUnderstanding } from '../types/queryUnderstanding';

export const searchRouter = Router();

searchRouter.post('/search', async (req: Request, res: Response<SearchApiResponse>) => {
  try {
    const rawQuery = req.body?.query;
    const result = await searchProduct(rawQuery);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    if (error instanceof QueryUnderstandingError) {
      return res.status(error.statusCode).json({
        success: false,
        error: error.message,
      });
    }

    console.error('Unhandled server error during searchProduct:', error);
    const message = error instanceof Error ? error.message : 'An unexpected server error occurred.';
    return res.status(500).json({
      success: false,
      error: message,
    });
  }
});

/**
 * Direct endpoint for the AI query-understanding layer.
 * Returns the exact ProductQueryUnderstanding schema.
 */
searchRouter.post('/understand-query', async (req: Request, res: Response) => {
  try {
    const rawQuery = req.body?.query;
    if (typeof rawQuery !== 'string' || !rawQuery.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Query parameter must be a non-empty string.',
      });
    }

    const understanding = await understandProductQuery(rawQuery.trim());
    return res.status(200).json({
      success: true,
      data: understanding,
    });
  } catch (error: unknown) {
    if (error instanceof QueryUnderstandingError) {
      return res.status(error.statusCode).json({
        success: false,
        error: error.message,
      });
    }

    console.error('Unhandled server error during understandProductQuery:', error);
    const message = error instanceof Error ? error.message : 'An unexpected server error occurred.';
    return res.status(500).json({
      success: false,
      error: message,
    });
  }
});

/**
 * Direct endpoint for the product research layer.
 * Accepts either:
 * - { understanding: ProductQueryUnderstanding }
 * - OR { query: string } (runs understandProductQuery first)
 * Returns the exact ProductResearchReport schema.
 */
searchRouter.post('/research', async (req: Request, res: Response) => {
  try {
    let understanding: ProductQueryUnderstanding;

    if (req.body?.understanding && typeof req.body.understanding === 'object') {
      understanding = req.body.understanding as ProductQueryUnderstanding;
    } else if (typeof req.body?.query === 'string' && req.body.query.trim()) {
      understanding = await understandProductQuery(req.body.query.trim());
    } else {
      return res.status(400).json({
        success: false,
        error: 'Must provide either "query" string or "understanding" object in request body.',
      });
    }

    const report = await researchProduct(understanding);
    return res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error: unknown) {
    console.error('Unhandled server error during /api/research:', error);
    const message = error instanceof Error ? error.message : 'An unexpected server error occurred.';
    return res.status(500).json({
      success: false,
      error: message,
    });
  }
});

searchRouter.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});
