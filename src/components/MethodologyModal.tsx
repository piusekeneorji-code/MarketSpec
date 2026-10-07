import React from 'react';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full border border-slate-200 bg-slate-50 text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition focus:outline-none"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 text-orange-600 mb-2">
          <ShieldCheck className="h-7 w-7" />
          <h2 className="font-anton text-2xl tracking-wide text-slate-900 uppercase">
            PRICING &amp; RESEARCH METHODOLOGY
          </h2>
        </div>
        <p className="font-playfair text-sm italic text-slate-500 mb-8">
          How MarketSpec calculates price estimates, extracts technical specifications, and prevents unsupported figures.
        </p>

        <div className="space-y-6 text-slate-700">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 space-y-2">
            <h3 className="font-anton text-base text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>1. Strict Grounded Observation</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
              Every price figure presented in the system originates from live distributor catalogs, national retailers,
              or verified manufacturer spec sheets. The system never generates arbitrary prices without grounding sources.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 space-y-2">
            <h3 className="font-anton text-base text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Layers className="h-4 w-4 text-orange-600" />
              <span>2. Statistical Range &amp; Typical Median</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
              Prices are synthesized into a minimum, maximum, and typical median. Differences in packaging (e.g. single
              sheet vs. bulk pallet) or tier (economy vs. commercial specification) are tracked in the assumptions panel.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 space-y-2">
            <h3 className="font-anton text-base text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span>3. Confidence Scoring &amp; Uncertainty Disclosure</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
              Confidence levels (<span className="text-emerald-700 font-bold">HIGH</span>,{' '}
              <span className="text-amber-700 font-bold">MEDIUM</span>,{' '}
              <span className="text-rose-700 font-bold">LOW</span>) reflect source consistency, SKU specificity,
              and geographic distribution. Regional freight, local tariffs, and contractor volume discounts are explicitly
              itemized.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-orange-600 px-6 py-2.5 font-bold text-xs uppercase tracking-wider text-white shadow-md shadow-orange-500/25 hover:bg-orange-700 hover:scale-[1.02] active:scale-[0.98] transition"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
