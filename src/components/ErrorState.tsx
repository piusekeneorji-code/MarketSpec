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
      <div className="rounded-3xl border border-red-200 bg-white p-8 sm:p-10 shadow-soft-lg">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <AlertCircle className="h-7 w-7" />
        </div>

        <h3 className="font-anton text-2xl tracking-wide text-slate-900 uppercase">
          RESEARCH REQUEST INTERRUPTED
        </h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
          {message || 'An unexpected issue occurred while querying supplier data.'}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onRetry}
            className="flex items-center gap-2 rounded-2xl bg-orange-600 px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md shadow-orange-500/25 transition-all hover:bg-orange-700 hover:scale-[1.02] active:scale-[0.98]"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>New Search</span>
          </button>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6 text-left">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Or try one of these standard items:
          </h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {EXAMPLE_SUGGESTIONS.slice(0, 4).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onSelectSuggestion(s)}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-800 transition"
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
