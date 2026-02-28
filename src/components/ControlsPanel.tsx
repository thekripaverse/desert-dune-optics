import { Loader2 } from 'lucide-react';
import type { ViewMode } from '@/utils/segmentation';

interface ControlsPanelProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  opacity: number;
  onOpacityChange: (val: number) => void;
  tta: boolean;
  onTtaChange: (val: boolean) => void;
  onRun: () => void;
  isRunning: boolean;
  disabled: boolean;
}

export function ControlsPanel({
  viewMode,
  onViewModeChange,
  opacity,
  onOpacityChange,
  tta,
  onTtaChange,
  onRun,
  isRunning,
  disabled,
}: ControlsPanelProps) {
  return (
    <div className="bg-card rounded-lg border border-border shadow-card p-6">
      <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
        Controls
      </h2>

      <div className="space-y-5">
        {/* View Mode */}
        <div>
          <label className="text-xs text-muted-foreground font-medium mb-2 block">
            View
          </label>
          <div className="flex gap-1 bg-muted/50 rounded-md p-0.5">
            {(['overlay', 'raw'] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                disabled={isRunning}
                onClick={() => onViewModeChange(mode)}
                className={`flex-1 text-xs font-medium py-1.5 rounded transition-all capitalize ${
                  viewMode === mode
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {mode === 'overlay' ? 'Overlay' : 'Raw Mask'}
              </button>
            ))}
          </div>
        </div>

        {/* Opacity */}
        <div>
          <label className="text-xs text-muted-foreground font-medium mb-2 flex justify-between">
            <span>Opacity</span>
            <span className="font-mono">{opacity}%</span>
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={opacity}
            onChange={(e) => onOpacityChange(Number(e.target.value))}
            disabled={isRunning}
            className="w-full h-1 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
          />
        </div>

        {/* TTA Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-foreground">TTA</span>
            <p className="text-[10px] text-muted-foreground">Test-Time Augmentation</p>
          </div>
          <button
            onClick={() => onTtaChange(!tta)}
            disabled={isRunning}
            className={`w-10 h-5 rounded-full transition-colors relative ${
              tta ? 'bg-secondary' : 'bg-muted'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-card shadow-sm absolute top-0.5 transition-transform ${
                tta ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        {/* Run Button */}
        <button
          onClick={onRun}
          disabled={disabled || isRunning}
          className={`w-full py-2.5 rounded-md text-sm font-medium transition-all ${
            isRunning
              ? 'bg-primary/80 text-primary-foreground animate-pulse-glow'
              : disabled
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm'
          }`}
        >
          {isRunning ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing Terrain…
            </span>
          ) : (
            'Run Segmentation'
          )}
        </button>
      </div>
    </div>
  );
}
