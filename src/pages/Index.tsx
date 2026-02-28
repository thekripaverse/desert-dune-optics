import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { UploadSection } from '@/components/UploadSection';
import { ControlsPanel } from '@/components/ControlsPanel';
import { ResultsPanel } from '@/components/ResultsPanel';
import { PerformanceDashboard } from '@/components/PerformanceDashboard';
import { InsightsPanel } from '@/components/InsightsPanel';
import { ClassLegend } from '@/components/ClassLegend';
import { TechnicalDetails } from '@/components/TechnicalDetails';
import { SystemArchitecture } from '@/components/SystemArchitecture';
import { Footer } from '@/components/Footer';
import { apiService, type PredictionResult } from '@/services/apiService';
import { computeTerrainInsights, type ViewMode, type TerrainInsights } from '@/utils/segmentation';
import { toast } from 'sonner';

const Index = () => {
  const [desertMode, setDesertMode] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('overlay');
  const [opacity, setOpacity] = useState(70);
  const [tta, setTta] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [insights, setInsights] = useState<TerrainInsights | null>(null);

  const handleToggleMode = useCallback(() => {
    setDesertMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.remove('neutral-mode');
      } else {
        document.documentElement.classList.add('neutral-mode');
      }
      return next;
    });
  }, []);

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
    setResult(null);
    setInsights(null);
  }, []);

  const handleRun = useCallback(async () => {
    if (!selectedFile) return;
    setIsRunning(true);
    try {
      const prediction = await apiService.predict(selectedFile, tta);
      setResult(prediction);
      setInsights(computeTerrainInsights());
      toast.success('Segmentation complete');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Prediction failed');
    } finally {
      setIsRunning(false);
    }
  }, [selectedFile, tta]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header desertMode={desertMode} onToggleMode={handleToggleMode} />

      <main className="flex-1 container mx-auto px-6 py-8 space-y-6">
        {/* Upload + Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <UploadSection onFileSelect={handleFileSelect} preview={preview} />
          </div>
          <div>
            <ControlsPanel
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              opacity={opacity}
              onOpacityChange={setOpacity}
              tta={tta}
              onTtaChange={setTta}
              onRun={handleRun}
              isRunning={isRunning}
              disabled={!selectedFile}
            />
          </div>
        </div>

        {/* Results */}
        {result && preview && (
          <ResultsPanel
            originalSrc={preview}
            maskSrc={result.mask}
            viewMode={viewMode}
            opacity={opacity}
          />
        )}

        {/* Performance + Insights */}
        {result && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PerformanceDashboard
                inferenceTime={result.inference_time}
                device={result.device}
              />
            </div>
            {insights && (
              <div>
                <InsightsPanel insights={insights} />
              </div>
            )}
          </div>
        )}

        {/* Class Legend */}
        <ClassLegend />

        {/* Collapsible sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TechnicalDetails />
          <SystemArchitecture />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
