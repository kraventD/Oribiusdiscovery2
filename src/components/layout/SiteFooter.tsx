import React from 'react';

export const SiteFooter: React.FC = () => {
  return (
    <footer className="w-full border-t border-[rgba(237,230,216,0.14)] mt-24 py-12 px-6 sm:px-10 lg:px-[72px]">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-sans text-[#A89F90]">
        {/* Left: Brand */}
        <span className="font-['Libre_Baskerville',serif] text-sm tracking-[0.25em] text-[#EDE6D8] uppercase select-none">
          [ M A R C A ]
        </span>

        {/* Center: Legal Links */}
        <div className="flex items-center gap-8 uppercase tracking-[0.16em] text-[11px]">
          <a href="#terminos" className="hover:text-[#EDE6D8] transition-colors">
            TÉRMINOS
          </a>
          <a href="#privacidad" className="hover:text-[#EDE6D8] transition-colors">
            PRIVACIDAD
          </a>
          <a href="#ayuda" className="hover:text-[#EDE6D8] transition-colors">
            AYUDA
          </a>
        </div>

        {/* Right: Copyright */}
        <span className="tracking-wide text-[11px]">
          © 2026 [ M A R C A ]
        </span>
      </div>
    </footer>
  );
};
