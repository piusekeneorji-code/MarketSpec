/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { SearchHero } from './components/SearchHero';
import { StatsRow } from './components/StatsRow';
import { SourcesLogoStrip } from './components/SourcesLogoStrip';
import { HowItWorks } from './components/HowItWorks';
import { BentoFeatures } from './components/BentoFeatures';
import { DarkContrastSection } from './components/DarkContrastSection';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { ResultsSection } from './components/ResultsSection';
import { MethodologyModal } from './components/MethodologyModal';
import { Footer } from './components/Footer';
import { MarketResearchResult } from './types/market';
import { executeSearchProduct, ApiError } from './services/api';

export default function App() {
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [activeQuery, setActiveQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MarketResearchResult | null>(null);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState<boolean>(false);

  const activeSubmissionRef = useRef<string | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const scrollToSearch = () => {
    const el = document.getElementById('search-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = async (queryText: string) => {
    const trimmed = queryText.trim().replace(/\s+/g, ' ');
    if (!trimmed) {
      setError('Please enter a valid product or material name.');
      return;
    }

    if (isLoading && activeSubmissionRef.current === trimmed) {
      return;
    }

    activeSubmissionRef.current = trimmed;
    setCurrentQuery(trimmed);
    setActiveQuery(trimmed);
    setIsLoading(true);
    setError(null);

    try {
      const data = await executeSearchProduct(trimmed);
      setResult(data);
      setError(null);

      // Smooth scroll to results on mobile/desktop
      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err: unknown) {
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
    scrollToSearch();
  };

  const handleRetry = () => {
    if (activeQuery) {
      handleSearch(activeQuery);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-slate-900 font-sans selection:bg-orange-200 selection:text-orange-900">
      {/* SaaS Navigation */}
      <Navbar
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        onResetSearch={handleReset}
        onScrollToSearch={scrollToSearch}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* 1. Hero with search bar and drifting floating cards */}
        <SearchHero
          initialQuery={currentQuery}
          isLoading={isLoading}
          onSearch={handleSearch}
          compact={result !== null || isLoading}
        />

        {/* Results / Loading / Error Container */}
        <div ref={resultsRef}>
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
            <ResultsSection data={result} onReset={handleReset} />
          )}
        </div>

        {/* 2. Stats Row in Soft Cards with Count-up Animation */}
        <StatsRow />

        {/* 3. Trusted-by / Sources Logo Strip */}
        <SourcesLogoStrip />

        {/* 4. How It Works (Search, AI Research, Price Estimate) */}
        <HowItWorks />

        {/* 5. Features in Bento-Style Layout */}
        <BentoFeatures />

        {/* 6. One Dark Contrasting Section with Large Number Counter */}
        <DarkContrastSection onScrollToSearch={scrollToSearch} />
      </main>

      {/* Methodology Modal */}
      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />

      {/* 7. Footer with Clean SaaS Layout */}
      <Footer
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        onScrollToTop={scrollToTop}
      />
    </div>
  );
}
