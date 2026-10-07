import React from 'react';

const SOURCES = [
  { name: 'The Home Depot', tag: 'Building Materials' },
  { name: 'Grainger', tag: 'Industrial Supplies' },
  { name: 'McMaster-Carr', tag: 'Hardware & Metals' },
  { name: "Lowe's", tag: 'Commercial & Home' },
  { name: 'Fastenal', tag: 'Fasteners & Tools' },
  { name: 'Ferguson', tag: 'Piping & Plumbing' },
  { name: '84 Lumber', tag: 'Structural Timber' },
  { name: 'ABC Supply', tag: 'Commercial Roofing' },
];

export const SourcesLogoStrip: React.FC = () => {
  return (
    <section className="w-full border-y border-slate-200/80 bg-white/60 py-8 backdrop-blur-xs">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-center font-space text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
          GROUNDED WITH LIVE QUOTES FROM TOP NATIONAL DISTRIBUTORS &amp; RETAILERS
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          {SOURCES.map((source) => (
            <div
              key={source.name}
              className="flex items-center gap-2 rounded-xl border border-slate-200/60 bg-white px-4 py-2 shadow-2xs transition hover:border-orange-300 hover:shadow-xs"
            >
              <div className="h-2 w-2 rounded-full bg-orange-500" />
              <div className="text-left">
                <span className="font-anton text-sm tracking-wide text-slate-800 uppercase block leading-none">
                  {source.name}
                </span>
                <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                  {source.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
