import { useCallback, useState, useRef } from 'react';
import { Upload } from 'lucide-react';

interface UploadSectionProps {
  onFileSelect: (file: File) => void;
  preview: string | null;
}

export function UploadSection({ onFileSelect, preview }: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (file.size > 10 * 1024 * 1024) {
        alert('File exceeds 10MB limit.');
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('Only JPG and PNG files are accepted.');
        return;
      }
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div className="bg-card rounded-lg border border-border shadow-card p-6">
      <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
        Terrain Input
      </h2>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 min-h-[200px] ${
          isDragging
            ? 'border-secondary bg-secondary/5'
            : 'border-border hover:border-primary/40'
        }`}
      >
        {preview ? (
          <img
            src={preview}
            alt="Terrain preview"
            className="max-h-[180px] rounded object-contain"
          />
        ) : (
          <>
            <Upload className="w-8 h-8 text-muted-foreground mb-3" strokeWidth={1.5} />
            <p className="text-sm font-medium text-foreground">
              Drop desert terrain image here
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              JPG, PNG — Max 10MB
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 font-mono">
              Synthetic Digital Twin Terrain Image
            </p>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>

      {!preview && (
        <div className="mt-4 border border-border rounded-lg p-6 flex items-center justify-center bg-muted/30">
          <span className="text-xs font-mono text-muted-foreground">
            Awaiting Terrain Input…
          </span>
        </div>
      )}
    </div>
  );
}
