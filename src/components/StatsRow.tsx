import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, ShieldCheck, Database, Zap } from 'lucide-react';

interface StatItem {
  target: number;
  suffix: string;
  prefix?: string;
  decimals?: number;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STATS_DATA: StatItem[] = [
  {
    target: 10,
    suffix: 'K+',
    label: 'Market Searches Completed',
    description: 'Products, raw lumber, piping & equipment analyzed',
    icon: TrendingUp,
  },
  {
    target: 95,
    suffix: '%',
    label: 'Source Attribution Accuracy',
    description: 'Directly linked to active supplier & retail pages',
    icon: ShieldCheck,
  },
  {
    target: 4200,
    suffix: '+',
    label: 'Distributors & Catalogs Indexed',
    description: 'National lumberyards, B2B hardware & ecommerce',
    icon: Database,
  },
  {
    target: 2.1,
    suffix: 's',
    prefix: '< ',
    decimals: 1,
    label: 'Average AI Research Latency',
    description: 'Rapid query understanding and grounded synthesis',
    icon: Zap,
  },
];

export const StatsRow: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [counts, setCounts] = useState<number[]>(STATS_DATA.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 1600; // ms
    const frames = 40;
    const interval = duration / frames;
    let currentFrame = 0;

    const timer = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / frames;
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);

      setCounts(
        STATS_DATA.map((s) => {
          const val = s.target * easeOutQuad;
          return s.decimals ? parseFloat(val.toFixed(s.decimals)) : Math.round(val);
        })
      );

      if (currentFrame >= frames) {
        clearInterval(timer);
        setCounts(STATS_DATA.map((s) => s.target));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [hasStarted]);

  return (
    <section ref={containerRef} className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {STATS_DATA.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="group rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg hover:border-orange-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition-colors group-hover:bg-orange-600 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  METRIC 0{idx + 1}
                </span>
              </div>

              <div className="font-anton text-3xl sm:text-4xl text-slate-900 tracking-tight">
                {stat.prefix || ''}
                {stat.decimals ? counts[idx].toFixed(stat.decimals) : counts[idx]}
                <span className="text-orange-600">{stat.suffix}</span>
              </div>

              <h3 className="mt-2 text-sm font-bold text-slate-800 leading-snug">
                {stat.label}
              </h3>

              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
