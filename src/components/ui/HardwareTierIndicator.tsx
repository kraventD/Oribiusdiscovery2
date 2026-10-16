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
      {/* 3 Stepped Bars in Tonal Gold */}
      <div className="flex items-end gap-0.5 h-3" aria-hidden="true">
        <span
          className={`w-1 rounded-xs transition-colors ${
            level >= 1 ? 'bg-[#8C6F38] h-1.5' : 'bg-[#2D2620] h-1.5'
          }`}
        />
        <span
          className={`w-1 rounded-xs transition-colors ${
            level >= 2 ? 'bg-[#C5A059] h-2.5' : 'bg-[#2D2620] h-2.5'
          }`}
        />
        <span
          className={`w-1 rounded-xs transition-colors ${
            level >= 3 ? 'bg-[#DFCA9E] h-3' : 'bg-[#2D2620] h-3'
          }`}
        />
      </div>
      {showLabel && (
        <span className="text-[#C5A059]/90 font-mono text-[11px]">{tier}</span>
      )}
    </div>
  );
};
