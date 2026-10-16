import React from 'react';
import { Home, Gamepad2, LayoutGrid, Star, Heart, Cpu } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  hasSetup?: boolean;
  onOpenSetup?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onNavigate,
  hasSetup = false,
  onOpenSetup,
}) => {
  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'juegos', label: 'Juegos', icon: Gamepad2 },
    { id: 'setup', label: 'Mi Setup', icon: Cpu, isAction: true },
    { id: 'categorias', label: 'Categorías', icon: LayoutGrid },
    { id: 'novedades', label: 'Novedades', icon: Star },
    { id: 'favoritos', label: 'Favoritos', icon: Heart },
  ];

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 z-40 w-[88px] bg-[#12100E] border-r border-[rgba(237,230,216,0.14)] flex-col items-center py-6 select-none">
      {/* Top Brand Geometric Diamond (Rhombus) */}
      <div className="pt-2 pb-8">
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
      <nav className="flex-1 w-full flex flex-col gap-4">
        {navItems.map(item => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'setup' && onOpenSetup) {
                  onOpenSetup();
                } else {
                  onNavigate(item.id);
                }
              }}
              className="relative w-full py-3 flex flex-col items-center justify-center transition-colors group cursor-pointer"
            >
              {/* Active Indicator Bar (3px on far left edge) */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#B8976A]" />
              )}

              <div className="relative">
                <Icon
                  className={`w-[22px] h-[22px] transition-colors ${
                    isActive
                      ? 'text-[#EDE6D8]'
                      : 'text-[#A89F90] group-hover:text-[#EDE6D8]'
                  }`}
                  strokeWidth={1.75}
                />
                {/* Active Setup Status Indicator Dot */}
                {item.id === 'setup' && hasSetup && (
                  <span
                    className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-emerald-400 border border-[#12100E] shadow-[0_0_6px_rgba(52,211,153,0.8)]"
                    title="Setup configurado"
                  />
                )}
              </div>

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
