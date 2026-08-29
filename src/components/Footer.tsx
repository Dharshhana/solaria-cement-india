import { motion } from 'framer-motion';
import { Heart, Briefcase, Mail, ArrowUp } from 'lucide-react';

const linkGroups = [
  {
    title: 'Company',
    links: ['About Us', 'CSR Initiatives', 'Sustainability Report', 'Newsroom'],
  },
  {
    title: 'Careers',
    links: ['Open Positions', 'Life at Solaria', 'Internship Program', 'Apply'],
  },
  {
    title: 'Contact',
    links: ['Head Office', 'Plant Locations', 'Customer Support', 'Dealer Network'],
  },
];

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-10 px-6 overflow-hidden border-t border-slate-800/60">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 rounded-full bg-cyan/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-cyan-soft border border-cyan/30 flex items-center justify-center">
                <span className="font-display font-bold text-cyan text-lg">S</span>
              </div>
              <span className="font-display text-lg font-bold">
                Solaria <span className="text-cyan">Cement</span> India
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Building the foundation of India — with less water, less carbon, and uncompromised strength.
            </p>
          </motion.div>

          {/* Link groups */}
          {linkGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <h4 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                {group.title === 'Careers' && <Briefcase className="w-4 h-4 text-amber" />}
                {group.title === 'Contact' && <Mail className="w-4 h-4 text-cyan" />}
                {group.title === 'Company' && <Heart className="w-4 h-4 text-cyan" />}
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 hover:text-cyan transition-colors relative group"
                    >
                      {link}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan group-hover:w-full transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-800/60">
          <p className="text-xs text-slate-500">
            © 2026 Solaria Cement India. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-slate-500 hover:text-cyan transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-500 hover:text-cyan transition-colors">Terms of Use</a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
