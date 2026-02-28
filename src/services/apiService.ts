const API_BASE = 'http://localhost:5000';

export interface PredictionResult {
  mask: string; // base64 or URL
  inference_time?: number;
  device?: string;
}

export const apiService = {
  async healthCheck(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/`, { signal: AbortSignal.timeout(5000) });
      return res.ok;
    } catch {
      return false;
    }
  },

  async getModelStatus(): Promise<{ device: string } | null> {
    try {
      const res = await fetch(`${API_BASE}/model-status`, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  async predict(imageFile: File, tta: boolean = false): Promise<PredictionResult> {
    const formData = new FormData();
    formData.append('image', imageFile);
    if (tta) formData.append('tta', 'true');

    const res = await fetch(`${API_BASE}/predict`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Prediction failed: ${res.statusText}`);
    }

    const contentType = res.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const data = await res.json();
      return {
        mask: data.mask || data.image || data.result,
        inference_time: data.inference_time,
        device: data.device,
      };
    }

    // Binary PNG response
    const blob = await res.blob();
    const maskUrl = URL.createObjectURL(blob);
    return {
      mask: maskUrl,
      inference_time: undefined,
      device: undefined,
    };
  },
};
