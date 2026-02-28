import { SEGMENTATION_CLASSES } from '@/utils/segmentation';

export function ClassLegend() {
  return (
    <div className="bg-card border border-border rounded-lg shadow-card p-6">
      <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
        Class Legend
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {SEGMENTATION_CLASSES.map((cls) => (
          <div
            key={cls.id}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted/30 border border-border hover:border-primary/30 transition-colors group cursor-default"
          >
            <div
              className="w-3 h-3 rounded-sm flex-shrink-0"
              style={{ backgroundColor: cls.color }}
            />
            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors truncate">
              {cls.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
