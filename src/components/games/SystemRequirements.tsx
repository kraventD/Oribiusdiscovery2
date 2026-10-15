import React from 'react';
import { Shield, Monitor } from 'lucide-react';
import { SystemSpecs } from '../../types/game';

interface SystemRequirementsProps {
  minimum: SystemSpecs;
  recommended: SystemSpecs;
}

export const SystemRequirements: React.FC<SystemRequirementsProps> = ({
  minimum,
  recommended,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
      {/* Minimum Requirements */}
      <div className="p-5 bg-[#1A1714] border border-[rgba(237,230,216,0.14)] rounded-[4px]">
        <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-[rgba(237,230,216,0.14)]">
          <Shield className="w-4 h-4 text-[#A89F90]" />
          <h5 className="font-semibold text-[#EDE6D8] uppercase tracking-wider text-[11px] font-mono">
            Requisitos Mínimos
          </h5>
        </div>

        <dl className="space-y-2.5">
          <div>
            <dt className="text-[#A89F90]">Sistema Operativo:</dt>
            <dd className="text-[#EDE6D8] font-medium">{minimum.os}</dd>
          </div>
          <div>
            <dt className="text-[#A89F90]">Procesador (CPU):</dt>
            <dd className="text-[#EDE6D8] font-medium">{minimum.cpu}</dd>
          </div>
          <div>
            <dt className="text-[#A89F90]">Memoria RAM:</dt>
            <dd className="text-[#EDE6D8] font-medium">{minimum.ram}</dd>
          </div>
          <div>
            <dt className="text-[#A89F90]">Tarjeta Gráfica (GPU):</dt>
            <dd className="text-[#EDE6D8] font-medium">{minimum.gpu}</dd>
          </div>
          <div>
            <dt className="text-[#A89F90]">Almacenamiento:</dt>
            <dd className="text-[#EDE6D8] font-medium">{minimum.storage}</dd>
          </div>
          {minimum.directX && (
            <div>
              <dt className="text-[#A89F90]">DirectX:</dt>
              <dd className="text-[#EDE6D8] font-medium">{minimum.directX}</dd>
            </div>
          )}
        </dl>
      </div>

      {/* Recommended Requirements */}
      <div className="p-5 bg-[#1A1714] border border-[#B8976A]/30 rounded-[4px]">
        <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-[rgba(237,230,216,0.14)]">
          <Monitor className="w-4 h-4 text-[#B8976A]" />
          <h5 className="font-semibold text-[#B8976A] uppercase tracking-wider text-[11px] font-mono">
            Requisitos Recomendados
          </h5>
        </div>

        <dl className="space-y-2.5">
          <div>
            <dt className="text-[#A89F90]">Sistema Operativo:</dt>
            <dd className="text-[#EDE6D8] font-medium">{recommended.os}</dd>
          </div>
          <div>
            <dt className="text-[#A89F90]">Procesador (CPU):</dt>
            <dd className="text-[#EDE6D8] font-medium">{recommended.cpu}</dd>
          </div>
          <div>
            <dt className="text-[#A89F90]">Memoria RAM:</dt>
            <dd className="text-[#EDE6D8] font-medium">{recommended.ram}</dd>
          </div>
          <div>
            <dt className="text-[#A89F90]">Tarjeta Gráfica (GPU):</dt>
            <dd className="text-[#EDE6D8] font-medium">{recommended.gpu}</dd>
          </div>
          <div>
            <dt className="text-[#A89F90]">Almacenamiento:</dt>
            <dd className="text-[#EDE6D8] font-medium">{recommended.storage}</dd>
          </div>
          {recommended.directX && (
            <div>
              <dt className="text-[#A89F90]">DirectX:</dt>
              <dd className="text-[#EDE6D8] font-medium">{recommended.directX}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
};
