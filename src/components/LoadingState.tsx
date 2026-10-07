import React, { useEffect, useState } from 'react';
import { Loader2, Search, CheckCircle2, Database, Calculator, Sparkles } from 'lucide-react';

interface LoadingStateProps {
  query: string;
}

const STEPS = [
  { label: 'Deconstructing technical dimensions & queries', icon: Search },
  { label: 'Querying live distributor catalogs & Google Grounding', icon: Database },
  { label: 'Filtering noise & extracting verified source links', icon: Calculator },
  { label: 'Normalizing market specs & price quotes', icon: CheckCircle2 }
];

export const LoadingState: React.FC<LoadingStateProps> = ({ query }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setActiveStepIndex(1), 500);
    const timer2 = setTimeout(() => setActiveStepIndex(2), 1200);
    const timer3 = setTimeout(() => setActiveStepIndex(3), 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-6">
      {/* Loading Progress Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-soft-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 shadow-sm shadow-orange-500/20">
              <Loader2 className="h-6 w-6 animate-spin text-orange-600" />
            </div>
            <div>
              <h3 className="font-anton text-xl sm:text-2xl tracking-wide text-slate-900 uppercase">
                RESEARCHING &ldquo;{query}&rdquo;
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Scanning online distributor catalogs and extracting verified quotes
              </p>
            </div>
          </div>
          <span className="rounded-full bg-orange-50 border border-orange-200 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-700">
            RESEARCH ACTIVE
          </span>
        </div>

        {/* Step Checklist */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {STEPS.map((step, idx) => {
            const isCompleted = idx < activeStepIndex;
            const isCurrent = idx === activeStepIndex;
            const Icon = step.icon;

            return (
              <div
                key={step.label}
                className={`flex items-center gap-3 rounded-2xl border p-3.5 text-xs transition-all ${
                  isCurrent
                    ? 'border-orange-300 bg-orange-50/60 text-orange-950 font-semibold shadow-xs'
                    : isCompleted
                    ? 'border-slate-200 bg-slate-50/70 text-slate-700'
                    : 'border-slate-100 bg-transparent text-slate-400'
                }`}
              >
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    isCurrent
                      ? 'bg-orange-600 text-white animate-pulse'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {isCurrent ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Icon className="h-3.5 w-3.5" />
                  )}
                </div>
                <span className="flex-1 leading-snug">{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shimmer Skeletons with soft cards */}
      <div className="space-y-4">
        <div className="relative overflow-hidden h-36 w-full rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft">
          <div className="h-4 w-1/3 bg-slate-200 rounded-md mb-4" />
          <div className="h-8 w-1/2 bg-slate-200 rounded-md mb-2" />
          <div className="h-4 w-2/3 bg-slate-100 rounded-md" />
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative overflow-hidden h-28 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-soft">
            <div className="h-3 w-1/2 bg-slate-200 rounded mb-2" />
            <div className="h-6 w-3/4 bg-slate-200 rounded" />
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
          </div>
          <div className="relative overflow-hidden h-28 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-soft">
            <div className="h-3 w-1/2 bg-slate-200 rounded mb-2" />
            <div className="h-6 w-3/4 bg-slate-200 rounded" />
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
          </div>
          <div className="relative overflow-hidden h-28 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-soft">
            <div className="h-3 w-1/2 bg-slate-200 rounded mb-2" />
            <div className="h-6 w-3/4 bg-slate-200 rounded" />
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
};
