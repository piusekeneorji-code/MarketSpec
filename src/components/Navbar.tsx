import React from 'react';
import { Search } from 'lucide-react';

interface NavbarProps {
  onOpenMethodology: () => void;
  onResetSearch: () => void;
  onScrollToSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenMethodology,
  onResetSearch,
  onScrollToSearch,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-900/[0.04] bg-[#faf8f5]/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        {/* Brand */}
        <button
          onClick={onResetSearch}
          className="group flex items-center gap-2 text-left transition focus:outline-none"
        >
          <span className="font-anton text-xl tracking-tight text-slate-900 group-hover:text-slate-600 transition-colors uppercase">
            MarketSpec
          </span>
        </button>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-normal text-slate-500">
          <button
            onClick={onScrollToSearch}
            className="hover:text-slate-900 transition-colors"
          >
            Search
          </button>
          <a href="#how-it-works" className="hover:text-slate-900 transition-colors">
            How it works
          </a>
          <a href="#features" className="hover:text-slate-900 transition-colors">
            Features
          </a>
          <button
            onClick={onOpenMethodology}
            className="hover:text-slate-900 transition-colors"
          >
            Methodology
          </button>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onScrollToSearch}
            className="flex items-center gap-1.5 rounded-full border border-slate-900/10 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition-all"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </header>
  );
};
