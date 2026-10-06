import React from 'react';
import { Layers, Info, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenMethodology: () => void;
  onResetSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMethodology, onResetSearch }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <button
          onClick={onResetSearch}
          className="flex items-center gap-2.5 text-left transition hover:opacity-90 focus:outline-none"
          title="Return to homepage"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm shadow-blue-500/20">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-slate-900">MarketSpec</span>
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600 border border-slate-200">
                MVP
              </span>
            </div>
            <p className="hidden text-xs text-slate-500 sm:block">Product & Material Price Intelligence</p>
          </div>
        </button>

        {/* Navigation items */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={onOpenMethodology}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
          >
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            <span>Pricing Methodology</span>
          </button>

          <a
            href="#about-section"
            onClick={(e) => {
              e.preventDefault();
              onOpenMethodology();
            }}
            className="hidden sm:flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900 transition"
          >
            <Info className="h-4 w-4" />
            <span>About</span>
          </a>
        </div>
      </div>
    </header>
  );
};
