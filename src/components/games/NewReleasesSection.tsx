import React from 'react';
import { Download } from 'lucide-react';
import { GameItem } from '../../types/game';
import { UserHardwareSetup } from '../../types/setup';
import { HardwareTierIndicator } from '../ui/HardwareTierIndicator';
import { SetupBadge } from '../setup/SetupBadge';

interface NewReleasesSectionProps {
  games: GameItem[];
  setup?: UserHardwareSetup | null;
  onOpenLinks: (game: GameItem) => void;
  onOpenDetails: (game: GameItem) => void;
  onViewAll: () => void;
  onOpenSetupModal?: () => void;
}

export const NewReleasesSection: React.FC<NewReleasesSectionProps> = ({
  games,
  setup,
  onOpenLinks,
  onOpenDetails,
  onViewAll,
  onOpenSetupModal,
}) => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <h2 className="font-['Libre_Baskerville',serif] text-2xl sm:text-[32px] font-normal text-[#EDE6D8]">
            Nuevos lanzamientos
          </h2>
          <p className="text-xs text-[#A89F90] mt-1">
            Últimas incorporaciones al catálogo con requisitos y enlaces al día
          </p>
        </div>

        <button
          onClick={onViewAll}
          className="text-sm font-sans text-[#A89F90] hover:text-[#EDE6D8] underline underline-offset-4 transition-colors cursor-pointer"
        >
          Ver todos →
        </button>
      </div>

      {/* Rows */}
      {games.length === 0 ? (
        <div className="p-8 text-center bg-[#151210] border border-[rgba(237,230,216,0.1)] rounded-[4px] text-sm text-[#A89F90]">
          No hay lanzamientos compatibles con los filtros actuales.
        </div>
      ) : (
        <div className="flex flex-col">
          {games.map(game => (
            <div
              key={game.id}
              className="min-h-[96px] border-b border-[rgba(237,230,216,0.14)] flex items-center justify-between gap-4 py-3"
            >
              {/* Left: Thumbnail + Title & Metadata */}
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
                  <div className="flex items-center gap-2 text-xs text-[#A89F90] font-sans mt-1 flex-wrap">
                    <HardwareTierIndicator tier={game.hardwareTier} />
                    <span className="opacity-40">·</span>
                    <span className="truncate">{game.genres.slice(0, 2).join(' · ')}</span>
                    <div className="hidden sm:inline-flex ml-1">
                      <SetupBadge
                        game={game}
                        setup={setup || null}
                        onOpenSetupModal={onOpenSetupModal}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Setup badge on mobile + Size + Action */}
              <div className="flex items-center gap-4 sm:gap-8 shrink-0">
                <div className="sm:hidden">
                  <SetupBadge
                    game={game}
                    setup={setup || null}
                    onOpenSetupModal={onOpenSetupModal}
                  />
                </div>

                <span className="text-xs sm:text-sm font-sans text-[#A89F90] hidden xs:inline-block">
                  {game.fileSize}
                </span>

                <button
                  onClick={() => onOpenLinks(game)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#B8976A] hover:text-[#c9a677] transition-colors cursor-pointer select-none"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Ver enlaces</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
