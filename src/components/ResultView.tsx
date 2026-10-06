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
  TrendingUp
} from 'lucide-react';

interface ResultViewProps {
  data: MarketResearchResult;
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ data, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = async () => {
    const text = `Market Price Research: ${data.productName}
Typical Price: ${data.estimatedPrice.currency} ${data.estimatedPrice.typical} (${data.estimatedPrice.unitOfMeasure})
Range: ${data.estimatedPrice.currency} ${data.estimatedPrice.min} - ${data.estimatedPrice.max}
Confidence: ${data.confidenceLevel} (${data.confidenceReason})
Sources: ${data.sourcePrices.length} verified listings observed.`;

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
      maximumFractionDigits: 2
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
            <AlertTriangle className="h-3.5 w-3.5" /> Low Confidence / High Spread
          </span>
        );
    }
  };

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
        <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
          {data.description}
        </p>
      </div>

      {/* Main Pricing Estimate Card */}
      <div className="rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-md sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Estimated Typical Price */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span>Estimated Market Price</span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                {formatPrice(data.estimatedPrice.typical, data.estimatedPrice.currency)}
              </span>
              <span className="text-sm sm:text-base font-medium text-slate-300">
                {data.estimatedPrice.unitOfMeasure}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Typical median across observed distributor & retail pricing
            </p>
          </div>

          {/* Price Range breakdown */}
          <div className="rounded-xl bg-white/10 p-4 backdrop-blur-xs min-w-[260px] border border-white/10">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Observed Price Range
            </span>
            <div className="mt-2 flex items-center justify-between text-base font-bold text-white">
              <span>{formatPrice(data.estimatedPrice.min, data.estimatedPrice.currency)}</span>
              <span className="text-xs font-normal text-slate-400">to</span>
              <span>{formatPrice(data.estimatedPrice.max, data.estimatedPrice.currency)}</span>
            </div>
            {/* Visual range meter */}
            <div className="mt-3 relative h-2 w-full rounded-full bg-slate-700 overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-emerald-400"
                style={{
                  width: '100%'
                }}
              />
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-slate-400">
              <span>Min Observed</span>
              <span>Max Observed</span>
            </div>
          </div>
        </div>

        {/* Mandatory Transparency Notice */}
        <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-amber-500/10 border border-amber-400/20 p-3 text-xs text-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-semibold text-amber-300">Market Estimation Notice: </strong>
            {data.estimatedPrice.isEstimatedNotice}
          </p>
        </div>
      </div>

      {/* Grid: Specifications & Variants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Specifications */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Layers className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Technical Specifications</h3>
          </div>

          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            {data.specifications.map((spec) => (
              <div key={spec.key} className="flex justify-between py-2.5 gap-4">
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
              <h3 className="text-base font-bold text-slate-900">Brands & Common Variants</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {data.brandsOrVariants.map((item) => (
                <span
                  key={item}
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
              <span>Confidence Rationale:</span>
            </div>
            <p className="text-slate-600 leading-relaxed">{data.confidenceReason}</p>
          </div>
        </div>
      </div>

      {/* Observed Source Quotes & Links */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Building2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Observed Source Quotes</h3>
              <p className="text-xs text-slate-500">
                Live distributor and supplier data points used to compute this estimate
              </p>
            </div>
          </div>
          <span className="text-xs font-medium text-slate-500">
            {data.sourcePrices.length} sources referenced
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {data.sourcePrices.map((src) => (
            <div
              key={src.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5 hover:bg-slate-50/80 rounded-xl px-2.5 transition"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{src.sourceName}</span>
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 uppercase border border-slate-200">
                    {src.sourceType}
                  </span>
                </div>
                <p className="text-xs text-slate-600">{src.title}</p>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                <div className="text-left sm:text-right">
                  <span className="text-sm font-bold text-slate-900">
                    {formatPrice(src.price, src.currency)}
                  </span>
                  <span className="text-xs text-slate-500 block">{src.unitOfMeasure}</span>
                </div>

                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition"
                >
                  <span>View Source</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assumptions & Uncertainty */}
      <div className="rounded-2xl border border-slate-200 bg-amber-50/40 p-6">
        <h3 className="text-sm font-bold text-amber-950 flex items-center gap-2 mb-3">
          <Info className="h-4 w-4 text-amber-700" />
          <span>Key Assumptions & Price Volatility Factors</span>
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
