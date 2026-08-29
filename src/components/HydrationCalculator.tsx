import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Droplets, Clock, Leaf, Building2 } from 'lucide-react';

export default function HydrationCalculator() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [area, setArea] = useState(2000);

  // 30% less water. ~5L water per sqft typical. Curing ~14 days standard, saved ~4 days.
  const waterSaved = Math.round(area * 5 * 0.3);
  const daysSaved = Math.round((area / 1000) * 2);
  const co2Saved = Math.round(waterSaved * 0.0008 * 100) / 100;

  const stats = [
    {
      icon: Droplets,
      label: 'Liters of Water Saved',
      value: waterSaved.toLocaleString(),
      color: 'cyan' as const,
    },
    {
      icon: Clock,
      label: 'Days Saved Curing',
      value: daysSaved.toString(),
      color: 'cyan' as const,
    },
    {
      icon: Leaf,
      label: 'kg CO₂ Equivalent Saved',
      value: co2Saved.toFixed(2),
      color: 'amber' as const,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="hydration"
      className="relative py-24 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-cyan/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-cyan/30 bg-cyan-soft text-cyan text-xs font-semibold tracking-widest uppercase">
            <Droplets className="w-3.5 h-3.5" />
            The Hydration Advantage
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            30% Less Water.{' '}
            <span className="text-cyan text-glow-cyan">Uncompromised Strength.</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-300 text-base sm:text-lg">
            Drag the slider to see how much water, time, and carbon Solaria saves on a project of your size.
          </p>
        </motion.div>

        {/* Slider card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl border border-slate-700/60 bg-surface p-6 sm:p-10 shadow-card"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-cyan-soft border border-cyan/30 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-cyan" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Build Area</p>
                <p className="text-2xl font-display font-bold text-cyan text-glow-cyan">
                  {area.toLocaleString()} <span className="text-base text-slate-400">sq ft</span>
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {[500, 2000, 5000, 10000].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setArea(preset)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    area === preset
                      ? 'bg-cyan text-canvas'
                      : 'border border-slate-700 text-slate-400 hover:border-cyan/50 hover:text-cyan'
                  }`}
                >
                  {preset >= 1000 ? `${preset / 1000}k` : preset}
                </button>
              ))}
            </div>
          </div>

          {/* Custom slider */}
          <div className="relative">
            <input
              type="range"
              min={500}
              max={10000}
              step={100}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer accent-cyan bg-slate-700
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-6
                [&::-webkit-slider-thumb]:h-6
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-cyan
                [&::-webkit-slider-thumb]:shadow-cyan-glow
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-6
                [&::-moz-range-thumb]:h-6
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-cyan
                [&::-moz-range-thumb]:border-none
                [&::-moz-range-thumb]:cursor-pointer"
            />
            <div className="flex justify-between mt-2 text-xs text-slate-500">
              <span>500 sq ft</span>
              <span>10,000 sq ft</span>
            </div>
          </div>

          {/* Stat grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className={`relative rounded-xl border p-5 overflow-hidden ${
                  s.color === 'cyan'
                    ? 'border-cyan/25 bg-cyan-soft'
                    : 'border-amber/25 bg-amber-soft'
                }`}
              >
                <s.icon className={`w-6 h-6 mb-3 ${s.color === 'cyan' ? 'text-cyan' : 'text-amber'}`} />
                <p className={`text-3xl font-display font-bold ${s.color === 'cyan' ? 'text-cyan text-glow-cyan' : 'text-amber text-glow-amber'}`}>
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-slate-400">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Environmental comparison */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-6 p-4 rounded-xl border border-slate-700/50 bg-canvas/50 flex items-center gap-3"
          >
            <Leaf className="w-5 h-5 text-amber shrink-0" />
            <p className="text-sm text-slate-300">
              That's equivalent to{' '}
              <span className="text-amber font-semibold text-glow-amber">
                {Math.round(waterSaved / 150)} days
              </span>{' '}
              of drinking water for an average household — returned to the ground instead of consumed.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
