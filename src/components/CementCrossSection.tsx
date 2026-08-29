import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets } from 'lucide-react';

interface TrailPoint {
  id: number;
  x: number;
  y: number;
}

interface FloatingMetric {
  id: number;
  x: number;
  y: number;
  text: string;
  color: 'cyan' | 'amber';
}

const METRIC_POOL = [
  { text: '+55 MPa Strength', color: 'cyan' as const },
  { text: '30% Water Retained', color: 'amber' as const },
  { text: 'Hydration Active', color: 'cyan' as const },
  { text: '+43 MPa Density', color: 'cyan' as const },
  { text: 'Curing 98%', color: 'amber' as const },
  { text: 'Lattice Forming', color: 'cyan' as const },
  { text: 'Bond Strength ↑', color: 'amber' as const },
];

export default function CementCrossSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [isHydrating, setIsHydrating] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [metrics, setMetrics] = useState<FloatingMetric[]>([]);
  const [curedPct, setCuredPct] = useState(0);
  const trailId = useRef(0);
  const metricId = useRef(0);
  const lastMetricTime = useRef(0);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCursor({ x, y });
    setIsHydrating(true);
    setCuredPct((c) => Math.min(c + 1.5, 100));

    // Add trail point
    const tid = trailId.current++;
    setTrail((prev) => [...prev.slice(-20), { id: tid, x, y }]);
    setTimeout(() => {
      setTrail((prev) => prev.filter((p) => p.id !== tid));
    }, 1500);

    // Throttle floating metrics to every 350ms
    const now = performance.now();
    if (now - lastMetricTime.current > 350) {
      lastMetricTime.current = now;
      const metric = METRIC_POOL[Math.floor(Math.random() * METRIC_POOL.length)];
      const mid = metricId.current++;
      setMetrics((prev) => [...prev.slice(-4), { id: mid, x, y, text: metric.text, color: metric.color }]);
      setTimeout(() => {
        setMetrics((prev) => prev.filter((m) => m.id !== mid));
      }, 1600);
    }

    if (fadeTimer.current) {
      clearTimeout(fadeTimer.current);
      fadeTimer.current = null;
    }
  }, []);

  const handleLeave = useCallback(() => {
    setIsHydrating(false);
    setCursor(null);
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => {
      setTrail([]);
      setMetrics([]);
      setCuredPct(0);
    }, 1500);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative h-72 sm:h-80 md:h-96 rounded-2xl border border-slate-700/60 overflow-hidden cursor-crosshair shadow-card select-none"
      style={{ background: '#111827' }}
    >
      {/* --- CONSTRUCTION IMAGE BASE --- */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/image.png')" }}
        animate={{ opacity: isHydrating ? 0.62 : 0.8 }}
        transition={{ duration: 1.5 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-[#111827]/20 to-[#111827]/45 pointer-events-none" />

      {/* --- DRY POWDER GRID (default state) --- */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: isHydrating ? 0.18 : 0.7 }}
      >
        {[...Array(140)].map((_, i) => {
          const cols = 14;
          const col = i % cols;
          const row = Math.floor(i / cols);
          return (
            <div
              key={i}
              className="absolute rounded-full bg-slate-500/30"
              style={{
                width: '3px',
                height: '3px',
                left: `${(col / cols) * 100 + 1.5}%`,
                top: `${(row / 10) * 100 + 2}%`,
              }}
            />
          );
        })}
        {/* Scattered larger particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`p-${i}`}
            className="absolute rounded-full bg-slate-600/40"
            style={{
              width: `${4 + (i % 3) * 2}px`,
              height: `${4 + (i % 3) * 2}px`,
              left: `${(i * 47) % 100}%`,
              top: `${(i * 31) % 100}%`,
            }}
          />
        ))}
      </div>

      {/* --- CURED LATTICE OVERLAY (grows with hydration) --- */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: isHydrating ? 0.7 : 0 }}
        transition={{ duration: 1.5 }}
      >
        {/* Solid slate lattice background */}
        <div className="absolute inset-0" style={{ background: '#1E293B' }} />
        {/* Lattice grid lines */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </motion.div>

      {/* --- TRAIL: cured patches along cursor path --- */}
      {trail.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          initial={{ opacity: 0.7, scale: 0.3 }}
          animate={{ opacity: 0, scale: 1.8 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            left: p.x - 40,
            top: p.y - 40,
            width: 80,
            height: 80,
            background: 'radial-gradient(circle, rgba(30,41,59,0.9) 0%, rgba(30,41,59,0) 70%)',
          }}
        />
      ))}

      {/* --- CURSOR GLOW AURA --- */}
      <AnimatePresence>
        {cursor && (
          <motion.div
            className="absolute pointer-events-none rounded-full"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            style={{
              left: cursor.x - 90,
              top: cursor.y - 90,
              width: 180,
              height: 180,
              background: 'radial-gradient(circle, rgba(0,255,255,0.35) 0%, rgba(0,255,255,0.08) 40%, transparent 70%)',
              filter: 'blur(2px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* --- EXPANDING RIPPLE WAVES --- */}
      {trail.slice(-3).map((p) => (
        <motion.div
          key={`r-${p.id}`}
          className="absolute pointer-events-none rounded-full border border-cyan/40"
          initial={{ opacity: 0.5, scale: 0, left: p.x - 30, top: p.y - 30, width: 60, height: 60 }}
          animate={{ opacity: 0, scale: 3 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      ))}

      {/* --- FLOATING MICRO-METRICS --- */}
      <AnimatePresence>
        {metrics.map((m) => (
          <motion.div
            key={m.id}
            className="absolute pointer-events-none whitespace-nowrap text-xs font-mono font-semibold"
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: 1, y: -35, scale: 1 }}
            exit={{ opacity: 0, y: -55, scale: 0.9 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              left: m.x + 18,
              top: m.y - 10,
            }}
          >
            <span className={m.color === 'cyan' ? 'text-cyan text-glow-cyan' : 'text-amber text-glow-amber'}>
              {m.text}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* --- STATUS BADGE (top left) --- */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <motion.span
          className="w-2 h-2 rounded-full"
          animate={{
            backgroundColor: isHydrating ? '#00FFFF' : '#FFBF00',
            boxShadow: isHydrating
              ? '0 0 12px rgba(0,255,255,0.8)'
              : '0 0 8px rgba(255,191,0,0.5)',
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="text-xs font-bold font-mono tracking-wider"
          animate={{
            color: isHydrating ? '#00FFFF' : '#FFBF00',
          }}
          transition={{ duration: 0.3 }}
        >
          {isHydrating ? 'STATUS: HYDRO-CURING ACTIVE' : 'STATUS: DRY POWDER'}
        </motion.span>
      </div>

      {/* --- CURE PERCENTAGE (top right) --- */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
        <Droplets className="w-3.5 h-3.5 text-cyan" />
        <span className="text-xs font-mono font-bold text-cyan text-glow-cyan">
          {Math.round(curedPct)}%
        </span>
      </div>

      {/* --- CENTERED HELPER TEXT (default state) --- */}
      <AnimatePresence>
        {!isHydrating && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm sm:text-base font-medium" style={{ color: '#9CA3AF' }}>
              Hover &amp; Move Cursor to Hydrate
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- BOTTOM PROGRESS BAR --- */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800/60 z-10">
        <motion.div
          className="h-full"
          animate={{
            width: `${curedPct}%`,
            backgroundColor: isHydrating ? '#00FFFF' : '#FFBF00',
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}
