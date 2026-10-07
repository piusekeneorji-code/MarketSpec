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
  PackageCheck,
} from 'lucide-react';

interface ResultsSectionProps {
  data: MarketResearchResult;
  onReset: () => void;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ data, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = async () => {
    const text = `Market Price Research: ${data.productName}
Category: ${data.category}
Estimated Price: ${data.estimatedPrice.currency} ${data.estimatedPrice.typical} (${data.estimatedPrice.unitOfMeasure})
Range: ${data.estimatedPrice.currency} ${data.estimatedPrice.min} - ${data.estimatedPrice.max}
Confidence: ${data.confidenceLevel} (${data.confidenceReason})
Sources Found: ${data.researchReport?.relevantResults?.length || data.sourcePrices.length}
${
  data.researchReport?.relevantResults?.length
    ? `Sources:\n${data.researchReport.relevantResults
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
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> High Confidence
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
            <Info className="h-3.5 w-3.5 text-amber-600" /> Moderate Confidence
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rose-800">
            <AlertTriangle className="h-3.5 w-3.5 text-rose-600" /> Low Confidence / Ambiguous
          </span>
        );
    }
  };

  const hasEstimatedPrices = data.estimatedPrice && data.estimatedPrice.typical > 0;
  const researchResults = data.researchReport?.relevantResults || [];

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-fade-in">
      {/* Top action row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-orange-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Search Another Product</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition-all hover:border-orange-300 hover:bg-orange-50/50 hover:text-orange-800 hover:scale-[1.02]"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied to Clipboard</span>
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

      {/* Product Title & Category */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="rounded-full bg-orange-100/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-800">
            {data.category}
          </span>
          {getConfidenceBadge(data.confidenceLevel)}
          <span className="text-xs text-slate-400 font-medium">
            Query: &ldquo;{data.query}&rdquo;
          </span>
        </div>

        <h2 className="font-anton text-3xl sm:text-5xl tracking-tight text-slate-900 uppercase">
          {data.productName}
        </h2>

        <p className="font-playfair text-base sm:text-lg italic text-slate-600 max-w-3xl leading-relaxed">
          {data.description}
        </p>
      </div>

      {/* Main Pricing Estimate Card */}
      {hasEstimatedPrices ? (
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-soft-lg transition-all duration-300 hover:shadow-warm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-600">
                <TrendingUp className="h-4 w-4" />
                <span>ESTIMATED CURRENT MARKET PRICE</span>
              </div>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-anton text-5xl sm:text-6xl text-slate-900 tracking-tight">
                  {formatPrice(data.estimatedPrice.typical, data.estimatedPrice.currency)}
                </span>
                <span className="text-sm sm:text-base font-semibold text-slate-500">
                  {data.estimatedPrice.unitOfMeasure}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Typical median price observed across supplier and distributor listings
              </p>
            </div>

            {/* Price Range Meter */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 min-w-[280px]">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                OBSERVED PRICE RANGE
              </span>
              <div className="flex items-center justify-between font-anton text-xl text-slate-800">
                <span>{formatPrice(data.estimatedPrice.min, data.estimatedPrice.currency)}</span>
                <span className="text-xs text-slate-400 font-sans font-normal">to</span>
                <span>{formatPrice(data.estimatedPrice.max, data.estimatedPrice.currency)}</span>
              </div>
              <div className="mt-3 relative h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
                <div className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 w-full" />
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-slate-500 font-medium">
                <span>Min Observed</span>
                <span>Max Observed</span>
              </div>
            </div>
          </div>

          {/* Estimation Notice */}
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900">
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="font-bold text-amber-950">Market Estimation Notice: </strong>
              {data.estimatedPrice.isEstimatedNotice ||
                'This value is a statistical estimate computed from observed online vendor quotes. It is not an exact binding quotation.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
            <Globe className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-anton text-lg uppercase tracking-wide text-slate-900">
              LIVE RESEARCH SOURCES EXTRACTED
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Identified active supplier listings and specifications for &ldquo;{data.productName}&rdquo;.
              Explore verified quotes and catalog pages below.
            </p>
          </div>
        </div>
      )}

      {/* Web Research Sources List (with clickable URLs, seller, price, and specs) */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-anton text-xl tracking-wide text-slate-900 uppercase">
                OBSERVED SUPPLIER SOURCES &amp; CITATIONS
              </h3>
              <p className="text-xs text-slate-500">
                Direct clickable distributor pages and catalog quotes retrieved by the search agent
              </p>
            </div>
          </div>
          <span className="rounded-full bg-slate-100 px-3.5 py-1 text-xs font-bold text-slate-700">
            {researchResults.length || data.sourcePrices.length} Sources Listed
          </span>
        </div>

        {data.researchReport?.summary && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs text-slate-700 leading-relaxed">
            <strong className="text-slate-900 font-bold uppercase tracking-wider">Research Summary: </strong>
            {data.researchReport.summary}
          </div>
        )}

        {/* Source Cards */}
        {researchResults.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {researchResults.map((src, idx) => (
              <div
                key={idx}
                className="py-4 hover:bg-slate-50/60 rounded-2xl px-3 transition-colors space-y-2.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-anton text-sm tracking-wide text-slate-900 uppercase">
                        {src.source}
                      </span>
                      {src.seller && (
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                          Seller: {src.seller}
                        </span>
                      )}
                      {src.brand && (
                        <span className="rounded-md bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-orange-800">
                          Brand: {src.brand}
                        </span>
                      )}
                      {src.availability && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                          <PackageCheck className="h-3 w-3" />
                          {src.availability}
                        </span>
                      )}
                    </div>
                    <h4 className="font-playfair text-base font-semibold text-slate-800">
                      {src.title}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0">
                    <div className="text-left sm:text-right">
                      {src.price !== null ? (
                        <div>
                          <span className="font-anton text-xl text-orange-700">
                            {formatPrice(src.price, src.currency || 'USD')}
                          </span>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                            Observed Quote
                          </span>
                        </div>
                      ) : (
                        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                          Price on Request
                        </span>
                      )}
                    </div>

                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-orange-600 shadow-2xs transition-all hover:bg-orange-600 hover:text-white hover:border-orange-600 hover:scale-[1.02]"
                    >
                      <span>View Source</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                {src.specifications && src.specifications.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {src.specifications.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-600"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : data.sourcePrices && data.sourcePrices.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {data.sourcePrices.map((src) => (
              <div
                key={src.id}
                className="py-4 hover:bg-slate-50/60 rounded-2xl px-3 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-anton text-sm text-slate-900 uppercase">{src.sourceName}</span>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 uppercase">
                      {src.sourceType}
                    </span>
                  </div>
                  <h4 className="font-playfair text-sm font-semibold text-slate-800">{src.title}</h4>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0">
                  <div className="text-left sm:text-right">
                    <span className="font-anton text-xl text-orange-700">
                      {formatPrice(src.price, src.currency)}
                    </span>
                    <span className="text-[10px] text-slate-400 block">{src.unitOfMeasure}</span>
                  </div>

                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-orange-600 shadow-2xs transition-all hover:bg-orange-600 hover:text-white hover:border-orange-600 hover:scale-[1.02]"
                  >
                    <span>Visit Link</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-slate-500 rounded-2xl border border-dashed border-slate-200">
            No active supplier listings could be verified for this exact search term at this moment.
          </div>
        )}
      </div>

      {/* Grid: Specifications & Variants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Specifications */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-soft">
          <div className="flex items-center gap-2.5 mb-5 border-b border-slate-100 pb-4">
            <Layers className="h-5 w-5 text-orange-600" />
            <h3 className="font-anton text-xl tracking-wide text-slate-900 uppercase">
              TECHNICAL SPECIFICATIONS
            </h3>
          </div>

          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            {data.specifications.map((spec, idx) => (
              <div key={idx} className="flex justify-between py-2.5 gap-4">
                <span className="font-medium text-slate-500">{spec.key}</span>
                <span className="font-bold text-slate-900 text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Variants & Confidence */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-5 border-b border-slate-100 pb-4">
              <Tag className="h-5 w-5 text-orange-600" />
              <h3 className="font-anton text-xl tracking-wide text-slate-900 uppercase">
                POSSIBLE VARIANTS &amp; BRANDS
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {data.brandsOrVariants.map((item, idx) => (
                <span
                  key={idx}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-slate-50 p-4 border border-slate-100 text-xs text-slate-600">
            <strong className="text-slate-900 block mb-1">Confidence Assessment:</strong>
            <p className="leading-relaxed">{data.confidenceReason}</p>
          </div>
        </div>
      </div>

      {/* Assumptions & Uncertainty Notice */}
      <div className="rounded-3xl border border-amber-200 bg-amber-50/60 p-6 sm:p-8">
        <h3 className="font-anton text-lg uppercase tracking-wide text-amber-950 flex items-center gap-2 mb-3">
          <HelpCircle className="h-5 w-5 text-amber-600" />
          <span>ACKNOWLEDGED UNCERTAINTIES &amp; MARKET ASSUMPTIONS</span>
        </h3>
        <ul className="space-y-2 text-xs text-amber-900 leading-relaxed list-disc list-inside">
          {data.assumptionsAndUncertainties.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};
