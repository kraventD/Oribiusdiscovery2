import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  totalFiltered: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  totalFiltered,
}) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
        <Search className="w-4 h-4" />
      </div>

      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Buscar por título, desarrollador, saga o palabras clave (ej. Elden Ring, RPG, 2024)..."
        className="w-full pl-10 pr-24 py-2.5 bg-[#141414] border border-[#242424] rounded-lg text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-[#C5A059] transition-colors"
      />

      <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
        {value && (
          <button
            onClick={() => onChange('')}
            className="text-neutral-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            title="Borrar búsqueda"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        <span className="text-[11px] font-mono text-[#DFCA9E] bg-[#C5A059]/10 border border-[#C5A059]/20 px-1.5 py-0.5 rounded">
          {totalFiltered}
        </span>
      </div>
    </div>
  );
};
