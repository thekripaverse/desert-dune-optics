import { useEffect, useState } from 'react';
import { apiService } from '@/services/apiService';

interface HeaderProps {
  desertMode: boolean;
  onToggleMode: () => void;
}

export function Header({ desertMode, onToggleMode }: HeaderProps) {
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);

  useEffect(() => {
    const check = async () => {
      const ok = await apiService.healthCheck();
      setBackendOnline(ok);
    };
    check();
    const interval = setInterval(check, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Offroad Scene Segmentation
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Duality AI • Synthetic Desert Digital Twin • U-Net ResNet-18
          </p>
          <div className="h-0.5 w-24 bg-primary/40 mt-2 rounded-full" />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onToggleMode}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md border border-border hover:border-primary/30"
          >
            {desertMode ? 'Neutral Mode' : 'Desert Mode'}
          </button>

          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                backendOnline === null
                  ? 'bg-muted-foreground animate-pulse'
                  : backendOnline
                  ? 'bg-status-green'
                  : 'bg-status-red'
              }`}
            />
            <span className="text-xs font-mono text-muted-foreground">
              {backendOnline === null
                ? 'Checking…'
                : backendOnline
                ? 'Backend Connected'
                : 'Backend Offline'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
