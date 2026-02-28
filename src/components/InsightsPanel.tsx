import { motion } from 'framer-motion';
import type { TerrainInsights } from '@/utils/segmentation';

interface InsightsPanelProps {
  insights: TerrainInsights;
}

export function InsightsPanel({ insights }: InsightsPanelProps) {
  const items = [
    { label: 'Dominant Terrain', value: insights.dominantClass },
    { label: 'Vegetation Density', value: `${insights.vegetationPercentage}%` },
    { label: 'Rock Presence', value: `${insights.rockDensity}%` },
    { label: 'Sky Coverage', value: `${insights.skyCoverage}%` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="bg-card border border-border rounded-lg shadow-card p-6"
    >
      <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
        Terrain Insights
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
              {item.label}
            </span>
            <span className="text-lg font-semibold text-foreground font-mono mt-0.5">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
