import React from 'react';
import { Gamepad2, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0A0A0A] border-t border-[#242424] py-10 mt-16 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#1F1F1F]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-[#F97316]/10 border border-[#F97316]/30 flex items-center justify-center text-[#F97316]">
                <Gamepad2 className="w-3.5 h-3.5" />
              </div>
              <span className="font-['Cinzel'] text-sm font-bold tracking-wider text-white">
                ORIBIUS <span className="text-[#F97316]">VAULT</span>
              </span>
            </div>
            <p className="text-neutral-500 max-w-md leading-relaxed">
              Plataforma especializada en catalogación y enlaces directos de descarga para videojuegos de PC. Enlaces limpios, sin ventanas emergentes intrusivas y con integridad verificada por hash.
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
              <div className="text-white font-medium">Seguridad</div>
              <div>Integridad SHA256</div>
              <div>Mirrors Verificados</div>
              <div>Instaladores Limpios</div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500">
          <div>
            © {new Date().getFullYear()} Oribius Vault. Todos los derechos reservados a sus respectivos desarrolladores y distribuidoras.
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Diseño optimizado para alto rendimiento y mínima latencia.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
