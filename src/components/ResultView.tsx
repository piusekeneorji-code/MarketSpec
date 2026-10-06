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
  Building2,
  Tag,
  TrendingUp,
  Brain,
  Search,
  Sparkles,
  HelpCircle,
  Globe,
  DollarSign,
  PackageCheck,
} from 'lucide-react';

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
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
            <ShieldCheck className="h-3.5 w-3.5" /> High Confidence
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
            <Info className="h-3.5 w-3.5" /> Moderate Confidence
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 border border-rose-200">
            <AlertTriangle className="h-3.5 w-3.5" /> Low Confidence / Ambiguous
          </span>
        );
    }
  };

  const hasLivePrices = data.sourcePrices && data.sourcePrices.length > 0 && data.estimatedPrice.typical > 0;
  const researchResults = data.researchReport?.relevantResults || [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 space-y-6">
      {/* Top action row */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Search</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-500" />
                <span>Copy Summary</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Title & Category */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-200">
            {data.category}
          </span>
          {getConfidenceBadge(data.confidenceLevel)}
          <span className="text-xs text-slate-400">Query: &ldquo;{data.query}&rdquo;</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          {data.productName}
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">{data.description}</p>
      </div>

      {/* AI Query Understanding Card */}
      {data.understanding && (
        <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Query Understanding & Search Strategy</h3>
                <p className="text-xs text-slate-500">
                  Entity extraction and query formulation driving the web research layer
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-600">Model Precision:</span>
              <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-800">
                {Math.round(data.understanding.confidence * 100)}%
              </span>
            </div>
          </div>

          {/* Quick attribute tags */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl bg-white p-3 border border-blue-100 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Material</span>
              <span className="text-xs font-bold text-slate-800 mt-0.5 block truncate">
                {data.understanding.material || 'Not specified'}
              </span>
            </div>
            <div className="rounded-xl bg-white p-3 border border-blue-100 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Brand</span>
              <span className="text-xs font-bold text-slate-800 mt-0.5 block truncate">
                {data.understanding.brand || 'Unspecified / Generic'}
              </span>
            </div>
            <div className="rounded-xl bg-white p-3 border border-blue-100 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Model / Series</span>
              <span className="text-xs font-bold text-slate-800 mt-0.5 block truncate">
                {data.understanding.model || 'Standard Grade'}
              </span>
            </div>
            <div className="rounded-xl bg-white p-3 border border-blue-100 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Preserved Specs</span>
              <span className="text-xs font-bold text-slate-800 mt-0.5 block truncate">
                {data.understanding.specifications.length} detected
              </span>
            </div>
          </div>

          {/* Search Queries Used */}
          <div className="rounded-xl bg-white p-4 border border-blue-100 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Search className="h-4 w-4 text-blue-600" />
              <span>Targeted Web Queries Dispatched:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {data.understanding.search_queries.map((q, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-lg bg-slate-50 border border-slate-200 px-3 py-2 text-xs font-mono text-slate-700"
                >
                  <Sparkles className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                  <span className="truncate">{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Web Research Layer Results */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Live Web Research & Source Extraction</h3>
              <p className="text-xs text-slate-500">
                Filtered product pages, supplier catalogs, and listed prices with source attribution
              </p>
            </div>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200">
            {researchResults.length} relevant sources extracted
          </span>
        </div>

        {data.researchReport?.summary && (
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-xs text-slate-700 leading-relaxed">
            <strong className="font-semibold text-slate-900">Research Summary: </strong>
            {data.researchReport.summary}
          </div>
        )}

        {/* List of Normalized Product Sources */}
        {researchResults.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {researchResults.map((src, idx) => (
              <div
                key={idx}
                className="py-4 hover:bg-slate-50/70 rounded-xl px-3 transition space-y-2.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{src.source}</span>
                      {src.seller && (
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 border border-slate-200">
                          Seller: {src.seller}
                        </span>
                      )}
                      {src.brand && (
                        <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700 border border-blue-200">
                          Brand: {src.brand}
                        </span>
                      )}
                      {src.availability && (
                        <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700 border border-emerald-200">
                          <PackageCheck className="h-3 w-3" />
                          {src.availability}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-slate-800">{src.title}</h4>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                    <div className="text-left sm:text-right">
                      {src.price !== null ? (
                        <div>
                          <span className="text-base font-bold text-emerald-700">
                            {formatPrice(src.price, src.currency || 'USD')}
                          </span>
                          <span className="text-[11px] text-slate-500 block">Listed Price</span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            Price on Request
                          </span>
                          <span className="text-[11px] text-slate-400 block mt-0.5">Catalog Listing</span>
                        </div>
                      )}
                    </div>

                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition shrink-0"
                    >
                      <span>Visit Source</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {/* Extracted specifications from source page */}
                {src.specifications && src.specifications.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {src.specifications.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="rounded border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-600"
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
          <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-xs text-slate-500">
            No live supplier listings could be extracted for this query at this moment.
          </div>
        )}
      </div>

      {/* Grid: Specifications & Variants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Specifications */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Layers className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Preserved Technical Specifications</h3>
          </div>

          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            {data.specifications.map((spec, idx) => (
              <div key={idx} className="flex justify-between py-2.5 gap-4">
                <span className="font-medium text-slate-500">{spec.key}</span>
                <span className="font-semibold text-slate-900 text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Brands & Known Variants */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <Tag className="h-4 w-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Possible Variants & Grades</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {data.brandsOrVariants.map((item, idx) => (
                <span
                  key={idx}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Confidence reasoning */}
          <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs">
            <div className="flex items-center gap-2 text-slate-700 font-semibold mb-1">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <span>Confidence Assessment:</span>
            </div>
            <p className="text-slate-600 leading-relaxed">{data.confidenceReason}</p>
          </div>
        </div>
      </div>

      {/* Assumptions & Uncertainty */}
      <div className="rounded-2xl border border-slate-200 bg-amber-50/40 p-6">
        <h3 className="text-sm font-bold text-amber-950 flex items-center gap-2 mb-3">
          <HelpCircle className="h-4 w-4 text-amber-700" />
          <span>Acknowledged Uncertainties & Missing Parameters</span>
        </h3>
        <ul className="space-y-2 text-xs text-amber-900 leading-relaxed list-disc list-inside">
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
