import React, { useState, useRef, useEffect } from 'react';
import { Search, X, CornerDownLeft, ArrowRight } from 'lucide-react';
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

    if (isLoading || isSubmittingRef.current) return;

    const trimmed = query.trim().replace(/\s+/g, ' ');

    if (!trimmed) {
      setValidationError('Please enter a product or material name to search.');
      return;
    }

    if (trimmed.length > MAX_QUERY_LENGTH) {
      setValidationError(`Query exceeds maximum limit of ${MAX_QUERY_LENGTH} characters.`);
      return;
    }

    isSubmittingRef.current = true;
    onSearch(trimmed);

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
    <section
      id="search-section"
      className={`relative w-full transition-all duration-500 ${
        compact ? 'py-6' : 'pt-20 pb-20 sm:pt-28 sm:pb-28'
      }`}
    >
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        {/* Only the header text */}
        {!compact && (
          <div className="mb-10 sm:mb-12">
            <h1 className="font-anton text-4xl sm:text-6xl lg:text-7xl tracking-tight text-slate-900 uppercase leading-[1.05]">
              Know the real market price before you buy
            </h1>
          </div>
        )}

        {/* Glasslike / Semi-transparent Search Bar with slight edge shadow and very thin border */}
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl text-left">
          <div
            className={`group relative rounded-full border border-slate-900/[0.07] bg-white/70 backdrop-blur-xl p-1.5 sm:p-2 shadow-[0_8px_30px_rgb(0,0,0,0.05)] transition-all duration-300 ${
              validationError
                ? 'border-red-400 ring-2 ring-red-100'
                : 'hover:border-slate-900/15 focus-within:border-slate-900/20 focus-within:bg-white/90 focus-within:shadow-[0_12px_40px_rgb(0,0,0,0.08)]'
            }`}
          >
            <div className="flex items-center">
              <div className="pl-4 sm:pl-5 text-slate-400 group-focus-within:text-slate-700 transition-colors">
                <Search className="h-5 w-5 sm:h-5.5 sm:w-5.5" />
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
                placeholder="Search any product or material (e.g. 12mm plywood, Samsung A55)..."
                aria-label="Product or material search query"
                className="w-full bg-transparent px-3 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base font-normal text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:opacity-50"
              />

              {query && !isLoading && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-600 transition focus:outline-none"
                  aria-label="Clear input"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              <button
                type="submit"
                disabled={!query.trim() || isLoading}
                className="ml-1 sm:ml-2 flex items-center gap-1.5 rounded-full bg-slate-900 px-5 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-medium tracking-wide text-white transition-all hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:scale-100"
              >
                <span>{isLoading ? 'Searching...' : 'Search'}</span>
                {!isLoading && <CornerDownLeft className="hidden sm:inline-block h-3.5 w-3.5 opacity-60" />}
              </button>
            </div>
          </div>

          {/* Validation Error if any */}
          {validationError && (
            <div className="mt-2 px-4 text-xs font-medium text-red-600 text-center">
              {validationError}
            </div>
          )}
        </form>

        {/* Below that: "Search:" recommended items */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-xs sm:text-sm text-slate-500">
          <span className="font-normal text-slate-400">Search:</span>
          {EXAMPLE_SUGGESTIONS.map((item, idx) => (
            <React.Fragment key={item}>
              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleChipClick(item)}
                className="font-normal text-slate-600 hover:text-slate-900 hover:underline underline-offset-4 transition-colors focus:outline-none disabled:opacity-40"
              >
                {item}
              </button>
              {idx < EXAMPLE_SUGGESTIONS.length - 1 && (
                <span className="text-slate-300 select-none font-light">&bull;</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
