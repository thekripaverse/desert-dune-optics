// Segmentation class definitions
export const SEGMENTATION_CLASSES = [
  { id: 0, name: 'Trees', color: '#2D6A4F', icon: '🌲' },
  { id: 1, name: 'Lush Bushes', color: '#52B788', icon: '🌿' },
  { id: 2, name: 'Dry Grass', color: '#B5A642', icon: '🌾' },
  { id: 3, name: 'Dry Bushes', color: '#8B7355', icon: '🍂' },
  { id: 4, name: 'Ground Clutter', color: '#8D6E63', icon: '🪨' },
  { id: 5, name: 'Flowers', color: '#D4A574', icon: '🌸' },
  { id: 6, name: 'Logs', color: '#6D4C41', icon: '🪵' },
  { id: 7, name: 'Rocks', color: '#78909C', icon: '🪨' },
  { id: 8, name: 'Landscape', color: '#A1887F', icon: '🏜' },
  { id: 9, name: 'Sky', color: '#90CAF9', icon: '☁️' },
] as const;

export type ViewMode = 'overlay' | 'raw';

export interface TerrainInsights {
  dominantClass: string;
  vegetationPercentage: number;
  rockDensity: number;
  skyCoverage: number;
}

// Simulate terrain insights from mask (in production, backend would provide)
export function computeTerrainInsights(): TerrainInsights {
  return {
    dominantClass: 'Landscape',
    vegetationPercentage: Math.round(15 + Math.random() * 20),
    rockDensity: Math.round(5 + Math.random() * 15),
    skyCoverage: Math.round(8 + Math.random() * 20),
  };
}
