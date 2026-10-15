import React from 'react';
import { Search, Download } from 'lucide-react';
import { GameItem } from '../../types/game';

interface HeroSectionProps {
  game: GameItem;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenLinks: (game: GameItem) => void;
  onOpenDetails: (game: GameItem) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  game,
  searchQuery,
  onSearchChange,
  onOpenLinks,
  onOpenDetails,
}) => {
  return (
    <section className="relative w-full min-h-[760px] lg:min-h-[820px] flex flex-col justify-between overflow-hidden bg-[#12100E]">
      {/* Background Image: Panoramic Landscape of Elden Ring with Erdtree */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img
          src={game.bannerUrl}
          alt={game.title}
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />

        {/* Precise Atmospheric Scrims: Dark left for text, golden glow right, dark bottom */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#12100E] via-[#12100E]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-transparent to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#12100E]/70 via-transparent to-transparent" />
      </div>

      {/* 1. Overlaid Top Bar (Barra superior superpuesta) */}
      <div className="relative z-20 w-full h-[72px] sm:h-[88px] px-4 sm:px-10 lg:px-[72px] flex items-center justify-between gap-3 sm:gap-6">
        {/* Left: Pill Search Bar (~440px wide, 48px height) */}
        <div className="relative w-full max-w-[440px]">
          <Search className="w-4 h-4 text-[#A89F90] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Buscar juegos..."
            className="w-full h-[44px] sm:h-[48px] pl-11 pr-4 bg-[#12100E]/40 backdrop-blur-md text-[#EDE6D8] placeholder-[#A89F90] text-xs sm:text-sm rounded-full border border-[rgba(237,230,216,0.24)] focus:outline-none focus:border-[#B8976A] transition-colors"
          />
        </div>

        {/* Right: Brand and Avatar */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          <span className="hidden sm:inline-block font-['Libre_Baskerville',serif] text-sm sm:text-base tracking-[0.25em] text-[#EDE6D8] uppercase select-none">
            [ M A R C A ]
          </span>

          <div
            className="w-10 h-10 sm:w-[44px] sm:h-[44px] rounded-full border border-[#B8976A] flex items-center justify-center font-['Libre_Baskerville',serif] text-[#EDE6D8] text-xs sm:text-sm select-none"
            title="Perfil de Usuario"
          >
            N
          </div>
        </div>
      </div>

      {/* 2. Hero Main Content (~72px margin left) */}
      <div className="relative z-10 w-full px-4 sm:px-10 lg:px-[72px] py-8 sm:py-10 my-auto">
        <div className="max-w-[640px]">
          {/* Kicker */}
          <div className="text-xs sm:text-[13px] font-mono uppercase tracking-[0.2em] text-[#B8976A] font-semibold mb-2 sm:mb-3">
            NUEVO · {game.title.toUpperCase()}
          </div>

          {/* Headline in two lines (Serif high-contrast, adaptable on mobile) */}
          <h1 className="font-['Libre_Baskerville',serif] text-3xl sm:text-6xl md:text-7xl lg:text-[88px] font-normal leading-[1.1] sm:leading-[1.04] tracking-tight mb-4 sm:mb-6">
            <span className="text-[#EDE6D8] block">Elige el juego.</span>
            <span className="text-[#B8976A] block">Elige tu servidor.</span>
          </h1>

          {/* Description */}
          <p className="text-[#EDE6D8] text-sm sm:text-lg max-w-[480px] leading-relaxed mb-6 sm:mb-8 opacity-95">
            Enlaces de descarga en varios servidores, ordenados y a un clic de distancia.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6">
            <button
              onClick={() => onOpenLinks(game)}
              className="h-[50px] sm:h-[56px] px-6 sm:px-8 bg-[#B8976A] hover:bg-[#c9a677] text-[#12100E] font-semibold text-xs tracking-wider uppercase rounded-[4px] flex items-center justify-center gap-2.5 transition-colors cursor-pointer select-none"
            >
              <Download className="w-4 h-4" />
              <span>VER ENLACES DE DESCARGA</span>
            </button>

            <button
              onClick={() => onOpenDetails(game)}
              className="text-[#EDE6D8] hover:text-[#B8976A] text-sm font-medium underline underline-offset-4 transition-colors cursor-pointer text-center sm:text-left py-2"
            >
              Ver detalles →
            </button>
          </div>
        </div>
      </div>

      {/* 3. Hero Bottom Strip (Franja inferior del héroe) */}
      <div className="relative z-20 w-full border-t border-[rgba(237,230,216,0.14)] px-6 sm:px-10 lg:px-[72px] py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left: Game Title and Metadata */}
        <div className="flex items-center gap-3">
          <span className="font-['Libre_Baskerville',serif] text-lg text-[#EDE6D8]">
            {game.title}
          </span>
          <span className="text-xs text-[#A89F90] font-sans">
            RPG · 60 GB · v1.16
          </span>
        </div>

        {/* Center: Server Badges (Pills) */}
        <div className="flex items-center gap-2 flex-wrap">
          {game.servers.map(server => (
            <span
              key={server}
              className="h-[30px] px-4 rounded-full border border-[rgba(237,230,216,0.24)] text-[#A89F90] text-xs flex items-center justify-center font-sans"
            >
              {server}
            </span>
          ))}
        </div>

        {/* Right: Carousel Indicator (01 - 02 - 03) */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#A89F90] select-none">
          <span className="text-[#B8976A] font-semibold pb-0.5 border-b-2 border-[#B8976A]">
            01
          </span>
          <span className="text-[#A89F90]/40">──</span>
          <span className="text-[#A89F90]/60">02</span>
          <span className="text-[#A89F90]/40">──</span>
          <span className="text-[#A89F90]/60">03</span>
        </div>
      </div>
    </section>
  );
};
