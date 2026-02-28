import { motion } from 'framer-motion';

interface PerformanceCardProps {
  inferenceTime?: number;
  device?: string;
}

export function PerformanceDashboard({ inferenceTime, device }: PerformanceCardProps) {
  const metrics = [
    { label: 'Inference Time', value: inferenceTime ? `${inferenceTime.toFixed(1)} ms` : '—', mono: true },
    { label: 'Device', value: device || 'Unknown', mono: true },
    { label: 'Model', value: 'U-Net ResNet-18', mono: false },
    { label: 'Resolution', value: '512 × 512', mono: true },
    { label: 'Classes', value: '10', mono: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
        Performance
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="bg-card border border-border rounded-md p-3 shadow-card"
          >
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
              {m.label}
            </p>
            <p className={`text-sm font-semibold text-foreground mt-1 ${m.mono ? 'font-mono' : ''}`}>
              {m.value}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
