import React from 'react';
import { Gamepad2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0A0A0A] border-t border-[#242424] py-10 mt-16 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#1F1F1F]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
                <Gamepad2 className="w-3.5 h-3.5" />
              </div>
              <span className="font-['Cinzel'] text-sm font-bold tracking-wider text-white">
                ORIBIUS <span className="text-[#C5A059]">DISCOVERY</span>
              </span>
            </div>
            <p className="text-neutral-500 max-w-md leading-relaxed">
              Plataforma especializada en catalogación técnica, verificación de compatibilidad de hardware y análisis de rendimiento para videojuegos de PC.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 text-xs font-mono text-neutral-400">
            <div className="space-y-1">
              <div className="text-white font-medium">Categorías Clave</div>
              <div>RPG & Acción</div>
              <div>Mundo Abierto</div>
              <div>Estrategia 4X</div>
            </div>
            <div className="space-y-1">
              <div className="text-white font-medium">Hardware & Datos</div>
              <div>Mapeo de Requisitos</div>
              <div>Buscador My Setup</div>
              <div>Diagnóstico por Componentes</div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500">
          <div>
            © {new Date().getFullYear()} Oribius Discovery. Todos los derechos reservados a sus respectivos desarrolladores y distribuidoras.
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Diseño optimizado para alto rendimiento y mínima latencia.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
