import React from 'react';
import { Layers, ShieldCheck, FileText, ArrowUpRight, Wrench, HardHat, Smartphone, Globe } from 'lucide-react';
import { Card3D } from './Card3D';

interface EmptyStateProps {
  onSelectQuery: (query: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onSelectQuery }) => {
  const categoryHighlights = [
    {
      category: 'CONSTRUCTION MATERIALS',
      badge: 'BUILDING',
      accent: 'amber',
      description: 'Dimensional timber, cement backer units, structural plywood & insulation.',
      samples: ['12mm plywood', 'cement board']
    },
    {
      category: 'INDUSTRIAL HARDWARE',
      badge: 'SAFETY & METALS',
      accent: 'blue',
      description: 'Piping schedules, ANSI/OSHA climbing hard hats, raw alloys & fittings.',
      samples: ['industrial safety helmet', 'stainless steel pipe 2 inch']
    },
    {
      category: 'CONSUMER & COMMERCIAL',
      badge: 'DEVICES & SEATING',
      accent: 'neutral',
      description: 'Ergonomic task seating, mobile electronics, and commercial equipment.',
      samples: ['office chair', 'Samsung A55']
    }
  ];

  return (
    <div id="categories" className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-12">
      {/* 3 Core Value Pillars in 3D Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card3D glowColor="blue" className="border border-white/10 bg-[#0d111d]/90 p-6 backdrop-blur-xl">
          <div className="font-anton text-3xl text-blue-500/80 mb-2">01</div>
          <h3 className="font-playfair text-xl font-bold text-white mb-2">
            Empirical Price Ranges
          </h3>
          <p className="font-space text-xs text-slate-400 leading-relaxed">
            Synthesizes current retail and distributor quotes into typical medians and statistical min–max ranges.
          </p>
        </Card3D>

        <Card3D glowColor="amber" className="border border-white/10 bg-[#0d111d]/90 p-6 backdrop-blur-xl">
          <div className="font-anton text-3xl text-amber-500/80 mb-2">02</div>
          <h3 className="font-playfair text-xl font-bold text-white mb-2">
            Preserved Specifications
          </h3>
          <p className="font-space text-xs text-slate-400 leading-relaxed">
            Isolates exact dimensions, ASTM/ANSI material grades, and tolerances without inventing false attributes.
          </p>
        </Card3D>

        <Card3D glowColor="neutral" className="border border-white/10 bg-[#0d111d]/90 p-6 backdrop-blur-xl">
          <div className="font-anton text-3xl text-indigo-400/80 mb-2">03</div>
          <h3 className="font-playfair text-xl font-bold text-white mb-2">
            Strict Source Grounding
          </h3>
          <p className="font-space text-xs text-slate-400 leading-relaxed">
            Every quote links directly to a verifiable supplier URL with confidence scores and disclosure of assumptions.
          </p>
        </Card3D>
      </div>

      {/* Suggested 3D Showcase Panels */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="font-anton text-2xl uppercase tracking-wider text-white">
              PROCUREMENT DOMAINS
            </h2>
            <p className="font-playfair text-xs italic text-slate-400">
              Select any standardized query to run instant 3D market research
            </p>
          </div>
          <span className="font-space text-xs text-blue-400 font-bold uppercase tracking-widest hidden sm:inline">
            LIVE RESEARCH
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categoryHighlights.map((cat) => (
            <Card3D
              key={cat.category}
              glowColor={cat.accent as any}
              className={`flex flex-col justify-between border border-white/10 p-6 backdrop-blur-xl ${
                cat.accent === 'amber'
                  ? 'bg-gradient-to-b from-[#18120d] to-[#0c0f17]'
                  : cat.accent === 'blue'
                  ? 'bg-gradient-to-b from-[#0c1527] to-[#0a0d16]'
                  : 'bg-gradient-to-b from-[#14121e] to-[#0a0d16]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-space text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-slate-300">
                    {cat.badge}
                  </span>
                  <Globe className="h-4 w-4 text-slate-500" />
                </div>
                <h3 className="font-anton text-lg tracking-wide text-white uppercase mb-2">
                  {cat.category}
                </h3>
                <p className="font-space text-xs text-slate-400 mb-6 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="space-y-2 border-t border-white/10 pt-4">
                {cat.samples.map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => onSelectQuery(sample)}
                    className="group flex w-full items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-3.5 py-2.5 font-space text-xs font-medium text-slate-200 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
                  >
                    <span>{sample}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </div>
  );
};
