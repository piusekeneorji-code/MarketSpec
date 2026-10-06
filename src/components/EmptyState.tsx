import React from 'react';
import { Layers, ShieldAlert, FileText, ArrowRight, Wrench, HardHat, Smartphone } from 'lucide-react';

interface EmptyStateProps {
  onSelectQuery: (query: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onSelectQuery }) => {
  const categoryHighlights = [
    {
      category: 'Construction Materials',
      icon: Wrench,
      description: 'Dimensional lumber, cementitious boards, fasteners, and dry-lining substrates.',
      samples: ['12mm plywood', 'cement board']
    },
    {
      category: 'Industrial & Safety Hardware',
      icon: HardHat,
      description: 'Piping schedules, PPE compliance gear, ANSI/OSHA rated hardware.',
      samples: ['industrial safety helmet', 'stainless steel pipe 2 inch']
    },
    {
      category: 'Commercial Items & Devices',
      icon: Smartphone,
      description: 'Ergonomic task seating, electronics, and commercial equipment.',
      samples: ['office chair', 'Samsung A55']
    }
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* 3 Core Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-3">
            <Layers className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">Empirical Price Ranges</h3>
          <p className="mt-1 text-xs text-slate-500 leading-relaxed">
            Synthesizes current retail, wholesale, and distributor price points into a typical market median and range.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-3">
            <FileText className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">Technical Specifications</h3>
          <p className="mt-1 text-xs text-slate-500 leading-relaxed">
            Extracts dimensions, ASTM/ANSI material grades, core construction, and relevant manufacturer variations.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-3">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">Zero Unsupported Numbers</h3>
          <p className="mt-1 text-xs text-slate-500 leading-relaxed">
            All prices link to verifiable sources with confidence scores and explicit notes on shipping, volume, or grade.
          </p>
        </div>
      </div>

      {/* Suggested category panels */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Common Procurement Categories
          </h2>
          <span className="text-xs text-slate-400">Click any item to run instant research</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {categoryHighlights.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.category}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-blue-200 transition"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900">{cat.category}</h3>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">{cat.description}</p>
                </div>

                <div className="space-y-1.5 border-t border-slate-100 pt-3">
                  {cat.samples.map((sample) => (
                    <button
                      key={sample}
                      type="button"
                      onClick={() => onSelectQuery(sample)}
                      className="group flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
                    >
                      <span>{sample}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 transition" />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
