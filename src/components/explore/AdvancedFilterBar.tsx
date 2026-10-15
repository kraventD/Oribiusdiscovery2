import React from 'react';
import { RotateCcw, Calendar, HardDrive, ArrowUpDown } from 'lucide-react';
import { SortOption } from '../../types/game';

interface AdvancedFilterBarProps {
  selectedYearRange: [number, number];
  onYearRangeChange: (range: [number, number]) => void;
  selectedSizeBucket: string;
  onSizeBucketChange: (bucket: string) => void;
  sortBy: SortOption;
  onSortByChange: (sort: SortOption) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
  totalResults: number;
}

const YEAR_PRESETS: { label: string; range: [number, number] }[] = [
  { label: 'Todos los años', range: [2000, 2026] },
  { label: '2024 - 2026', range: [2024, 2026] },
  { label: '2020 - 2023', range: [2020, 2023] },
  { label: '2015 - 2019', range: [2015, 2019] },
  { label: 'Clásicos (<2015)', range: [2000, 2014] },
];

const SIZE_PRESETS = [
  { id: 'all', label: 'Cualquier tamaño' },
  { id: 'lt-10', label: '< 10 GB' },
  { id: '10-30', label: '10 - 30 GB' },
  { id: '30-60', label: '30 - 60 GB' },
  { id: 'gt-60', label: '> 60 GB' },
];

export const AdvancedFilterBar: React.FC<AdvancedFilterBarProps> = ({
  selectedYearRange,
  onYearRangeChange,
  selectedSizeBucket,
  onSizeBucketChange,
  sortBy,
  onSortByChange,
  onReset,
  hasActiveFilters,
  totalResults,
}) => {
  return (
    <div className="py-6 mb-8 border-b border-[#1E1E1E] text-sm animate-fade-in">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <span className="text-white font-medium text-xs uppercase tracking-widest font-mono">
            Filtros Detallados
          </span>
          <span className="text-neutral-500 text-xs">
            ({totalResults} {totalResults === 1 ? 'título disponible' : 'títulos disponibles'})
          </span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs text-[#EA580C] hover:text-[#FB923C] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer todo</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Year Filter */}
        <div>
          <label className="text-xs text-neutral-400 font-mono flex items-center gap-2 mb-3">
            <Calendar className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Año ({selectedYearRange[0]} - {selectedYearRange[1]})</span>
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {YEAR_PRESETS.map(preset => {
              const isMatch =
                selectedYearRange[0] === preset.range[0] &&
                selectedYearRange[1] === preset.range[1];
              return (
                <button
                  key={preset.label}
                  onClick={() => onYearRangeChange(preset.range)}
                  className={`text-xs transition-colors cursor-pointer ${
                    isMatch
                      ? 'text-[#F97316] font-semibold underline underline-offset-4 decoration-[#F97316]'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="range"
              min="2000"
              max="2026"
              value={selectedYearRange[0]}
              onChange={e =>
                onYearRangeChange([
                  Math.min(Number(e.target.value), selectedYearRange[1]),
                  selectedYearRange[1],
                ])
              }
              className="w-full accent-[#F97316] h-1 bg-[#242424] rounded cursor-pointer"
            />
            <input
              type="range"
              min="2000"
              max="2026"
              value={selectedYearRange[1]}
              onChange={e =>
                onYearRangeChange([
                  selectedYearRange[0],
                  Math.max(Number(e.target.value), selectedYearRange[0]),
                ])
              }
              className="w-full accent-[#F97316] h-1 bg-[#242424] rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Size Filter */}
        <div>
          <label className="text-xs text-neutral-400 font-mono flex items-center gap-2 mb-3">
            <HardDrive className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Tamaño en Disco</span>
          </label>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {SIZE_PRESETS.map(preset => {
              const isSelected = selectedSizeBucket === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => onSizeBucketChange(preset.id)}
                  className={`text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'text-[#F97316] font-semibold underline underline-offset-4 decoration-[#F97316]'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort Filter */}
        <div>
          <label className="text-xs text-neutral-400 font-mono flex items-center gap-2 mb-3">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Criterio de Ordenación</span>
          </label>
          <select
            value={sortBy}
            onChange={e => onSortByChange(e.target.value as SortOption)}
            className="w-full bg-[#121212] text-neutral-200 border border-[#242424] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#F97316] transition-colors cursor-pointer"
          >
            <option value="recent">Más recientes primero (por año)</option>
            <option value="downloads">Más populares</option>
            <option value="rating">Mayor valoración de la crítica</option>
            <option value="year-asc">Año: Antiguos primero</option>
            <option value="size-asc">Tamaño: Menor a mayor</option>
            <option value="size-desc">Tamaño: Mayor a menor (AAA)</option>
            <option value="title-asc">Nombre: Alfabético (A - Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
