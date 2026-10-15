import { useState, useMemo } from 'react';
import { GameItem, FilterState, SortOption } from '../types/game';

const INITIAL_FILTER_STATE: FilterState = {
  searchQuery: '',
  selectedGenre: 'Todos',
  selectedYearRange: [2000, 2026],
  selectedSizeBucket: 'all',
  sortBy: 'recent',
};

export function useGameFilters(allGames: GameItem[]) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER_STATE);

  const setSearchQuery = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  const setSelectedGenre = (genre: string) => {
    setFilters(prev => ({ ...prev, selectedGenre: genre }));
  };

  const setSelectedYearRange = (range: [number, number]) => {
    setFilters(prev => ({ ...prev, selectedYearRange: range }));
  };

  const setSelectedSizeBucket = (bucket: string) => {
    setFilters(prev => ({ ...prev, selectedSizeBucket: bucket }));
  };

  const setSortBy = (sort: SortOption) => {
    setFilters(prev => ({ ...prev, sortBy: sort }));
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTER_STATE);
  };

  const hasActiveFilters = useMemo(() => {
    return (
      filters.searchQuery.trim() !== '' ||
      filters.selectedGenre !== 'Todos' ||
      filters.selectedYearRange[0] !== 2000 ||
      filters.selectedYearRange[1] !== 2026 ||
      filters.selectedSizeBucket !== 'all' ||
      filters.sortBy !== 'recent'
    );
  }, [filters]);

  const filteredGames = useMemo(() => {
    return allGames
      .filter(game => {
        // Search text matching
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase().trim();
          const matchesTitle = game.title.toLowerCase().includes(q);
          const matchesDev = game.developer.toLowerCase().includes(q);
          const matchesTags = game.tags.some(t => t.toLowerCase().includes(q));
          const matchesGenre = game.genres.some(g => g.toLowerCase().includes(q));
          if (!matchesTitle && !matchesDev && !matchesTags && !matchesGenre) {
            return false;
          }
        }

        // Genre matching
        if (filters.selectedGenre !== 'Todos') {
          if (!game.genres.includes(filters.selectedGenre)) {
            return false;
          }
        }

        // Year range matching
        if (
          game.releaseYear < filters.selectedYearRange[0] ||
          game.releaseYear > filters.selectedYearRange[1]
        ) {
          return false;
        }

        // Size bucket matching
        if (filters.selectedSizeBucket !== 'all') {
          if (filters.selectedSizeBucket === 'lt-10' && game.sizeGb >= 10) return false;
          if (filters.selectedSizeBucket === '10-30' && (game.sizeGb < 10 || game.sizeGb > 30)) return false;
          if (filters.selectedSizeBucket === '30-60' && (game.sizeGb < 30 || game.sizeGb > 60)) return false;
          if (filters.selectedSizeBucket === 'gt-60' && game.sizeGb <= 60) return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'recent':
          case 'year-desc':
            return b.releaseYear - a.releaseYear;
          case 'year-asc':
            return a.releaseYear - b.releaseYear;
          case 'rating':
            return b.rating - a.rating;
          case 'title-asc':
            return a.title.localeCompare(b.title);
          case 'size-asc':
            return a.sizeGb - b.sizeGb;
          case 'size-desc':
            return b.sizeGb - a.sizeGb;
          case 'downloads':
          default:
            return (b.rating * 10 + b.releaseYear) - (a.rating * 10 + a.releaseYear);
        }
      });
  }, [allGames, filters]);

  return {
    filters,
    filteredGames,
    setSearchQuery,
    setSelectedGenre,
    setSelectedYearRange,
    setSelectedSizeBucket,
    setSortBy,
    resetFilters,
    hasActiveFilters,
    totalCount: allGames.length,
    filteredCount: filteredGames.length,
  };
}
