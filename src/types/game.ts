import { NormalizedRequirements } from './setup';

export interface DownloadLink {
  id: string;
  serverName: string;
  partLabel: string;
  size: string;
  url: string;
  verifiedDate: string;
  status: 'online' | 'fast';
}

export interface SystemSpecs {
  os: string;
  cpu: string;
  ram: string;
  gpu: string;
  storage: string;
  directX?: string;
}

export interface GameItem {
  id: string;
  slug: string;
  title: string;
  releaseYear: number;
  hardwareTier: 'Bajo' | 'Medio' | 'Alto';
  genres: string[];
  coverUrl: string;
  bannerUrl: string;
  description: string;
  shortDescription: string;
  fileSize: string;
  sizeGb: number;
  version: string;
  developer: string;
  publisher: string;
  rating: number;
  sha256: string;
  languages: string[];
  screenshots: string[];
  downloadLinks: DownloadLink[];
  requirements: {
    minimum: SystemSpecs;
    recommended: SystemSpecs;
  };
  normalizedRequirements?: NormalizedRequirements;
  installationSteps: string[];
  tags: string[];
  servers: string[];
  isFeatured?: boolean;
  isNew?: boolean;
}

export type SortOption = 'recent' | 'downloads' | 'rating' | 'year-desc' | 'year-asc' | 'title-asc' | 'size-asc' | 'size-desc';

export interface FilterState {
  searchQuery: string;
  selectedGenre: string;
  selectedYearRange: [number, number]; // [min, max]
  selectedSizeBucket: string; // 'all' | 'lt-10' | '10-30' | '30-60' | 'gt-60'
  sortBy: SortOption;
}
