import React, { useState, useEffect } from 'react';
import {
  X,
  Cpu,
  Monitor,
  HardDrive,
  Check,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { UserHardwareSetup, HardwareItem } from '../../types/setup';
import { RAM_OPTIONS } from '../../utils/hardwarePresets';
import { resolveUserHardware } from '../../utils/hardwareChecker';
import { HardwareAutocomplete } from './HardwareAutocomplete';

interface MySetupModalProps {
  isOpen: boolean;
  currentSetup: UserHardwareSetup | null;
  onClose: () => void;
  onSave: (setup: UserHardwareSetup) => void;
  onClear: () => void;
}

export const MySetupModal: React.FC<MySetupModalProps> = ({
  isOpen,
  currentSetup,
  onClose,
  onSave,
  onClear,
}) => {
  const [cpu, setCpu] = useState('');
  const [cpuId, setCpuId] = useState<string | undefined>(undefined);
  const [cpuScore, setCpuScore] = useState<number | undefined>(undefined);

  const [gpu, setGpu] = useState('');
  const [gpuId, setGpuId] = useState<string | undefined>(undefined);
  const [gpuScore, setGpuScore] = useState<number | undefined>(undefined);

  const [ramGb, setRamGb] = useState<number>(16);
  const [storageType, setStorageType] = useState<'SSD' | 'HDD'>('SSD');
  const [storageFreeGb, setStorageFreeGb] = useState<number>(250);
  const [os, setOs] = useState('Windows 11 64-bit');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Load current setup on open
  useEffect(() => {
    if (isOpen) {
      if (currentSetup) {
        setCpu(currentSetup.cpu || '');
        setCpuId(currentSetup.cpuId);
        setCpuScore(currentSetup.cpuScore);

        setGpu(currentSetup.gpu || '');
        setGpuId(currentSetup.gpuId);
        setGpuScore(currentSetup.gpuScore);

        setRamGb(currentSetup.ramGb || 16);
        setStorageType(currentSetup.storageType || 'SSD');
        setStorageFreeGb(currentSetup.storageFreeGb || 250);
        setOs(currentSetup.os || 'Windows 11 64-bit');
      } else {
        // Clean default starting state for manual entry
        setCpu('');
        setCpuId(undefined);
        setCpuScore(undefined);

        setGpu('');
        setGpuId(undefined);
        setGpuScore(undefined);

        setRamGb(16);
        setStorageType('SSD');
        setStorageFreeGb(250);
        setOs('Windows 11 64-bit');
      }
      setSavedSuccess(false);
    }
  }, [isOpen, currentSetup]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCpuChange = (val: string, item?: HardwareItem) => {
    setCpu(val);
    if (item) {
      setCpuId(item.id);
      setCpuScore(item.score);
    } else {
      setCpuId(undefined);
      setCpuScore(undefined);
    }
  };

  const handleGpuChange = (val: string, item?: HardwareItem) => {
    setGpu(val);
    if (item) {
      setGpuId(item.id);
      setGpuScore(item.score);
    } else {
      setGpuId(undefined);
      setGpuScore(undefined);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cpu.trim() || !gpu.trim()) return;

    // Resolve hardware to ensure score is persisted
    const resolvedCpu = resolveUserHardware(cpu.trim(), 'cpu', cpuId, cpuScore);
    const resolvedGpu = resolveUserHardware(gpu.trim(), 'gpu', gpuId, gpuScore);

    const newSetup: UserHardwareSetup = {
      cpu: resolvedCpu.name,
      cpuId: resolvedCpu.item?.id || cpuId,
      cpuScore: resolvedCpu.score,
      gpu: resolvedGpu.name,
      gpuId: resolvedGpu.item?.id || gpuId,
      gpuScore: resolvedGpu.score,
      ramGb: Number(ramGb) || 8,
      storageType,
      storageFreeGb: Number(storageFreeGb) || 100,
      os,
    };

    onSave(newSetup);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const handleClear = () => {
    onClear();
    setCpu('');
    setCpuId(undefined);
    setCpuScore(undefined);
    setGpu('');
    setGpuId(undefined);
    setGpuScore(undefined);
    setRamGb(8);
    onClose();
  };

  // Live resolved components for preview
  const liveCpu = resolveUserHardware(cpu, 'cpu', cpuId, cpuScore);
  const liveGpu = resolveUserHardware(gpu, 'gpu', gpuId, gpuScore);

  // Cohesive tonal gold hierarchy for diagnostic tier
  const overallTier =
    liveGpu.score >= 9000 && liveCpu.score >= 9000 && ramGb >= 16
      ? {
          label: 'Gama Alta / Ultra',
          color: 'text-[#DFCA9E]',
          desc: 'Capaz de ejecutar los lanzamientos AAA más exigentes a 60+ FPS en calidad máxima.',
        }
      : liveGpu.score >= 4000 && liveCpu.score >= 4500 && ramGb >= 8
      ? {
          label: 'Gama Media Sólida',
          color: 'text-[#C5A059]',
          desc: 'Excelente fluidez en 1080p para la gran mayoría del catálogo de videojuegos.',
        }
      : {
          label: 'Gama de Entrada / Básica',
          color: 'text-[#9E7B3B]',
          desc: 'Adecuado para juegos de requisitos moderados, títulos independientes y emulación.',
        };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#14110F] border border-[rgba(237,230,216,0.18)] rounded-[6px] shadow-2xl overflow-hidden text-[#EDE6D8] font-sans my-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 bg-[#1A1613] border-b border-[rgba(237,230,216,0.12)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[4px] bg-[#C5A059]/15 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059]">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-normal text-[#EDE6D8]">
                Mi Setup de Hardware
              </h2>
              <p className="text-xs text-[#EDE6D8]/60 mt-0.5">
                Buscador con modelos comerciales y mapeo de equivalencias matemáticas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#EDE6D8]/60 hover:text-[#EDE6D8] hover:bg-[#25201B] rounded-[4px] transition-colors cursor-pointer"
            title="Cerrar (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Form */}
          <form id="setup-form" onSubmit={handleSubmit} className="space-y-5">
            {/* Field: Tarjeta Gráfica (GPU) with rich autocomplete */}
            <HardwareAutocomplete
              type="gpu"
              label="Tarjeta Gráfica (GPU)"
              value={gpu}
              placeholder="Escribe tu modelo (ej: GTX 1660, RTX 3060, RX 580, Iris Xe...)"
              onChange={handleGpuChange}
            />

            {/* Field: Procesador (CPU) with rich autocomplete */}
            <HardwareAutocomplete
              type="cpu"
              label="Procesador (CPU)"
              value={cpu}
              placeholder="Escribe tu procesador (ej: Ryzen 5 3600, i5-12400F, i7-8700K...)"
              onChange={handleCpuChange}
            />

            {/* RAM and Storage Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* RAM */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#EDE6D8]/80 mb-1.5 flex items-center justify-between">
                  <span>Memoria RAM</span>
                  <span className="text-[#C5A059] font-bold">{ramGb} GB</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {RAM_OPTIONS.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setRamGb(val)}
                      className={`px-3 py-1.5 text-xs font-mono rounded-[4px] border transition-colors cursor-pointer ${
                        ramGb === val
                          ? 'border-[#C5A059] bg-[#C5A059]/20 text-[#DFCA9E] font-bold'
                          : 'border-[rgba(237,230,216,0.12)] bg-[#1A1613] text-[#EDE6D8]/70 hover:text-[#EDE6D8] hover:border-[rgba(237,230,216,0.25)]'
                      }`}
                    >
                      {val} GB
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#EDE6D8]/80 mb-1.5 flex items-center gap-2">
                  <HardDrive className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Tipo de Almacenamiento</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setStorageType('SSD')}
                    className={`py-2 px-3 text-xs font-mono rounded-[4px] border text-center transition-colors cursor-pointer ${
                      storageType === 'SSD'
                        ? 'border-[#C5A059] bg-[#C5A059]/20 text-[#DFCA9E] font-bold'
                        : 'border-[rgba(237,230,216,0.12)] bg-[#1A1613] text-[#EDE6D8]/60 hover:text-[#EDE6D8]'
                    }`}
                  >
                    SSD (Recomendado)
                  </button>
                  <button
                    type="button"
                    onClick={() => setStorageType('HDD')}
                    className={`py-2 px-3 text-xs font-mono rounded-[4px] border text-center transition-colors cursor-pointer ${
                      storageType === 'HDD'
                        ? 'border-[#8C6F38] bg-[#8C6F38]/20 text-[#C5A059] font-bold'
                        : 'border-[rgba(237,230,216,0.12)] bg-[#1A1613] text-[#EDE6D8]/60 hover:text-[#EDE6D8]'
                    }`}
                  >
                    HDD Mecánico
                  </button>
                </div>
              </div>
            </div>

            {/* Live Diagnosis Preview Card in Gold Tonal Spectrum */}
            <div className="p-3.5 rounded-[4px] bg-[#1A1613] border border-[rgba(237,230,216,0.14)] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#EDE6D8]/60 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  Diagnóstico en Tiempo Real
                </span>
                <span className={`font-bold ${overallTier.color}`}>
                  {overallTier.label}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-1">
                <div className="bg-[#14110F] p-2 rounded border border-[rgba(237,230,216,0.08)]">
                  <span className="text-[#EDE6D8]/50 text-[10px] block uppercase">Índice Gráfica</span>
                  <span className="text-[#DFCA9E] font-bold text-sm">
                    {liveGpu.score.toLocaleString()} <span className="text-[10px] font-normal text-[#EDE6D8]/50">pts</span>
                  </span>
                  <span className="text-[10px] text-[#EDE6D8]/60 block truncate">{liveGpu.name}</span>
                </div>
                <div className="bg-[#14110F] p-2 rounded border border-[rgba(237,230,216,0.08)]">
                  <span className="text-[#EDE6D8]/50 text-[10px] block uppercase">Índice Procesador</span>
                  <span className="text-[#DFCA9E] font-bold text-sm">
                    {liveCpu.score.toLocaleString()} <span className="text-[10px] font-normal text-[#EDE6D8]/50">pts</span>
                  </span>
                  <span className="text-[10px] text-[#EDE6D8]/60 block truncate">{liveCpu.name}</span>
                </div>
              </div>

              <p className="text-[11px] text-[#EDE6D8]/70 leading-relaxed pt-1">
                {overallTier.desc}
              </p>
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#1A1613] border-t border-[rgba(237,230,216,0.12)] flex items-center justify-between flex-wrap gap-3">
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1.5 text-xs font-mono text-[#EDE6D8]/60 hover:text-[#C5A059] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restablecer
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono text-[#EDE6D8]/70 hover:text-[#EDE6D8] rounded-[4px] border border-[rgba(237,230,216,0.14)] hover:bg-[#25201B] transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              form="setup-form"
              className="flex items-center gap-2 px-5 py-2 text-xs font-mono uppercase tracking-wider font-bold text-[#14110F] bg-[#C5A059] hover:bg-[#d4b06b] rounded-[4px] transition-colors shadow-lg cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-[#14110F]" />
                  ¡Guardado!
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Guardar Mi Setup
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
