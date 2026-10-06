import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Sparkles, CornerDownLeft, AlertCircle } from 'lucide-react';
import { MAX_QUERY_LENGTH } from '../services/api';

interface SearchHeroProps {
  initialQuery?: string;
  isLoading: boolean;
  onSearch: (query: string) => void;
  compact?: boolean;
}

export const EXAMPLE_SUGGESTIONS = [
  '12mm plywood',
  'cement board',
  'Samsung A55',
  'industrial safety helmet',
  'office chair',
  'stainless steel pipe 2 inch'
];

export const SearchHero: React.FC<SearchHeroProps> = ({
  initialQuery = '',
  isLoading,
  onSearch,
  compact = false
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [validationError, setValidationError] = useState<string | null>(null);
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setValidationError(null);

    // Prevent duplicate submission triggers
    if (isLoading || isSubmittingRef.current) {
      return;
    }

    const trimmed = query.trim().replace(/\s+/g, ' ');

    if (!trimmed) {
      setValidationError('Please enter a product or material name to search.');
      return;
    }

    if (trimmed.length > MAX_QUERY_LENGTH) {
      setValidationError(`Query exceeds maximum limit of ${MAX_QUERY_LENGTH} characters (currently ${trimmed.length}).`);
      return;
    }

    isSubmittingRef.current = true;
    onSearch(trimmed);

    // Release submission lock after brief tick
    setTimeout(() => {
      isSubmittingRef.current = false;
    }, 400);
  };

  const handleChipClick = (suggestion: string) => {
    if (isLoading || isSubmittingRef.current) return;
    setValidationError(null);
    setQuery(suggestion);
    isSubmittingRef.current = true;
    onSearch(suggestion);
    setTimeout(() => {
      isSubmittingRef.current = false;
    }, 400);
  };

  const handleClear = () => {
    setQuery('');
    setValidationError(null);
  };

  return (
    <section className={`w-full transition-all ${compact ? 'py-4 sm:py-6' : 'py-8 sm:py-14'}`}>
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        {!compact && (
          <div className="mb-6 space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 text-xs font-medium text-blue-700 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>Grounded Text Search & Price Discovery</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Research real market prices & specifications by text
            </h1>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Enter any physical product, material grade, or industrial hardware. The system analyzes technical
              attributes, queries real-world retail and distributor sources, and produces a transparent price estimate with citations.
            </p>
          </div>
        )}

        {/* Search Box Form */}
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl text-left">
          <div
            className={`relative rounded-2xl border-2 bg-white p-1.5 shadow-lg shadow-slate-200/50 transition ${
              validationError
                ? 'border-red-400 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-100'
                : 'border-slate-300 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100'
            }`}
          >
            <div className="flex items-center">
              <div className="pl-3 text-slate-400">
                <Search className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <input
                type="text"
                value={query}
                maxLength={MAX_QUERY_LENGTH}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                disabled={isLoading}
                placeholder="Search an item (e.g., 12mm plywood, cement board, Samsung A55)..."
                aria-label="Product or material search query"
                className="w-full bg-transparent px-3 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none sm:py-4 sm:text-base disabled:opacity-50"
              />

              {query && !isLoading && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label="Clear search input"
                >
                  <X className="h-5 w-5" />
                </button>
              )}

              <button
                type="submit"
                disabled={!query.trim() || isLoading}
                className="ml-2 flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 sm:px-6 sm:py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <span>{isLoading ? 'Searching...' : 'Search'}</span>
                {!isLoading && <CornerDownLeft className="hidden h-4 w-4 sm:inline-block opacity-70" />}
              </button>
            </div>
          </div>

          {/* Validation Notice & Character Count */}
          <div className="mt-2 flex items-center justify-between px-2 text-xs">
            {validationError ? (
              <span className="flex items-center gap-1 text-red-600 font-medium">
                <AlertCircle className="h-3.5 w-3.5" />
                {validationError}
              </span>
            ) : (
              <span className="text-slate-400">Max {MAX_QUERY_LENGTH} characters &bull; Sanitized text search</span>
            )}
            {query.length > 120 && (
              <span className={`text-[11px] ${query.length >= MAX_QUERY_LENGTH ? 'text-red-500 font-bold' : 'text-slate-400'}`}>
                {query.length} / {MAX_QUERY_LENGTH}
              </span>
            )}
          </div>
        </form>

        {/* Suggestion Chips */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 pt-1 text-xs sm:text-sm">
          <span className="font-medium text-slate-500">Try searching:</span>
          {EXAMPLE_SUGGESTIONS.map((item) => (
            <button
              key={item}
              type="button"
              disabled={isLoading}
              onClick={() => handleChipClick(item)}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-xs transition hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-700 focus:outline-none disabled:opacity-50"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
