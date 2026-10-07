import React from 'react';
import { Layers, ShieldAlert, Globe, Compass, Cpu, Search, CheckCircle2, Lock } from 'lucide-react';

export const BentoFeatures: React.FC = () => {
  return (
    <section id="features" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-800">
          <Cpu className="h-3.5 w-3.5 text-orange-600" />
          <span>BUILT FOR PROCUREMENT &amp; ESTIMATION</span>
        </div>
        <h2 className="font-anton text-3xl sm:text-5xl tracking-tight text-slate-900 uppercase">
          INTELLIGENCE FEATURES
        </h2>
        <p className="font-playfair text-base sm:text-lg text-slate-600 italic">
          Designed specifically to prevent ungrounded AI hallucinations and deliver verifiable pricing insights.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Large 2-column Bento Box: Live Distributor Grounding */}
        <div className="md:col-span-2 rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-soft transition-all duration-300 hover:shadow-soft-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                <Globe className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700">
                100% GROUNDED
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              Real-Time Distributor &amp; Marketplace Grounding
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              Instead of relying on outdated training memory, our research engine actively searches live web endpoints.
              It retrieves current prices from commercial suppliers, lumber yards, hardware distributors, and retail catalogs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-100 pt-6">
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">COVERAGE</span>
              <span className="text-sm font-bold text-slate-800 mt-1 block">Building &amp; Hardware</span>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">FRESHNESS</span>
              <span className="text-sm font-bold text-slate-800 mt-1 block">Live On-Demand</span>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">SOURCE TYPE</span>
              <span className="text-sm font-bold text-slate-800 mt-1 block">B2B + Retail + Direct</span>
            </div>
          </div>
        </div>

        {/* 1-column Bento Box: Strict Anti-Hallucination */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-soft transition-all duration-300 hover:shadow-soft-lg flex flex-col justify-between">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-6">
              <ShieldAlert className="h-6 w-6" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Zero Unsupported Prices Policy
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              The engine will NEVER invent or guess a price when verified quotes cannot be found. If data is sparse, it explicitly reports &ldquo;Insufficient verified market data&rdquo; with clear uncertainty disclosures.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>Audited against verified grounding chunks</span>
          </div>
        </div>

        {/* 1-column Bento Box: Technical Specification Preservation */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-soft transition-all duration-300 hover:shadow-soft-lg flex flex-col justify-between">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-6">
              <Layers className="h-6 w-6" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Specification &amp; Unit Precision
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Preserves physical dimensions, ASTM/ANSI material grades, thicknesses (12mm, 15/32 in), schedules, and voltages exactly as queried.
            </p>
          </div>

          <div className="space-y-1.5 font-space text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div>&bull; Units: Metric &amp; Imperial (mm, in, ft)</div>
            <div>&bull; Standards: ANSI Z89, ASTM A312, PS 1-19</div>
          </div>
        </div>

        {/* Wide 2-column Bento Box: Direct Clickable Source Attribution */}
        <div className="md:col-span-2 rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-soft transition-all duration-300 hover:shadow-soft-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Compass className="h-6 w-6" />
              </div>
              <span className="font-space text-xs font-bold text-slate-400 uppercase tracking-widest">
                DIRECT WEBPAGE CITATIONS
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              Transparent Source Attribution on Every Fact
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              Every single price point, product title, and supplier quote extracted by the platform includes its original, direct source URL. You can click through immediately to verify the item listing, check stock availability, or place an order.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs font-medium text-slate-500">
            <span className="text-slate-800 font-semibold">Includes:</span>
            <span className="rounded-lg bg-slate-100 px-2.5 py-1">Distributor Name</span>
            <span className="rounded-lg bg-slate-100 px-2.5 py-1">Observed Listing URL</span>
            <span className="rounded-lg bg-slate-100 px-2.5 py-1">Confidence Score</span>
            <span className="rounded-lg bg-slate-100 px-2.5 py-1">Marketplace / Retail Classification</span>
          </div>
        </div>
      </div>
    </section>
  );
};
