import React from 'react';
import { GameItem } from '../../types/game';
import { FeaturedCard } from './FeaturedCard';

interface FeaturedSectionProps {
  games: GameItem[];
  onOpenLinks: (game: GameItem) => void;
  onOpenDetails: (game: GameItem) => void;
  onViewAll: () => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  games,
  onOpenLinks,
  onOpenDetails,
  onViewAll,
}) => {
  return (
    <section className="w-full mb-16 pt-12">
      {/* Section Header */}
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="font-['Libre_Baskerville',serif] text-3xl sm:text-[36px] font-normal text-[#EDE6D8]">
          Destacados
        </h2>

        <button
          onClick={onViewAll}
          className="text-sm font-sans text-[#A89F90] hover:text-[#EDE6D8] underline underline-offset-4 transition-colors cursor-pointer"
        >
          Ver todos →
        </button>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {games.map(game => (
          <FeaturedCard
            key={game.id}
            game={game}
            onOpenLinks={onOpenLinks}
            onOpenDetails={onOpenDetails}
          />
        ))}
      </div>
    </section>
  );
};
