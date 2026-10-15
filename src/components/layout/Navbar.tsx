import React from 'react';
import { SlidersHorizontal, Gamepad2, Search } from 'lucide-react';

interface NavbarProps {
  totalGames: number;
  onExploreClick: () => void;
  onFilterToggle: () => void;
  isFilterOpen: boolean;
  onSelectCategory: (category: string) => void;
  activeGenre: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalGames,
  onExploreClick,
  onFilterToggle,
  isFilterOpen,
  onSelectCategory,
  activeGenre,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0A0A]/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6 sm:gap-10">
        {/* Brand Wordmark (Cinzel / Serif) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              onSelectCategory('Todos');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] group-hover:scale-105 transition-transform">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <span className="font-['Cinzel'] text-xl font-bold tracking-wider text-white">
              Oribius <span className="text-[#F97316]">Vault</span>
            </span>
          </button>
        </div>

        {/* Navigation Links in clean text (Zero Boxes) */}
        <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-mono text-neutral-400">
          <button
            onClick={() => {
              onSelectCategory('Todos');
              onExploreClick();
            }}
            className={`transition-colors cursor-pointer ${
              activeGenre === 'Todos' ? 'text-[#F97316] font-semibold' : 'hover:text-white'
            }`}
          >
            Explorar ({totalGames})
          </button>
          <button
            onClick={() => {
              onSelectCategory('RPG');
              onExploreClick();
            }}
            className={`transition-colors cursor-pointer ${
              activeGenre === 'RPG' ? 'text-[#F97316] font-semibold' : 'hover:text-white'
            }`}
          >
            RPG
          </button>
          <button
            onClick={() => {
              onSelectCategory('Acción');
              onExploreClick();
            }}
            className={`transition-colors cursor-pointer ${
              activeGenre === 'Acción' ? 'text-[#F97316] font-semibold' : 'hover:text-white'
            }`}
          >
            Acción
          </button>
          <button
            onClick={() => {
              onSelectCategory('Mundo Abierto');
              onExploreClick();
            }}
            className={`transition-colors cursor-pointer ${
              activeGenre === 'Mundo Abierto' ? 'text-[#F97316] font-semibold' : 'hover:text-white'
            }`}
          >
            Mundo Abierto
          </button>
        </nav>

        {/* Right Zone: Integrated Search Bar + Filter Toggle */}
        <div className="flex items-center gap-3 shrink-0 flex-1 max-w-xs justify-end">
          <div className="relative w-full max-w-[220px]">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Buscar títulos..."
              className="w-full bg-[#141414] hover:bg-[#181818] text-white text-xs pl-8 pr-3 py-2 rounded-full border border-neutral-800 focus:outline-none focus:border-[#F97316] transition-colors placeholder:text-neutral-500 font-sans"
            />
          </div>

          <button
            onClick={onFilterToggle}
            className={`p-2 rounded-full border transition-colors cursor-pointer shrink-0 ${
              isFilterOpen
                ? 'bg-[#F97316]/10 text-[#F97316] border-[#F97316]/40'
                : 'text-neutral-400 hover:text-white border-neutral-800 hover:border-neutral-600'
            }`}
            title="Alternar filtros avanzados"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
