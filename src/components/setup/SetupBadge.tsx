import React from 'react';
import { Cpu, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { GameItem } from '../../types/game';
import { UserHardwareSetup } from '../../types/setup';
import { evaluateGameCompatibility } from '../../utils/hardwareChecker';

interface SetupBadgeProps {
  game: GameItem;
  setup: UserHardwareSetup | null;
  onOpenSetupModal?: () => void;
  size?: 'sm' | 'md';
  className?: string;
}

export const SetupBadge: React.FC<SetupBadgeProps> = ({
  game,
  setup,
  onOpenSetupModal,
  size = 'sm',
  className = '',
}) => {
  const hasSetup = Boolean(setup && setup.cpu && setup.gpu && setup.ramGb);

  if (!hasSetup) {
    return (
      <button
        onClick={e => {
          e.stopPropagation();
          if (onOpenSetupModal) onOpenSetupModal();
        }}
        title="Configura las especificaciones de tu PC para ver si puedes correr este juego"
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] border border-[rgba(184,151,106,0.35)] hover:border-[#B8976A] bg-[#1E1B17]/80 hover:bg-[#2A241F] text-[#B8976A] hover:text-[#EDE6D8] font-mono text-[10px] tracking-tight transition-all cursor-pointer group ${className}`}
      >
        <Cpu className="w-3 h-3 text-[#B8976A] group-hover:scale-110 transition-transform" />
        <span>Comprobar PC</span>
      </button>
    );
  }

  const result = evaluateGameCompatibility(game, setup);

  if (result.overall === 'optimal') {
    return (
      <div
        onClick={e => {
          e.stopPropagation();
          if (onOpenSetupModal) onOpenSetupModal();
        }}
        title={`${result.summary} (${result.resolutionEstimate}) - Clic para ver o cambiar Setup`}
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] border border-[#C5A059]/60 bg-[#C5A059]/20 text-[#DFCA9E] font-mono ${
          size === 'sm' ? 'text-[10px]' : 'text-xs'
        } font-medium tracking-tight cursor-pointer hover:border-[#E5C378] hover:bg-[#C5A059]/30 transition-colors ${className}`}
      >
        <Sparkles className="w-3 h-3 text-[#DFCA9E] shrink-0" />
        <span className="truncate">Corre Óptimo</span>
      </div>
    );
  }

  if (result.overall === 'playable') {
    return (
      <div
        onClick={e => {
          e.stopPropagation();
          if (onOpenSetupModal) onOpenSetupModal();
        }}
        title={`${result.summary} (${result.resolutionEstimate}) - Clic para ver o cambiar Setup`}
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] border border-[#B8976A]/45 bg-[#B8976A]/12 text-[#C5A059] font-mono ${
          size === 'sm' ? 'text-[10px]' : 'text-xs'
        } font-medium tracking-tight cursor-pointer hover:border-[#C5A059] hover:bg-[#B8976A]/20 transition-colors ${className}`}
      >
        <CheckCircle2 className="w-3 h-3 text-[#C5A059] shrink-0" />
        <span className="truncate">Cumple Mínimos</span>
      </div>
    );
  }

  return (
    <div
      onClick={e => {
        e.stopPropagation();
        if (onOpenSetupModal) onOpenSetupModal();
      }}
      title={`${result.summary} - Clic para ver o cambiar Setup`}
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] border border-[#8C6F38]/35 bg-[#1C1814] text-[#A89F90] font-mono ${
        size === 'sm' ? 'text-[10px]' : 'text-xs'
      } font-medium tracking-tight cursor-pointer hover:border-[#8C6F38]/60 hover:text-[#EDE6D8] transition-colors ${className}`}
    >
      <AlertTriangle className="w-3 h-3 text-[#9E7B3B] shrink-0" />
      <span className="truncate">Requisitos Justos / Bajos</span>
    </div>
  );
};
