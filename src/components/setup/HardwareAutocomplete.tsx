import React, { useState, useRef, useEffect } from 'react';
import { Search, Check, Cpu, Monitor } from 'lucide-react';
import { searchHardware, HardwareItem, findHardwareByNameOrAlias } from '../../data/hardwareDatabase';

interface HardwareAutocompleteProps {
  type: 'gpu' | 'cpu';
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string, matchedItem?: HardwareItem) => void;
}

export const HardwareAutocomplete: React.FC<HardwareAutocompleteProps> = ({
  type,
  label,
  value,
  placeholder,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<HardwareItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Search when value or isOpen changes
  useEffect(() => {
    const list = searchHardware(value, type, 8);
    setResults(list);
  }, [value, type]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item: HardwareItem) => {
    onChange(item.name, item);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const exact = findHardwareByNameOrAlias(val, type);
    onChange(val, exact || undefined);
    setIsOpen(true);
  };

  const currentMatched = findHardwareByNameOrAlias(value, type);

  // Brand badges strictly in the gold spectrum
  const getBrandBadge = (brand: string) => {
    switch (brand) {
      case 'NVIDIA':
        return 'bg-[#C5A059]/20 text-[#DFCA9E] border-[#C5A059]/40';
      case 'AMD':
        return 'bg-[#B8976A]/15 text-[#C5A059] border-[#B8976A]/35';
      case 'Intel':
        return 'bg-[#9E7B3B]/15 text-[#DFCA9E] border-[#9E7B3B]/30';
      default:
        return 'bg-[rgba(237,230,216,0.08)] text-[#EDE6D8]/80 border-[rgba(237,230,216,0.15)]';
    }
  };

  // Hardware Tier tags in cohesive tonal gold shades
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Ultra':
        return 'text-[#F5E5C9] border-[#E5C378]/60 bg-[#C5A059]/25';
      case 'Alto':
        return 'text-[#DFCA9E] border-[#C5A059]/40 bg-[#C5A059]/15';
      case 'Medio':
        return 'text-[#C5A059] border-[#B8976A]/35 bg-[#B8976A]/10';
      default:
        return 'text-[#9E7B3B] border-[#8C6F38]/30 bg-[#8C6F38]/10';
    }
  };

  return (
    <div className="relative space-y-1.5" ref={containerRef}>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs font-serif uppercase tracking-wider text-[#EDE6D8]/80">
          {type === 'gpu' ? <Monitor className="w-3.5 h-3.5 text-[#C5A059]" /> : <Cpu className="w-3.5 h-3.5 text-[#C5A059]" />}
          {label}
        </label>
        {currentMatched && (
          <span className="text-[11px] font-mono text-[#DFCA9E] flex items-center gap-1">
            <Check className="w-3 h-3 text-[#C5A059]" />
            {currentMatched.score.toLocaleString()} pts · {currentMatched.tier}
          </span>
        )}
      </div>

      {/* Input container */}
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-[#18181B] border border-[rgba(237,230,216,0.18)] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] text-sm text-[#EDE6D8] placeholder-[#EDE6D8]/30 px-3.5 py-2.5 pl-9 rounded transition-colors"
        />
        <Search className="w-4 h-4 text-[#EDE6D8]/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* Dropdown Suggestions List */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 left-0 right-0 mt-1 max-h-64 overflow-y-auto bg-[#18181B] border border-[#C5A059]/40 rounded shadow-2xl divide-y divide-[rgba(237,230,216,0.06)] animate-in fade-in duration-150">
          <div className="px-3 py-1.5 bg-[#121214] text-[10px] font-mono uppercase tracking-wider text-[#EDE6D8]/50 flex justify-between items-center">
            <span>Modelos comerciales compatibles ({results.length})</span>
            <span>Rendimiento Benchmark</span>
          </div>
          {results.map((item) => {
            const isSelected = currentMatched?.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item)}
                className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between gap-3 hover:bg-[#C5A059]/15 transition-colors cursor-pointer ${
                  isSelected ? 'bg-[#C5A059]/10' : ''
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border ${getBrandBadge(
                        item.brand
                      )}`}
                    >
                      {item.brand}
                    </span>
                    <span className="text-xs font-medium text-[#EDE6D8] truncate">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] font-mono text-[#EDE6D8]/50">
                    <span>{item.releaseYear}</span>
                    {item.vramGb && <span>· {item.vramGb} GB VRAM</span>}
                    {item.cores && <span>· {item.cores} Núcleos</span>}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-mono font-bold text-[#EDE6D8]">
                    {item.score.toLocaleString()} <span className="text-[10px] font-normal text-[#EDE6D8]/50">pts</span>
                  </div>
                  <span
                    className={`inline-block text-[9px] font-mono uppercase px-1.5 py-0.2 rounded border ${getTierColor(
                      item.tier
                    )}`}
                  >
                    {item.tier}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
