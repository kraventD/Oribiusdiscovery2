import React from 'react';

interface HardwareTierIndicatorProps {
  tier: 'Bajo' | 'Medio' | 'Alto';
  showLabel?: boolean;
}

export const HardwareTierIndicator: React.FC<HardwareTierIndicatorProps> = ({
  tier,
  showLabel = true,
}) => {
  const level = tier === 'Bajo' ? 1 : tier === 'Medio' ? 2 : 3;

  return (
    <div className="flex items-center gap-1.5" title={`Exigencia de hardware: ${tier}`}>
      {/* 3 Stepped Bars Indicator */}
      <div className="flex items-end gap-0.5 h-3" aria-hidden="true">
        <span
          className={`w-1 rounded-xs transition-colors ${
            level >= 1 ? 'bg-emerald-400 h-1.5' : 'bg-neutral-700 h-1.5'
          }`}
        />
        <span
          className={`w-1 rounded-xs transition-colors ${
            level >= 2 ? 'bg-amber-400 h-2.5' : 'bg-neutral-700 h-2.5'
          }`}
        />
        <span
          className={`w-1 rounded-xs transition-colors ${
            level >= 3 ? 'bg-[#F97316] h-3' : 'bg-neutral-700 h-3'
          }`}
        />
      </div>
      {showLabel && (
        <span className="text-neutral-300 font-mono text-[11px]">{tier}</span>
      )}
    </div>
  );
};
