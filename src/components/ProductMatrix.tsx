import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, HardHat, ShieldCheck, Wrench, FlaskConical, FileText, Clock, Layers } from 'lucide-react';

type View = 'homeowner' | 'engineer';

interface Product {
  name: string;
  tagline: string;
  icon: typeof Home;
  homeowner: { benefits: { icon: typeof Home; label: string }[] };
  engineer: { specs: { label: string; value: string; highlight?: boolean }[] };
}

const products: Product[] = [
  {
    name: 'Solaria General',
    tagline: 'Everyday reliability for homes and plastering.',
    icon: Home,
    homeowner: {
      benefits: [
        { icon: ShieldCheck, label: 'Crack Resistant' },
        { icon: Wrench, label: 'Easy to Work With' },
        { icon: Home, label: 'Ideal for Home Floors' },
      ],
    },
    engineer: {
      specs: [
        { label: 'Compressive Strength', value: '33 MPa', highlight: true },
        { label: 'BIS Code', value: 'IS 269' },
        { label: 'Initial Setting', value: '30 min' },
        { label: 'Final Setting', value: '600 min' },
      ],
    },
  },
  {
    name: 'Solaria Structure',
    tagline: 'High-strength for columns, beams, and foundations.',
    icon: Layers,
    homeowner: {
      benefits: [
        { icon: ShieldCheck, label: 'Built for Heavy Loads' },
        { icon: Home, label: 'Lasts Generations' },
        { icon: ShieldCheck, label: 'Seismic Resistant' },
      ],
    },
    engineer: {
      specs: [
        { label: 'Compressive Strength', value: '53 MPa', highlight: true },
        { label: 'BIS Code', value: 'IS 12269' },
        { label: 'Initial Setting', value: '45 min' },
        { label: 'Final Setting', value: '600 min' },
      ],
    },
  },
  {
    name: 'Solaria Eco',
    tagline: 'Low-carbon cement for sustainable construction.',
    icon: FlaskConical,
    homeowner: {
      benefits: [
        { icon: ShieldCheck, label: 'Eco-Friendly Build' },
        { icon: Wrench, label: 'Smooth Finish' },
        { icon: ShieldCheck, label: 'Lower Carbon Footprint' },
      ],
    },
    engineer: {
      specs: [
        { label: 'Compressive Strength', value: '43 MPa', highlight: true },
        { label: 'BIS Code', value: 'IS 1489 (PSC)' },
        { label: 'CO₂ Reduction', value: '30%', highlight: true },
        { label: 'Final Setting', value: '600 min' },
      ],
    },
  },
];

export default function ProductMatrix() {
  const [view, setView] = useState<View>('homeowner');

  return (
    <section id="products" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-amber/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-amber/30 bg-amber-soft text-amber text-xs font-semibold tracking-widest uppercase">
            <Layers className="w-3.5 h-3.5" />
            Product Matrix
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            One Cement. <span className="text-amber text-glow-amber">Three Perspectives.</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-300 text-base sm:text-lg">
            Switch between what matters to you — at home or on site.
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="relative inline-flex rounded-full border border-slate-700/60 bg-surface p-1.5">
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              className={`absolute top-1.5 bottom-1.5 rounded-full ${
                view === 'homeowner' ? 'left-1.5 right-1/2 mr-1 bg-cyan' : 'left-1/2 right-1.5 ml-1 bg-amber'
              }`}
            />
            <button
              onClick={() => setView('homeowner')}
              className={`relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                view === 'homeowner' ? 'text-canvas' : 'text-slate-400 hover:text-ink'
              }`}
            >
              <Home className="w-4 h-4" />
              Homeowner View
            </button>
            <button
              onClick={() => setView('engineer')}
              className={`relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                view === 'engineer' ? 'text-canvas' : 'text-slate-400 hover:text-ink'
              }`}
            >
              <HardHat className="w-4 h-4" />
              Engineer View
            </button>
          </div>
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl border border-slate-700/60 bg-surface p-6 shadow-card transition-all hover:border-cyan/40 hover:shadow-cyan-glow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-canvas border border-slate-700 flex items-center justify-center group-hover:border-cyan/40 transition-colors">
                  <product.icon className="w-6 h-6 text-cyan" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold">{product.name}</h3>
                  <p className="text-xs text-slate-400">{product.tagline}</p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {view === 'homeowner' ? (
                  <motion.div
                    key="homeowner"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    {product.homeowner.benefits.map((b) => (
                      <div
                        key={b.label}
                        className="flex items-center gap-3 p-3 rounded-lg bg-canvas/40 border border-slate-700/40"
                      >
                        <b.icon className="w-5 h-5 text-cyan shrink-0" />
                        <span className="text-sm text-slate-200">{b.label}</span>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="engineer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2.5"
                  >
                    {product.engineer.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex items-center justify-between p-3 rounded-lg bg-canvas/40 border border-slate-700/40"
                      >
                        <span className="text-xs text-slate-400 flex items-center gap-2">
                          {spec.label.includes('BIS') && <FileText className="w-3.5 h-3.5" />}
                          {spec.label.includes('Setting') && <Clock className="w-3.5 h-3.5" />}
                          {spec.label.includes('Strength') && <HardHat className="w-3.5 h-3.5" />}
                          {spec.label.includes('CO₂') && <FlaskConical className="w-3.5 h-3.5" />}
                          {spec.label}
                        </span>
                        <span
                          className={`text-sm font-bold font-mono ${
                            spec.highlight ? 'text-amber text-glow-amber' : 'text-slate-200'
                          }`}
                        >
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
