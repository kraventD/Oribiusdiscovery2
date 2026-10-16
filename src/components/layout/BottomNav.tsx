import React from 'react';
import { Home, Gamepad2, LayoutGrid, Star, Cpu } from 'lucide-react';

interface BottomNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  hasSetup?: boolean;
  onOpenSetup?: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeSection,
  onNavigate,
  hasSetup = false,
  onOpenSetup,
}) => {
  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'juegos', label: 'Juegos', icon: Gamepad2 },
    { id: 'setup', label: 'Mi Setup', icon: Cpu },
    { id: 'categorias', label: 'Categorías', icon: LayoutGrid },
    { id: 'novedades', label: 'Novedades', icon: Star },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#12100E]/95 backdrop-blur-xl border-t border-[rgba(237,230,216,0.14)] px-2 pt-1.5 pb-[max(env(safe-area-inset-bottom,0px),8px)] select-none shadow-[0_-4px_24px_rgba(0,0,0,0.65)]"
      aria-label="Navegación móvil"
    >
      <div className="grid grid-cols-5 items-center justify-around">
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
              className="relative flex flex-col items-center justify-center py-1 px-1 min-h-[50px] transition-all group active:scale-95 cursor-pointer"
            >
              {/* Active Indicator Top Glow Line */}
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2.5px] bg-[#B8976A] rounded-full shadow-[0_0_8px_rgba(184,151,106,0.8)]" />
              )}

              <div className="relative mt-0.5">
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive
                      ? 'text-[#EDE6D8]'
                      : 'text-[#8A8275] group-hover:text-[#EDE6D8]'
                  }`}
                  strokeWidth={isActive ? 2.2 : 1.75}
                />
                {/* Active indicator dot for setup */}
                {item.id === 'setup' && hasSetup && (
                  <span
                    className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-emerald-400 border border-[#12100E] shadow-[0_0_6px_rgba(52,211,153,0.8)]"
                    title="Setup activo"
                  />
                )}
              </div>

              <span
                className={`text-[10px] font-sans mt-1 tracking-tight transition-colors ${
                  isActive
                    ? 'text-[#EDE6D8] font-semibold'
                    : 'text-[#8A8275] group-hover:text-[#EDE6D8]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
