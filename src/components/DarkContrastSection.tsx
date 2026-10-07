import React from 'react';
import { ShieldCheck, ArrowRight, Sparkles, TrendingUp, Search } from 'lucide-react';

interface DarkContrastSectionProps {
  onScrollToSearch: () => void;
}

export const DarkContrastSection: React.FC<DarkContrastSectionProps> = ({ onScrollToSearch }) => {
  return (
    <section className="relative w-full bg-[#0b0f19] text-white py-24 sm:py-32 overflow-hidden my-12">
      {/* Ambient background glows */}
      <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-orange-600/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Kicker */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-orange-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>GROUNDED PRICE ASSURANCE</span>
          </div>

          <h2 className="font-anton text-4xl sm:text-6xl tracking-tight uppercase text-white">
            DESIGNED FOR ACCURACY, NOT GUESSWORK
          </h2>

          <p className="font-playfair text-base sm:text-xl text-slate-300 italic max-w-2xl mx-auto">
            Procurement teams, builders, and buyers lose millions to inflated vendor quotes and fabricated AI hallucination numbers.
          </p>
        </div>

        {/* Large Number Counter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-white/10 py-12 mb-16">
          <div className="text-center md:text-left space-y-2">
            <div className="font-anton text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight">
              $4.8<span className="text-orange-500">M+</span>
            </div>
            <h3 className="font-bold text-lg text-slate-200">
              Procurement Volume Researched
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xs">
              Estimated across commercial building supplies, structural timber, piping, and hardware queries.
            </p>
          </div>

          <div className="text-center md:text-left space-y-2 md:border-l md:border-white/10 md:pl-8">
            <div className="font-anton text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight">
              0<span className="text-orange-500">%</span>
            </div>
            <h3 className="font-bold text-lg text-slate-200">
              Fabricated Price Numbers
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xs">
              Strict policy: every price is grounded in verifiable supplier links or explicitly marked unquoted.
            </p>
          </div>

          <div className="text-center md:text-left space-y-2 md:border-l md:border-white/10 md:pl-8">
            <div className="font-anton text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight">
              100<span className="text-orange-500">%</span>
            </div>
            <h3 className="font-bold text-lg text-slate-200">
              Verifiable Source Links
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xs">
              Direct clickable distributor URLs preserved for every extracted quotation.
            </p>
          </div>
        </div>

        {/* Call to Action Inside Dark Section */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 sm:p-12 text-center backdrop-blur-md max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h3 className="font-anton text-2xl text-white uppercase tracking-wide">
              READY TO DISCOVER REAL MARKET PRICES?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Enter any item or material to run an instant research report.
            </p>
          </div>

          <button
            type="button"
            onClick={onScrollToSearch}
            className="flex items-center gap-2 rounded-2xl bg-orange-600 px-6 py-4 font-bold text-xs sm:text-sm uppercase tracking-wider text-white shadow-lg shadow-orange-600/30 transition-all hover:bg-orange-500 hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            <Search className="h-4 w-4" />
            <span>Search An Item Now</span>
          </button>
        </div>
      </div>
    </section>
  );
};
