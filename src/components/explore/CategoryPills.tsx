import React from 'react';
import { GENRES_LIST } from '../../data/gamesCatalog';

interface CategoryPillsProps {
  selectedGenre: string;
  onSelectGenre: (genre: string) => void;
  genreCounts: Record<string, number>;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  selectedGenre,
  onSelectGenre,
  genreCounts,
}) => {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none">
      <div className="flex items-center gap-6 min-w-max border-b border-[#1E1E1E] px-1">
        {GENRES_LIST.map(genre => {
          const isSelected = selectedGenre === genre;
          const count = genreCounts[genre] ?? 0;

          return (
            <button
              key={genre}
              onClick={() => onSelectGenre(genre)}
              className={`pb-3 text-sm font-medium transition-all whitespace-nowrap cursor-pointer relative flex items-center gap-1.5 ${
                isSelected
                  ? 'text-white font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <span>{genre}</span>
              <span
                className={`text-[11px] font-mono tabular-nums ${
                  isSelected ? 'text-[#C5A059]' : 'text-neutral-500'
                }`}
              >
                ({count})
              </span>

              {/* Active Underline Indicator */}
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A059] rounded-full shadow-[0_0_8px_rgba(197,160,89,0.5)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
