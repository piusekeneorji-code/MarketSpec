import React, { useEffect, useState } from 'react';
import { Loader2, Search, CheckCircle2, Database, Calculator } from 'lucide-react';

interface LoadingStateProps {
  query: string;
}

const STEPS = [
  { label: 'Analyzing technical query and specifications', icon: Search },
  { label: 'Querying distributor and marketplace sources', icon: Database },
  { label: 'Extracting verified price points and units', icon: Calculator },
  { label: 'Synthesizing market estimate & confidence score', icon: CheckCircle2 }
];

export const LoadingState: React.FC<LoadingStateProps> = ({ query }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setActiveStepIndex(1), 300);
    const timer2 = setTimeout(() => setActiveStepIndex(2), 600);
    const timer3 = setTimeout(() => setActiveStepIndex(3), 900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Progress header */}
      <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Researching market data for &ldquo;{query}&rdquo;
              </h3>
              <p className="text-xs text-slate-500">
                Scanning current product listings, distributor quotes, and technical specs
              </p>
            </div>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            Pipeline active
          </span>
        </div>

        {/* Step checklist */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {STEPS.map((step, idx) => {
            const isCompleted = idx < activeStepIndex;
            const isCurrent = idx === activeStepIndex;
            const Icon = step.icon;

            return (
              <div
                key={step.label}
                className={`flex items-center gap-3 rounded-xl border p-3 text-xs transition ${
                  isCurrent
                    ? 'border-blue-300 bg-blue-50/50 text-blue-900 font-medium'
                    : isCompleted
                    ? 'border-slate-200 bg-slate-50/50 text-slate-700'
                    : 'border-slate-100 text-slate-400'
                }`}
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full ${
                    isCurrent
                      ? 'bg-blue-600 text-white'
                      : isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {isCurrent ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Icon className="h-3.5 w-3.5" />
                  )}
                </div>
                <span className="flex-1">{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skeleton placeholders */}
      <div className="mt-6 space-y-4">
        <div className="h-32 w-full animate-pulse rounded-2xl bg-slate-200/70" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="h-28 animate-pulse rounded-2xl bg-slate-200/60" />
          <div className="h-28 animate-pulse rounded-2xl bg-slate-200/60" />
          <div className="h-28 animate-pulse rounded-2xl bg-slate-200/60" />
        </div>
        <div className="h-44 w-full animate-pulse rounded-2xl bg-slate-200/50" />
      </div>
    </div>
  );
};
