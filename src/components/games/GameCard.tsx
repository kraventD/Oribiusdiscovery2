import React, { useState } from 'react';
import { ArrowRight, Layers, Star } from 'lucide-react';
import { GameItem } from '../../types/game';
import { HardwareTierIndicator } from '../ui/HardwareTierIndicator';

interface GameCardProps {
  game: GameItem;
  onSelectGame: (game: GameItem) => void;
  onQuickDownload: (game: GameItem) => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  onSelectGame,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={() => onSelectGame(game)}
      className="group cursor-pointer flex flex-col transition-all duration-300 select-none"
    >
      {/* Poster Container with Refined Hairline Border and Warm Gold Glow */}
      <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#121212] border border-white/[0.08] group-hover:border-[#B8976A]/60 transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_16px_36px_-8px_rgba(184,151,106,0.2)]">
        {!imageError ? (
          <img
            src={game.coverUrl}
            alt={game.title}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#1A1A1A] to-[#0E0E0E] text-neutral-500">
            <Layers className="w-8 h-8 text-[#B8976A]/50 mb-2" />
            <span className="text-xs font-medium text-neutral-300 text-center line-clamp-2">
              {game.title}
            </span>
          </div>
        )}

        {/* Ambient Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-50 group-hover:opacity-30 transition-opacity" />

        {/* Discrete Rating Tag */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px] font-mono text-[#DCCFAE] flex items-center gap-1 border border-white/10 group-hover:border-[#B8976A]/40 transition-colors">
          <Star className="w-3 h-3 text-[#B8976A] fill-[#B8976A]" />
          <span>{game.rating}%</span>
        </div>

        {/* Subtle bottom light shimmer on hover in gold */}
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-[#B8976A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Uncluttered Metadata: Hardware Tier + Genre */}
      <div className="mt-3.5 space-y-1">
        <h3 className="text-sm sm:text-base font-semibold text-white tracking-wide group-hover:text-[#B8976A] transition-colors line-clamp-1">
          {game.title}
        </h3>

        {/* Hardware Tier Indicator */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
          <HardwareTierIndicator tier={game.hardwareTier} />
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span className="truncate">{game.genres[0]}</span>
        </div>

        {/* Bottom Line: File Size + Elegant Download Link */}
        <div className="pt-1.5 flex items-center justify-between text-xs font-mono text-neutral-400">
          <span className="text-neutral-300 font-medium">{game.fileSize}</span>
          <span className="group-hover:text-[#DFCA9E] flex items-center gap-1 font-sans font-medium transition-colors">
            Descargar
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </div>
  );
};
