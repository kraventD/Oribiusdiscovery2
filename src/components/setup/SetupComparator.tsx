import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Cpu,
  Monitor,
  HardDrive,
  Layers,
  Settings,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { GameItem } from '../../types/game';
import { UserHardwareSetup, ComponentCheck } from '../../types/setup';
import { evaluateGameCompatibility } from '../../utils/hardwareChecker';

interface SetupComparatorProps {
  game: GameItem;
  setup: UserHardwareSetup | null;
  onOpenSetupModal: () => void;
}

export const SetupComparator: React.FC<SetupComparatorProps> = ({
  game,
  setup,
  onOpenSetupModal,
}) => {
  const hasSetup = Boolean(setup && setup.cpu && setup.gpu);

  if (!hasSetup) {
    return (
      <div className="bg-[#151210] border border-[rgba(237,230,216,0.14)] rounded-[4px] p-5 sm:p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-[4px] bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] shrink-0 mt-0.5">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-base sm:text-lg text-[#EDE6D8] font-normal">
                ¿Correrá {game.title} en tu PC?
              </h4>
              <p className="text-xs text-[#EDE6D8]/60 mt-1 leading-relaxed max-w-xl">
                Configura los componentes de tu equipo para comparar en vivo tu procesador, tarjeta gráfica y RAM contra las equivalencias reales y requisitos del juego.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenSetupModal}
            className="w-full sm:w-auto px-4 py-2.5 bg-[#C5A059] hover:bg-[#d4b06b] text-[#12100E] text-xs font-bold font-sans rounded-[4px] transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-md"
          >
            <span>Configurar Mi Setup</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  const result = evaluateGameCompatibility(game, setup);

  // Status badges strictly within the gold spectrum
  const getStatusBadge = (check: ComponentCheck) => {
    if (check.status === 'pass') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#DFCA9E] bg-[#C5A059]/20 border border-[#C5A059]/40 px-2 py-0.5 rounded-[2px]">
          <CheckCircle2 className="w-3 h-3 text-[#DFCA9E]" />
          <span>{check.percentage && check.percentage > 100 ? `+${check.percentage - 100}% Potencia` : 'Cumple Óptimo'}</span>
        </span>
      );
    }
    if (check.status === 'warning') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#C5A059] bg-[#B8976A]/15 border border-[#B8976A]/30 px-2 py-0.5 rounded-[2px]">
          <AlertTriangle className="w-3 h-3 text-[#C5A059]" />
          <span>Ajustado</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#A89F90] bg-[#1E1B17] border border-[#8C6F38]/30 px-2 py-0.5 rounded-[2px]">
        <XCircle className="w-3 h-3 text-[#8C6F38]" />
        <span>Insuficiente</span>
      </span>
    );
  };

  const norm = game.normalizedRequirements;

  const rows = [
    {
      id: 'gpu',
      label: 'Tarjeta Gráfica',
      icon: Monitor,
      check: result.gpu,
      reference: norm ? `${norm.recGpu.name} (${norm.recGpu.score.toLocaleString()} pts)` : game.requirements.recommended.gpu,
      percentage: result.gpu.percentage,
    },
    {
      id: 'cpu',
      label: 'Procesador',
      icon: Cpu,
      check: result.cpu,
      reference: norm ? `${norm.recCpu.name} (${norm.recCpu.score.toLocaleString()} pts)` : game.requirements.recommended.cpu,
      percentage: result.cpu.percentage,
    },
    {
      id: 'ram',
      label: 'Memoria RAM',
      icon: Layers,
      check: result.ram,
      reference: norm ? `${norm.recRamGb} GB RAM (Mínimo: ${norm.minRamGb} GB)` : game.requirements.recommended.ram,
    },
    {
      id: 'storage',
      label: 'Almacenamiento',
      icon: HardDrive,
      check: result.storage,
      reference: norm ? `${norm.storageGb} GB ${norm.storageType}` : game.requirements.recommended.storage,
    },
  ];

  return (
    <div className="bg-[#151210] border border-[rgba(237,230,216,0.16)] rounded-[4px] p-5 sm:p-6 mb-8 space-y-5">
      {/* Top Verdict Row in Tonal Gold */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(237,230,216,0.1)]">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h4 className="font-serif text-lg text-[#EDE6D8] font-normal">
              Diagnóstico con Tu Setup
            </h4>
            {result.overall === 'optimal' && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium text-[#DFCA9E] bg-[#C5A059]/20 border border-[#C5A059]/50 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#DFCA9E]" />
                <span>{result.label} ({result.score}/100)</span>
              </span>
            )}
            {result.overall === 'playable' && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium text-[#C5A059] bg-[#B8976A]/15 border border-[#B8976A]/40 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#C5A059]" />
                <span>{result.label} ({result.score}/100)</span>
              </span>
            )}
            {result.overall === 'unsupported' && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium text-[#A89F90] bg-[#1E1B17] border border-[#8C6F38]/30 flex items-center gap-1">
                <XCircle className="w-3 h-3 text-[#8C6F38]" />
                <span>{result.label} ({result.score}/100)</span>
              </span>
            )}
          </div>
          <p className="text-xs text-[#EDE6D8]/70 mt-1.5 leading-relaxed">
            {result.summary} <span className="text-[#C5A059] font-medium font-mono">({result.resolutionEstimate})</span>
          </p>
        </div>

        <button
          onClick={onOpenSetupModal}
          className="inline-flex items-center gap-1.5 text-xs font-sans text-[#EDE6D8]/70 hover:text-[#EDE6D8] px-3 py-1.5 rounded-[4px] bg-[#1E1B17] hover:bg-[#2A241F] border border-[rgba(237,230,216,0.16)] hover:border-[#C5A059] transition-colors cursor-pointer shrink-0"
        >
          <Settings className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Modificar Setup</span>
        </button>
      </div>

      {/* Component by Component Diagnostics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {rows.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="p-3.5 bg-[#1A1613] border border-[rgba(237,230,216,0.08)] rounded-[4px] space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="text-xs font-medium text-[#EDE6D8]">
                    {item.label}
                  </span>
                </div>
                {getStatusBadge(item.check)}
              </div>

              {/* Power comparison bar in cohesive gold tones */}
              {item.percentage !== undefined && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-[#EDE6D8]/60">
                    <span>Potencia relativa</span>
                    <span
                      className={
                        item.percentage >= 100
                          ? 'text-[#DFCA9E] font-bold'
                          : item.percentage >= 60
                          ? 'text-[#C5A059]'
                          : 'text-[#9E7B3B]'
                      }
                    >
                      {item.percentage}% del recomendado
                    </span>
                  </div>
                  <div className="w-full bg-[#121214] h-1.5 rounded-full overflow-hidden border border-[rgba(237,230,216,0.1)]">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.percentage >= 100
                          ? 'bg-gradient-to-r from-[#B8976A] to-[#DFCA9E]'
                          : item.percentage >= 60
                          ? 'bg-[#C5A059]'
                          : 'bg-[#8C6F38]'
                      }`}
                      style={{ width: `${Math.min(100, item.percentage)}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1 text-xs">
                <div className="flex items-baseline justify-between text-[#EDE6D8]">
                  <span className="text-[11px] text-[#EDE6D8]/50">Tu componente:</span>
                  <span className="font-mono text-right truncate max-w-[220px]" title={item.check.userValue}>
                    {item.check.userValue}
                  </span>
                </div>
                <div className="flex items-baseline justify-between text-[#EDE6D8]/70">
                  <span className="text-[11px] text-[#EDE6D8]/50">Ref. recomendada:</span>
                  <span className="font-mono text-[11px] text-right truncate max-w-[220px]" title={item.reference}>
                    {item.reference}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-[#EDE6D8]/60 border-t border-[rgba(237,230,216,0.06)] pt-1.5 leading-snug">
                {item.check.details}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
