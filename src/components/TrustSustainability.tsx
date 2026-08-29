import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { History, MapPin, Factory, Cloud } from 'lucide-react';

interface Stat {
  icon: typeof History;
  value: number;
  suffix: string;
  label: string;
  color: 'cyan' | 'amber';
}

const stats: Stat[] = [
  { icon: History, value: 150, suffix: '+', label: 'Years of Heritage', color: 'cyan' },
  { icon: MapPin, value: 6, suffix: '', label: 'Plants Across South & West India', color: 'amber' },
  { icon: Factory, value: 30, suffix: '%', label: 'Lower Carbon Production', color: 'cyan' },
  { icon: Cloud, value: 2, suffix: 'M+', label: 'Tons Annual Capacity', color: 'amber' },
];

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
}

export default function TrustSustainability() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} id="trust" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-cyan/30 bg-cyan-soft text-cyan text-xs font-semibold tracking-widest uppercase">
            <History className="w-3.5 h-3.5" />
            Trust & Sustainability
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Built on <span className="text-cyan text-glow-cyan">150 Years</span> of Trust.
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-300 text-base sm:text-lg">
            Heritage you can stand on. Sustainability built into every bag.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <CounterCard key={stat.label} stat={stat} active={inView} delay={i * 0.1} />
          ))}
        </div>

        {/* Plant locations strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 rounded-2xl border border-slate-700/60 bg-surface p-6 sm:p-8 shadow-card"
        >
          <div className="flex items-center gap-2 mb-5">
            <MapPin className="w-5 h-5 text-amber" />
            <h3 className="font-display text-lg font-bold">Where We Operate</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {['Tamil Nadu', 'Karnataka', 'Kerala', 'Andhra Pradesh', 'Telangana', 'Maharashtra', 'Gujarat'].map((loc, i) => (
              <motion.div
                key={loc}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.05 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan/25 bg-cyan-soft text-sm text-cyan hover:border-cyan/60 hover:bg-cyan/15 transition-all cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                {loc}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CounterCard({ stat, active, delay }: { stat: Stat; active: boolean; delay: number }) {
  const value = useCountUp(stat.value, active);
  const isFloat = stat.value < 10 && stat.suffix === '%';
  const display = isFloat ? value.toFixed(1) : Math.round(value).toString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={`relative rounded-2xl border p-6 text-center overflow-hidden group hover:scale-[1.03] transition-transform ${
        stat.color === 'cyan'
          ? 'border-cyan/25 bg-surface shadow-cyan-glow'
          : 'border-amber/25 bg-surface shadow-amber-glow'
      }`}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        stat.color === 'cyan' ? 'bg-cyan-soft' : 'bg-amber-soft'
      }`} />
      <div className="relative">
        <div className={`inline-flex w-12 h-12 rounded-xl items-center justify-center mb-4 ${
          stat.color === 'cyan' ? 'bg-cyan-soft border border-cyan/30' : 'bg-amber-soft border border-amber/30'
        }`}>
          <stat.icon className={`w-6 h-6 ${stat.color === 'cyan' ? 'text-cyan' : 'text-amber'}`} />
        </div>
        <p className={`text-4xl font-display font-bold ${
          stat.color === 'cyan' ? 'text-cyan text-glow-cyan' : 'text-amber text-glow-amber'
        }`}>
          {display}
          <span className="text-2xl">{stat.suffix}</span>
        </p>
        <p className="mt-2 text-xs text-slate-400 leading-snug">{stat.label}</p>
      </div>
    </motion.div>
  );
}
