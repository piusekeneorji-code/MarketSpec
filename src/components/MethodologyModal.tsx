import React from 'react';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 focus:outline-none"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2.5 text-blue-600 mb-2">
          <ShieldCheck className="h-6 w-6" />
          <h2 className="text-xl font-bold text-slate-900">Pricing & Research Methodology</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          How MarketSpec calculates price estimates, extracts technical specifications, and prevents unsupported figures.
        </p>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700">
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>1. Strict Grounded Observation</span>
            </h3>
            <p className="text-slate-600 leading-relaxed pl-6">
              Every price figure presented in the system originates from live distributor catalogs, national retailers,
              or verified manufacturer spec sheets. The system never generates arbitrary prices without grounding sources.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Layers className="h-4 w-4 text-blue-600" />
              <span>2. Statistical Range & Typical Price</span>
            </h3>
            <p className="text-slate-600 leading-relaxed pl-6">
              Prices are synthesized into a minimum, maximum, and typical median. Differences in packaging (e.g. single
              sheet vs. bulk pallet) or tier (economy vs. commercial specification) are tracked in the assumptions panel.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span>3. Confidence Scoring & Uncertainty Disclosure</span>
            </h3>
            <p className="text-slate-600 leading-relaxed pl-6">
              Confidence levels (<span className="font-semibold text-emerald-700">HIGH</span>,{' '}
              <span className="font-semibold text-amber-700">MEDIUM</span>,{' '}
              <span className="font-semibold text-rose-700">LOW</span>) reflect source consistency, SKU specificity,
              and geographic distribution. Regional freight, local tariffs, and contractor volume discounts are explicitly
              itemized.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-blue-600 px-5 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-blue-700 transition"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
