import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { GameItem } from '../../types/game';

interface FeaturedCardProps {
  game: GameItem;
  onOpenLinks: (game: GameItem) => void;
  onOpenDetails: (game: GameItem) => void;
}

export const FeaturedCard: React.FC<FeaturedCardProps> = ({
  game,
  onOpenLinks,
  onOpenDetails,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex flex-col justify-between select-none">
      <div>
        {/* Cover Image: 4:5 ratio, 4px corners */}
        <div
          onClick={() => onOpenDetails(game)}
          className="relative aspect-[4/5] w-full rounded-[4px] overflow-hidden bg-[#1A1714] cursor-pointer group mb-4"
        >
          {!imgError ? (
            <img
              src={game.coverUrl}
              alt={game.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#1A1714] text-[#A89F90] text-sm font-['Libre_Baskerville',serif]">
              {game.title}
            </div>
          )}

          {/* Special "NUEVO" badge (used on Balatro) */}
          {game.isNew && (
            <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-[#B8976A] text-[#12100E] text-[10px] font-bold font-mono uppercase tracking-wider rounded-[2px] shadow-md">
              NUEVO
            </div>
          )}
        </div>

        {/* Metadata: Row 1 - Title on Left, Size on Right */}
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <h3
            onClick={() => onOpenDetails(game)}
            className="font-['Libre_Baskerville',serif] text-lg text-[#EDE6D8] hover:text-[#B8976A] transition-colors cursor-pointer truncate"
            title={game.title}
          >
            {game.title}
          </h3>
          <span className="text-xs font-sans text-[#A89F90] shrink-0">
            {game.fileSize}
          </span>
        </div>

        {/* Metadata: Row 2 - Genre · Year */}
        <div className="text-xs text-[#A89F90] font-sans mb-3.5">
          <span>{game.genres[0]}</span>
          <span className="mx-1.5 opacity-50">·</span>
          <span>{game.releaseYear}</span>
        </div>

        {/* Server Badges (Pills) */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          {game.servers.map(server => (
            <span
              key={server}
              className="h-[28px] px-3 rounded-full border border-[rgba(237,230,216,0.24)] text-[#A89F90] text-xs flex items-center justify-center font-sans"
            >
              {server}
            </span>
          ))}
        </div>
      </div>

      {/* Action Button: "Ver enlaces" with 1px gold border, 4px corners */}
      <button
        onClick={() => onOpenLinks(game)}
        className="w-full h-[48px] bg-transparent border border-[#B8976A] hover:bg-[#B8976A]/10 text-[#B8976A] text-xs font-semibold rounded-[4px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
      >
        <Download className="w-4 h-4" />
        <span>Ver enlaces</span>
      </button>
    </div>
  );
};
