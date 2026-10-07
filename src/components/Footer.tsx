import React from 'react';
import { Layers, ShieldCheck, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenMethodology: () => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenMethodology, onScrollToTop }) => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white pt-16 pb-12 text-slate-600">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-100">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-600 text-white shadow-xs">
                <Layers className="h-4 w-4" />
              </div>
              <span className="font-anton text-xl tracking-wide text-slate-900 uppercase">
                MARKETSPEC
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              AI-powered product, material, and commodity price discovery. Grounded with live supplier quotes,
              clear citations, and statistical confidence scoring.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 w-fit px-3 py-1 rounded-full border border-emerald-100">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Zero Hallucinations Policy</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-anton text-xs uppercase tracking-widest text-slate-900">
              EXPLORE
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a href="#search-section" className="hover:text-orange-600 transition-colors">
                  Price Search
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-orange-600 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-orange-600 transition-colors">
                  Bento Features
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenMethodology}
                  className="hover:text-orange-600 transition-colors"
                >
                  Research Methodology
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Policy */}
          <div className="space-y-3">
            <h4 className="font-anton text-xs uppercase tracking-widest text-slate-900">
              INTEGRITY
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <button
                  type="button"
                  onClick={onOpenMethodology}
                  className="hover:text-orange-600 transition-colors"
                >
                  Source Verification
                </button>
              </li>
              <li>
                <span className="text-slate-400">Strict Non-Binding Estimates</span>
              </li>
              <li>
                <span className="text-slate-400">Text Search (No Image Tracking)</span>
              </li>
              <li>
                <span className="text-slate-400">Public Supplier Citations</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} MarketSpec Intelligence. All citations preserved from respective suppliers.</p>

          <button
            type="button"
            onClick={onScrollToTop}
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
