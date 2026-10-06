/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { SearchHero } from './components/SearchHero';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { EmptyState } from './components/EmptyState';
import { ResultView } from './components/ResultView';
import { MethodologyModal } from './components/MethodologyModal';
import { MarketResearchResult } from './types/market';
import { executeSearchProduct, ApiError } from './services/api';

export default function App() {
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [activeQuery, setActiveQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MarketResearchResult | null>(null);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState<boolean>(false);
  
  // Guard against accidental rapid duplicate submissions
  const activeSubmissionRef = useRef<string | null>(null);

  const handleSearch = async (queryText: string) => {
    const trimmed = queryText.trim().replace(/\s+/g, ' ');
    if (!trimmed) {
      setError('Please enter a valid product or material name.');
      return;
    }

    // Prevent duplicate submission of identical query while active
    if (isLoading && activeSubmissionRef.current === trimmed) {
      return;
    }

    activeSubmissionRef.current = trimmed;
    setCurrentQuery(trimmed);
    setActiveQuery(trimmed);
    setIsLoading(true);
    setError(null);

    try {
      // Dispatches to secure server-side endpoint /api/search
      const data = await executeSearchProduct(trimmed);
      setResult(data);
      setError(null);
    } catch (err: unknown) {
      // Ignore cancelled requests triggered by new query
      if (err instanceof ApiError && err.statusCode === 0) {
        return;
      }
      const msg = err instanceof Error ? err.message : 'An error occurred while connecting to the server.';
      setError(msg);
      setResult(null);
    } finally {
      setIsLoading(false);
      activeSubmissionRef.current = null;
    }
  };

  const handleReset = () => {
    setCurrentQuery('');
    setActiveQuery('');
    setResult(null);
    setError(null);
    setIsLoading(false);
    activeSubmissionRef.current = null;
  };

  const handleRetry = () => {
    if (activeQuery) {
      handleSearch(activeQuery);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navigation */}
      <Navbar
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        onResetSearch={handleReset}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Search Hero */}
        <SearchHero
          initialQuery={currentQuery}
          isLoading={isLoading}
          onSearch={handleSearch}
          compact={result !== null || isLoading}
        />

        {/* Dynamic Display State */}
        {isLoading && <LoadingState query={activeQuery} />}

        {!isLoading && error && (
          <ErrorState
            message={error}
            onRetry={handleRetry}
            onReset={handleReset}
            onSelectSuggestion={(suggestion) => handleSearch(suggestion)}
          />
        )}

        {!isLoading && !error && result && (
          <ResultView data={result} onReset={handleReset} />
        )}

        {!isLoading && !error && !result && (
          <EmptyState onSelectQuery={(suggestion) => handleSearch(suggestion)} />
        )}
      </main>

      {/* Methodology Modal */}
      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />

      {/* Clean Global Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">MarketSpec Engine</span>
            <span>&bull;</span>
            <span>Text-Based Product & Material Price Research</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <button
              onClick={() => setIsMethodologyOpen(true)}
              className="hover:text-blue-600 transition"
            >
              Methodology
            </button>
            <span>&bull;</span>
            <span>Zero Hallucinated Prices Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
