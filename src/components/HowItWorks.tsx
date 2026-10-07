import React from 'react';
import { Search, Brain, Calculator, ArrowRight, ShieldCheck } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Natural-Language Search',
    tag: 'INPUT STAGE',
    description: 'Type whatever you need in plain text—dimensions, grades, or brand codes (e.g. "12mm marine plywood", "Samsung A55", "stainless steel pipe 2 inch").',
    details: 'Preserves units, schedules, thicknesses, and location context without requiring restrictive drop-down menus.',
    icon: Search,
  },
  {
    step: '02',
    title: 'AI Web Research Agent',
    tag: 'DISCOVERY STAGE',
    description: 'Our system analyzes technical requirements, formulates targeted supplier search queries, and scans current online distributor catalogs and retail sites.',
    details: 'Filters out irrelevant blogs and forum chatter, extracting only factual product listings, specifications, and listed quotes.',
    icon: Brain,
  },
  {
    step: '03',
    title: 'Price Estimate & Source Links',
    tag: 'SYNTHESIS STAGE',
    description: 'Calculates a statistical market price range and typical median, fully supported by clickable source links, confidence scores, and uncertainty disclosures.',
    details: 'Never presents an ungrounded or fabricated number as a verified quote. You always see exactly where the price was observed.',
    icon: Calculator,
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-20">
      {/* Pill Label & Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-800">
          <ShieldCheck className="h-3.5 w-3.5 text-orange-600" />
          <span>THE 3-STEP PIPELINE</span>
        </div>
        <h2 className="font-anton text-3xl sm:text-5xl tracking-tight text-slate-900 uppercase">
          HOW MARKETSPEC WORKS
        </h2>
        <p className="font-playfair text-base sm:text-lg text-slate-600 italic">
          From a simple natural-language query to a verified market valuation backed by empirical citations.
        </p>
      </div>

      {/* 3 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {STEPS.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={s.step}
              className="relative rounded-3xl border border-slate-200/90 bg-white p-8 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg hover:border-orange-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-anton text-4xl text-orange-600/90">
                    {s.step}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                  {s.tag}
                </span>

                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                  {s.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {s.description}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4 text-xs text-slate-500 leading-relaxed bg-slate-50/60 -mx-8 -mb-8 p-6 rounded-b-3xl">
                <strong className="text-slate-700 font-semibold block mb-0.5">Why it matters:</strong>
                {s.details}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
