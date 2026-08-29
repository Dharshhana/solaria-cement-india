import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Droplets, ChevronDown } from 'lucide-react';
import CementCrossSection from '@/components/CementCrossSection';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden grid-bg"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-canvas via-canvas/95 to-canvas pointer-events-none" />

      {/* Floating ambient orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-cyan/10 blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-amber/10 blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 max-w-6xl mx-auto text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-cyan/30 bg-cyan-soft text-cyan text-xs font-semibold tracking-widest uppercase"
        >
          <Droplets className="w-3.5 h-3.5" />
          Solaria Cement India
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
        >
          Everything You See
          <br />
          <span className="shimmer-text">Stands On What You Don't.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed"
        >
          Hover the cross-section below. Watch water activate the cure — turning powder into the stone beneath everything you build.
        </motion.p>

        {/* Interactive cement cross-section card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 mx-auto max-w-2xl"
        >
          <CementCrossSection />
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
