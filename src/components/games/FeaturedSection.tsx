import React from 'react';
import { Cpu, Check } from 'lucide-react';
import { GameItem } from '../../types/game';
import { UserHardwareSetup } from '../../types/setup';
import { FeaturedCard } from './FeaturedCard';

interface FeaturedSectionProps {
  games: GameItem[];
  setup?: UserHardwareSetup | null;
  onlyCompatible?: boolean;
  onToggleOnlyCompatible?: () => void;
  onOpenLinks: (game: GameItem) => void;
  onOpenDetails: (game: GameItem) => void;
  onViewAll: () => void;
  onOpenSetupModal?: () => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  games,
  setup,
  onlyCompatible = false,
  onToggleOnlyCompatible,
  onOpenLinks,
  onOpenDetails,
  onViewAll,
  onOpenSetupModal,
}) => {
  const hasSetup = Boolean(setup && setup.cpu && setup.gpu && setup.ramGb);

  return (
    <section className="w-full mb-16 pt-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between mb-8 gap-4">
        <div>
          <h2 className="font-['Libre_Baskerville',serif] text-3xl sm:text-[36px] font-normal text-[#EDE6D8]">
            Destacados
          </h2>
          <p className="text-xs text-[#A89F90] mt-1">
            Los títulos más aclamados y verificados de nuestra bóveda
          </p>
        </div>

        <div className="flex items-center gap-3 sm:gap-5 self-end sm:self-auto flex-wrap">
          {/* Quick Filter: "Solo compatibles con mi PC" */}
          <button
            onClick={() => {
              if (!hasSetup && onOpenSetupModal) {
                onOpenSetupModal();
              } else if (onToggleOnlyCompatible) {
                onToggleOnlyCompatible();
              }
            }}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] border text-xs font-sans transition-all cursor-pointer ${
              onlyCompatible && hasSetup
                ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#DFCA9E] font-medium'
                : 'bg-[#1A1613] border-[rgba(237,230,216,0.14)] hover:border-[#B8976A] text-[#A89F90] hover:text-[#EDE6D8]'
            }`}
            title={
              hasSetup
                ? 'Filtrar solo juegos que tu setup puede correr'
                : 'Configura tu setup para activar este filtro'
            }
          >
            <Cpu className={`w-3.5 h-3.5 ${onlyCompatible && hasSetup ? 'text-[#DFCA9E]' : 'text-[#B8976A]'}`} />
            <span>Solo compatibles con mi PC</span>
            {hasSetup && (
              <span
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] ${
                  onlyCompatible
                    ? 'bg-[#C5A059] text-[#12100E] font-bold'
                    : 'border border-[rgba(237,230,216,0.2)]'
                }`}
              >
                {onlyCompatible && <Check className="w-2.5 h-2.5" />}
              </span>
            )}
          </button>

          <button
            onClick={onViewAll}
            className="text-sm font-sans text-[#A89F90] hover:text-[#EDE6D8] underline underline-offset-4 transition-colors cursor-pointer"
          >
            Ver todos →
          </button>
        </div>
      </div>

      {/* 4 Cards Grid */}
      {games.length === 0 ? (
        <div className="p-8 text-center bg-[#151210] border border-[rgba(237,230,216,0.1)] rounded-[4px] text-sm text-[#A89F90]">
          No hay juegos destacados compatibles con tu setup actual. Puedes ajustar tus componentes o desactivar el filtro.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {games.map(game => (
            <FeaturedCard
              key={game.id}
              game={game}
              setup={setup}
              onOpenLinks={onOpenLinks}
              onOpenDetails={onOpenDetails}
              onOpenSetupModal={onOpenSetupModal}
            />
          ))}
        </div>
      )}
    </section>
  );
};
