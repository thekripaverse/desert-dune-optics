import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function SystemArchitecture() {
  const [open, setOpen] = useState(false);

  const steps = [
    { label: 'Frontend', sub: 'React + TypeScript' },
    { label: 'Flask API', sub: 'REST Endpoint' },
    { label: 'PyTorch Model', sub: 'U-Net ResNet-18' },
    { label: 'Dataset', sub: 'Synthetic Digital Twin' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
      >
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          System Architecture
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
            <div className="px-6 pb-6 flex flex-col items-center gap-0">
              {steps.map((step, i) => (
                <div key={step.label} className="flex flex-col items-center">
                  <div className="bg-clay/10 border border-clay/20 rounded-md px-6 py-3 text-center min-w-[200px]">
                    <p className="text-sm font-semibold text-foreground">{step.label}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">{step.sub}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex flex-col items-center py-1">
                      <div className="w-px h-4 bg-clay/30" />
                      <span className="text-clay/50 text-xs">↓</span>
                      <div className="w-px h-4 bg-clay/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
