import React, { useState } from 'react';
import { MarketResearchResult } from '../types/market';
import {
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Info,
  Layers,
  Copy,
  Check,
  ArrowLeft,
  Tag,
  TrendingUp,
  Brain,
  Search,
  Sparkles,
  HelpCircle,
  Globe,
  PackageCheck,
  Compass,
} from 'lucide-react';
import { Card3D } from './Card3D';

interface ResultViewProps {
  data: MarketResearchResult;
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ data, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = async () => {
    const text = `Market Research: ${data.productName}
Category: ${data.category}
Confidence: ${data.confidenceLevel} (${data.confidenceReason})
Specifications: ${data.specifications.map((s) => `${s.key}: ${s.value}`).join(', ')}
${
  data.researchReport
    ? `Sources Found (${data.researchReport.relevantResults.length}):\n${data.researchReport.relevantResults
        .map((r) => `- ${r.source}: ${r.title} | ${r.price ? `${r.currency} ${r.price}` : 'Price on request'} (${r.url})`)
        .join('\n')}`
    : ''
}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const formatPrice = (val: number, cur: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: cur || 'USD',
      maximumFractionDigits: 2,
    }).format(val);
  };

  const getConfidenceBadge = (level: string) => {
    switch (level) {
      case 'HIGH':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-space text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" /> High Confidence
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-space text-[11px] font-bold uppercase tracking-wider text-amber-400">
            <Info className="h-3.5 w-3.5" /> Moderate Confidence
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 font-space text-[11px] font-bold uppercase tracking-wider text-rose-400">
            <AlertTriangle className="h-3.5 w-3.5" /> Low Confidence / Ambiguous
          </span>
        );
    }
  };

  const hasLivePrices = data.sourcePrices && data.sourcePrices.length > 0 && data.estimatedPrice.typical > 0;
  const researchResults = data.researchReport?.relevantResults || [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 space-y-8">
      {/* Top Action Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 font-space text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to 3D Search</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-space text-xs font-medium text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white transition"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-400" />
                <span>Copy Summary</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Title Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-0.5 font-space text-xs font-bold uppercase tracking-wider text-blue-300">
            {data.category}
          </span>
          {getConfidenceBadge(data.confidenceLevel)}
          <span className="font-space text-xs text-slate-500">
            Query: &ldquo;{data.query}&rdquo;
          </span>
        </div>

        <h2 className="font-anton text-4xl sm:text-6xl tracking-tight text-white uppercase drop-shadow-md">
          {data.productName}
        </h2>
        <p className="font-playfair text-base sm:text-lg italic font-normal text-slate-300 max-w-3xl leading-relaxed">
          {data.description}
        </p>
      </div>

      {/* 3D Main Pricing Card (if prices calculated) or 3D Status Notice */}
      {hasLivePrices ? (
        <Card3D glowColor="amber" className="border border-white/20 bg-gradient-to-br from-[#121624] via-[#0e1320] to-[#18110b] p-6 sm:p-10 backdrop-blur-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 font-space text-xs font-bold uppercase tracking-widest text-amber-400">
                <TrendingUp className="h-4 w-4 text-amber-400" />
                <span>Estimated Market Price</span>
              </div>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-anton text-5xl sm:text-7xl font-normal tracking-tight text-white">
                  {formatPrice(data.estimatedPrice.typical, data.estimatedPrice.currency)}
                </span>
                <span className="font-space text-sm sm:text-base font-bold uppercase tracking-wider text-slate-400">
                  {data.estimatedPrice.unitOfMeasure}
                </span>
              </div>
              <p className="font-space mt-1 text-xs text-slate-400">
                Statistical median synthesized across verified online distributors
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md min-w-[280px]">
              <span className="font-space text-xs font-bold uppercase tracking-widest text-slate-300">
                Observed Price Range
              </span>
              <div className="mt-3 flex items-center justify-between font-anton text-2xl text-white tracking-wide">
                <span>{formatPrice(data.estimatedPrice.min, data.estimatedPrice.currency)}</span>
                <span className="font-playfair text-xs italic font-normal text-slate-500">to</span>
                <span>{formatPrice(data.estimatedPrice.max, data.estimatedPrice.currency)}</span>
              </div>
              <div className="mt-4 relative h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-400 to-amber-400 w-full" />
              </div>
              <div className="mt-2 flex justify-between font-space text-[10px] text-slate-400 uppercase tracking-wider">
                <span>Min Observed</span>
                <span>Max Observed</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 font-space text-xs text-amber-200">
            <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="font-bold uppercase tracking-wider text-amber-300">Market Estimation Notice: </strong>
              {data.estimatedPrice.isEstimatedNotice}
            </p>
          </div>
        </Card3D>
      ) : (
        <Card3D glowColor="blue" className="border border-white/10 bg-[#0e1220]/90 p-6 backdrop-blur-2xl flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/30">
            <Compass className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-anton text-lg tracking-wide text-white uppercase">
              RESEARCH GROUNDING ENGINE CONNECTED
            </h4>
            <p className="font-space text-xs text-slate-400 mt-1 leading-relaxed">
              AI has parsed all technical specifications and queried web sources. Extracted findings, verified links,
              and supplier catalogs are cataloged below.
            </p>
          </div>
        </Card3D>
      )}

      {/* 3D Query Understanding & Strategy Card */}
      {data.understanding && (
        <Card3D glowColor="blue" className="border border-white/10 bg-[#0c101c]/95 p-6 sm:p-8 backdrop-blur-2xl space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-anton text-xl tracking-wide text-white uppercase">
                  QUERY UNDERSTANDING ANALYSIS
                </h3>
                <p className="font-space text-xs text-slate-400">
                  Targeted entity isolation and automated search formulation
                </p>
              </div>
            </div>
            <span className="font-space text-xs font-bold uppercase tracking-wider rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-blue-300">
              CONFIDENCE: {Math.round(data.understanding.confidence * 100)}%
            </span>
          </div>

          {/* Quick attribute tags */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <span className="font-space text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                MATERIAL
              </span>
              <span className="font-space text-xs font-bold text-white mt-1 block truncate">
                {data.understanding.material || 'Not specified'}
              </span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <span className="font-space text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                BRAND
              </span>
              <span className="font-space text-xs font-bold text-white mt-1 block truncate">
                {data.understanding.brand || 'Unspecified'}
              </span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <span className="font-space text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                MODEL / SERIES
              </span>
              <span className="font-space text-xs font-bold text-white mt-1 block truncate">
                {data.understanding.model || 'Standard Grade'}
              </span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <span className="font-space text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                PRESERVED SPECS
              </span>
              <span className="font-space text-xs font-bold text-white mt-1 block truncate">
                {data.understanding.specifications.length} attributes
              </span>
            </div>
          </div>

          {/* Search Queries Used */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="flex items-center gap-2 font-space text-xs font-bold uppercase tracking-wider text-slate-300">
              <Search className="h-4 w-4 text-blue-400" />
              <span>Targeted Web Queries Dispatched:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {data.understanding.search_queries.map((q, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] px-3.5 py-2 font-space text-xs text-slate-300"
                >
                  <Sparkles className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                  <span className="truncate">{q}</span>
                </div>
              ))}
            </div>
          </div>
        </Card3D>
      )}

      {/* Web Research Layer Results */}
      <Card3D glowColor="blue" className="border border-white/10 bg-[#0c101c]/95 p-6 sm:p-8 backdrop-blur-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/30">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-anton text-xl tracking-wide text-white uppercase">
                WEB RESEARCH SOURCES &amp; CITATIONS
              </h3>
              <p className="font-space text-xs text-slate-400">
                Filtered distributor catalogs and verified listings with preserved URLs
              </p>
            </div>
          </div>
          <span className="font-space text-xs font-bold uppercase tracking-wider rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">
            {researchResults.length} sources identified
          </span>
        </div>

        {data.researchReport?.summary && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 font-space text-xs text-slate-300 leading-relaxed">
            <strong className="text-white uppercase font-bold tracking-wider">Research Summary: </strong>
            {data.researchReport.summary}
          </div>
        )}

        {/* List of Normalized Product Sources */}
        {researchResults.length > 0 ? (
          <div className="divide-y divide-white/5">
            {researchResults.map((src, idx) => (
              <div
                key={idx}
                className="py-4 hover:bg-white/[0.02] rounded-2xl px-3 transition space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-anton text-sm tracking-wide text-white uppercase">
                        {src.source}
                      </span>
                      {src.seller && (
                        <span className="font-space text-[10px] font-semibold uppercase tracking-wider rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-slate-400">
                          Seller: {src.seller}
                        </span>
                      )}
                      {src.brand && (
                        <span className="font-space text-[10px] font-bold uppercase tracking-wider rounded-full border border-blue-400/30 bg-blue-500/10 px-2.5 py-0.5 text-blue-300">
                          Brand: {src.brand}
                        </span>
                      )}
                      {src.availability && (
                        <span className="font-space inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-emerald-400">
                          <PackageCheck className="h-3 w-3" />
                          {src.availability}
                        </span>
                      )}
                    </div>
                    <h4 className="font-playfair text-base font-semibold text-slate-100">
                      {src.title}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                    <div className="text-left sm:text-right">
                      {src.price !== null ? (
                        <div>
                          <span className="font-space text-lg font-bold text-amber-400">
                            {formatPrice(src.price, src.currency || 'USD')}
                          </span>
                          <span className="font-space text-[10px] uppercase tracking-wider text-slate-400 block">
                            Listed Price
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="font-space text-xs font-semibold text-slate-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                            Price on Request
                          </span>
                        </div>
                      )}
                    </div>

                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-space text-xs font-semibold uppercase tracking-wider text-blue-300 hover:border-blue-400 hover:bg-blue-500/20 hover:text-white transition shrink-0"
                    >
                      <span>Visit Source</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                {/* Extracted Specifications */}
                {src.specifications && src.specifications.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {src.specifications.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="rounded-full border border-white/5 bg-white/[0.02] px-2.5 py-0.5 font-space text-[10px] text-slate-400"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center font-space text-xs text-slate-500">
            No live supplier listings could be extracted for this query at this moment.
          </div>
        )}
      </Card3D>

      {/* Grid: Specifications & Variants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Specifications */}
        <Card3D glowColor="blue" className="border border-white/10 bg-[#0c101c]/95 p-6 backdrop-blur-2xl">
          <div className="flex items-center gap-2.5 mb-5 border-b border-white/10 pb-3">
            <Layers className="h-4 w-4 text-blue-400" />
            <h3 className="font-anton text-lg tracking-wide text-white uppercase">
              TECHNICAL SPECIFICATIONS
            </h3>
          </div>

          <div className="divide-y divide-white/5 font-space text-xs">
            {data.specifications.map((spec, idx) => (
              <div key={idx} className="flex justify-between py-2.5 gap-4">
                <span className="text-slate-400">{spec.key}</span>
                <span className="font-bold text-white text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </Card3D>

        {/* Brands & Known Variants */}
        <Card3D glowColor="amber" className="border border-white/10 bg-[#0c101c]/95 p-6 backdrop-blur-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-5 border-b border-white/10 pb-3">
              <Tag className="h-4 w-4 text-amber-400" />
              <h3 className="font-anton text-lg tracking-wide text-white uppercase">
                POSSIBLE VARIANTS &amp; GRADES
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {data.brandsOrVariants.map((item, idx) => (
                <span
                  key={idx}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-space text-xs font-medium text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4 font-space text-xs">
            <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="h-4 w-4 text-blue-400" />
              <span>Confidence Assessment:</span>
            </div>
            <p className="text-slate-400 leading-relaxed">{data.confidenceReason}</p>
          </div>
        </Card3D>
      </div>

      {/* Assumptions & Uncertainty */}
      <div className="rounded-3xl border border-amber-500/20 bg-amber-500/[0.03] p-6 backdrop-blur-xl">
        <h3 className="font-anton text-lg uppercase tracking-wide text-amber-300 flex items-center gap-2 mb-3">
          <HelpCircle className="h-4 w-4 text-amber-400" />
          <span>ACKNOWLEDGED UNCERTAINTIES &amp; MISSING PARAMETERS</span>
        </h3>
        <ul className="space-y-2 font-space text-xs text-amber-200/80 leading-relaxed list-disc list-inside">
          {data.assumptionsAndUncertainties.map((item, idx) => (
            <li key={idx}>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
