import React, { useState } from 'react';
import { Search, X, Sparkles, CornerDownLeft } from 'lucide-react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const handleChipClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
  };

  const handleClear = () => {
    setQuery('');
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
          <div className="relative rounded-2xl border-2 border-slate-300 bg-white p-1.5 shadow-lg shadow-slate-200/50 transition focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100">
            <div className="flex items-center">
              <div className="pl-3 text-slate-400">
                <Search className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
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
        </form>

        {/* Suggestion Chips */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 pt-1 text-xs sm:text-sm">
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
