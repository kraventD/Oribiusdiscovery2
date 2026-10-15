import React from 'react';
import { Home, Gamepad2, LayoutGrid, Star, Heart } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onNavigate,
}) => {
  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'juegos', label: 'Juegos', icon: Gamepad2 },
    { id: 'categorias', label: 'Categorías', icon: LayoutGrid },
    { id: 'novedades', label: 'Novedades', icon: Star },
    { id: 'favoritos', label: 'Favoritos', icon: Heart },
  ];

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 z-40 w-[88px] bg-[#12100E] border-r border-[rgba(237,230,216,0.14)] flex-col items-center py-6 select-none">
      {/* Top Brand Geometric Diamond (Rhombus) */}
      <div className="pt-2 pb-10">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#B8976A]"
        >
          <path
            d="M12 2L22 12L12 22L2 12L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="currentColor"
            fillOpacity="0.8"
          />
        </svg>
      </div>

      {/* Vertical Navigation Items */}
      <nav className="flex-1 w-full flex flex-col gap-5">
        {navItems.map(item => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="relative w-full py-3.5 flex flex-col items-center justify-center transition-colors group cursor-pointer"
            >
              {/* Active Indicator Bar (3px on far left edge) */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#B8976A]" />
              )}

              <Icon
                className={`w-[22px] h-[22px] transition-colors ${
                  isActive
                    ? 'text-[#EDE6D8]'
                    : 'text-[#A89F90] group-hover:text-[#EDE6D8]'
                }`}
                strokeWidth={1.75}
              />

              <span
                className={`text-[11px] font-sans mt-1.5 tracking-wide transition-colors ${
                  isActive
                    ? 'text-[#EDE6D8] font-medium'
                    : 'text-[#A89F90] group-hover:text-[#EDE6D8]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
