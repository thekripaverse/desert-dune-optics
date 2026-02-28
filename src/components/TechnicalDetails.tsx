import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function TechnicalDetails() {
  const [open, setOpen] = useState(false);

  const details = [
    ['Input Resolution', '512 × 512'],
    ['Number of Classes', '10'],
    ['Loss Function', 'CrossEntropy + Dice'],
    ['Training Strategy', 'Synthetic-first training'],
    ['Domain Focus', 'Domain generalization'],
    ['Dataset', 'Digital Twin Desert Terrain'],
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
      >
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Technical Details
        </h2>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {details.map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-xs text-muted-foreground">{label}</span>
                  <span className="text-xs font-mono font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
