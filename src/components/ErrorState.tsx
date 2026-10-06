import React from 'react';
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { EXAMPLE_SUGGESTIONS } from './SearchHero';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
  onReset: () => void;
  onSelectSuggestion: (suggestion: string) => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message,
  onRetry,
  onReset,
  onSelectSuggestion
}) => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-center sm:px-6">
      <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertCircle className="h-6 w-6" />
        </div>

        <h3 className="text-lg font-bold text-slate-900">Research Request Failed</h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          {message || 'An unexpected error occurred while gathering market data.'}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onRetry}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-blue-700 transition focus:outline-none"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition focus:outline-none"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Search</span>
          </button>
        </div>

        {/* Suggested alternatives */}
        <div className="mt-8 border-t border-slate-100 pt-6 text-left">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Or try one of these standard queries:
          </h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {EXAMPLE_SUGGESTIONS.slice(0, 4).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onSelectSuggestion(s)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
