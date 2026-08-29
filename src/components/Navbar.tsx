import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Hydration', href: '#hydration' },
  { label: 'Products', href: '#products' },
  { label: 'Trust', href: '#trust' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-canvas/85 backdrop-blur-md border-b border-slate-800/60 py-3'
          : 'py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-cyan-soft border border-cyan/30 flex items-center justify-center">
            <Droplets className="w-5 h-5 text-cyan" />
          </div>
          <span className="font-display text-lg font-bold">
            Solaria <span className="text-cyan">Cement</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-300 hover:text-cyan transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="#hydration"
            className="px-5 py-2 rounded-full bg-cyan text-canvas text-sm font-semibold hover:shadow-cyan-glow transition-shadow"
          >
            Calculate Savings
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-300"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden overflow-hidden bg-canvas/95 backdrop-blur-md border-t border-slate-800/60"
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-slate-300 hover:text-cyan transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
