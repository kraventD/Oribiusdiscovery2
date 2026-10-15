import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { GameItem } from '../../types/game';

interface NewReleasesSectionProps {
  games: GameItem[];
  onOpenLinks: (game: GameItem) => void;
  onOpenDetails: (game: GameItem) => void;
  onViewAll: () => void;
}

export const NewReleasesSection: React.FC<NewReleasesSectionProps> = ({
  games,
  onOpenLinks,
  onOpenDetails,
  onViewAll,
}) => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-['Libre_Baskerville',serif] text-2xl sm:text-[32px] font-normal text-[#EDE6D8]">
          Nuevos lanzamientos
        </h2>

        <button
          onClick={onViewAll}
          className="text-sm font-sans text-[#A89F90] hover:text-[#EDE6D8] underline underline-offset-4 transition-colors cursor-pointer"
        >
          Ver todos →
        </button>
      </div>

      {/* 4 Rows separated by fine horizontal lines */}
      <div className="flex flex-col">
        {games.map(game => (
          <div
            key={game.id}
            className="h-[96px] border-b border-[rgba(237,230,216,0.14)] flex items-center justify-between gap-4 py-3"
          >
            {/* Left: Thumbnail + Title & Genre */}
            <div className="flex items-center gap-4 min-w-0">
              <div
                onClick={() => onOpenDetails(game)}
                className="w-[56px] h-[72px] rounded-[4px] overflow-hidden bg-[#1A1714] shrink-0 cursor-pointer group"
              >
                <img
                  src={game.coverUrl}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="min-w-0">
                <h4
                  onClick={() => onOpenDetails(game)}
                  className="font-sans font-medium text-base text-[#EDE6D8] hover:text-[#B8976A] transition-colors truncate cursor-pointer"
                >
                  {game.title}
                </h4>
                <div className="text-xs text-[#A89F90] font-sans mt-0.5 truncate">
                  {game.genres.slice(0, 2).join(' · ')}
                </div>
              </div>
            </div>

            {/* Right: Size + Action */}
            <div className="flex items-center gap-6 sm:gap-12 shrink-0">
              <span className="text-xs sm:text-sm font-sans text-[#A89F90]">
                {game.fileSize}
              </span>

              <button
                onClick={() => onOpenLinks(game)}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#B8976A] hover:text-[#c9a677] transition-colors cursor-pointer select-none"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Ver enlaces</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
