export interface HardwareItem {
  id: string;
  name: string;
  brand: 'NVIDIA' | 'AMD' | 'Intel' | 'Other';
  type: 'gpu' | 'cpu';
  releaseYear: number;
  score: number; // Normalized benchmark score (e.g., 200 - 18000)
  vramGb?: number; // For GPUs
  cores?: number; // For CPUs
  tier: 'Bajo' | 'Medio' | 'Alto' | 'Ultra';
  aliases: string[]; // For open search & autocomplete matching
}

export interface HardwareReference {
  name: string;
  score: number;
  vramGb?: number;
  cores?: number;
  details?: string;
}

export interface NormalizedRequirements {
  minCpu: HardwareReference;
  recCpu: HardwareReference;
  minGpu: HardwareReference;
  recGpu: HardwareReference;
  minRamGb: number;
  recRamGb: number;
  storageGb: number;
  storageType: 'SSD' | 'HDD';
  directXLevel?: number; // e.g. 11, 12
}

export interface UserHardwareSetup {
  cpu: string;
  gpu: string;
  cpuId?: string;
  gpuId?: string;
  cpuScore?: number;
  gpuScore?: number;
  ramGb: number;
  storageType: 'SSD' | 'HDD';
  storageFreeGb?: number;
  os?: string;
  presetName?: string;
}

export type ComponentStatus = 'pass' | 'warning' | 'fail';

export interface ComponentCheck {
  status: ComponentStatus;
  userValue: string;
  requiredValue: string;
  referenceModel?: string;
  percentage?: number; // e.g. 120 means 120% of required power
  details: string;
}

export interface GameCompatibility {
  overall: 'optimal' | 'playable' | 'unsupported';
  score: number; // 0 - 100
  label: string; // e.g. "Corre al Máximo", "Cumple Mínimos", "Insuficiente"
  badgeColor: 'gold-bright' | 'gold-classic' | 'gold-bronze' | 'gold-muted' | 'emerald' | 'amber' | 'rose';
  summary: string;
  resolutionEstimate: string; // e.g. "1080p · 60+ FPS (Ultra)", "720p · 30 FPS"
  cpu: ComponentCheck;
  gpu: ComponentCheck;
  ram: ComponentCheck;
  storage: ComponentCheck;
  gpuRatio: number; // user gpu score / game recommended gpu score
  cpuRatio: number; // user cpu score / game recommended cpu score
}

export interface HardwarePreset {
  id: string;
  name: string;
  badge: 'Bajo' | 'Medio' | 'Alto';
  description: string;
  setup: UserHardwareSetup;
}
