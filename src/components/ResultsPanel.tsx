import { motion } from 'framer-motion';
import type { ViewMode } from '@/utils/segmentation';

interface ResultsPanelProps {
  originalSrc: string;
  maskSrc: string;
  viewMode: ViewMode;
  opacity: number;
}

export function ResultsPanel({ originalSrc, maskSrc, viewMode, opacity }: ResultsPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-card rounded-lg border border-border shadow-card p-6"
    >
      <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
        Segmentation Results
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Original */}
        <div>
          <p className="text-xs text-muted-foreground font-mono mb-2">Original</p>
          <div className="rounded-md overflow-hidden border border-border bg-muted/20">
            <img src={originalSrc} alt="Original terrain" className="w-full h-auto" />
          </div>
        </div>

        {/* Mask / Overlay */}
        <div>
          <p className="text-xs text-muted-foreground font-mono mb-2">
            {viewMode === 'overlay' ? 'Overlay' : 'Raw Mask'}
          </p>
          <div className="rounded-md overflow-hidden border border-border bg-muted/20 relative">
            {viewMode === 'overlay' ? (
              <>
                <img src={originalSrc} alt="Base" className="w-full h-auto" />
                <img
                  src={maskSrc}
                  alt="Segmentation overlay"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: opacity / 100 }}
                />
              </>
            ) : (
              <img src={maskSrc} alt="Segmentation mask" className="w-full h-auto" />
            )}
          </div>
        </div>
      </div>

      <div className="h-px bg-border mt-6" />
    </motion.div>
  );
}
