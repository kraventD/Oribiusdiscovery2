import React, { useState, useEffect, useMemo, useRef } from 'react';
import { X, Download, Copy, Check, ShieldCheck, ArrowRight, HardDrive, Star, Calendar, Monitor, Sparkles } from 'lucide-react';
import { GameItem } from '../../types/game';
import { GAMES_CATALOG } from '../../data/gamesCatalog';
import { HardwareTierIndicator } from '../ui/HardwareTierIndicator';
import { UserHardwareSetup } from '../../types/setup';
import { SetupComparator } from '../setup/SetupComparator';
import { SetupBadge } from '../setup/SetupBadge';

interface GameDetailModalProps {
  game: GameItem | null;
  onClose: () => void;
  onSelectGame?: (game: GameItem) => void;
  onReportLink?: () => void;
  setup?: UserHardwareSetup | null;
  onOpenSetupModal?: () => void;
}

export const GameDetailModal: React.FC<GameDetailModalProps> = ({
  game,
  onClose,
  onSelectGame,
  onReportLink,
  setup,
  onOpenSetupModal,
}) => {
  const [copiedPassword, setCopiedPassword] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);
  const [selectedScreenshotForLightbox, setSelectedScreenshotForLightbox] = useState<string | null>(null);
  const [reportSent, setReportSent] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const downloadSectionRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (game) {
      document.body.style.overflow = 'hidden';
      // Reset scroll position to top when game changes
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedScreenshotForLightbox) {
          setSelectedScreenshotForLightbox(null);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [game, onClose, selectedScreenshotForLightbox]);

  // Copy password to clipboard
  const handleCopyPassword = (pwd: string) => {
    navigator.clipboard.writeText(pwd);
    setCopiedPassword(true);
    setTimeout(() => setCopiedPassword(false), 2000);
  };

  // Copy SHA256 to clipboard
  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  // Handle report link
  const handleReport = () => {
    setReportSent(true);
    if (onReportLink) onReportLink();
    setTimeout(() => setReportSent(false), 4000);
  };

  // Scroll to download section
  const scrollToDownloads = () => {
    if (downloadSectionRef.current) {
      downloadSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 4 Related / Suggested games for "También te puede gustar"
  const relatedGames = useMemo(() => {
    if (!game) return [];
    const currentGenres = new Set(game.genres);
    const others = GAMES_CATALOG.filter(g => g.id !== game.id);

    const sortedByRelevance = [...others].sort((a, b) => {
      const aMatches = a.genres.filter(g => currentGenres.has(g)).length;
      const bMatches = b.genres.filter(g => currentGenres.has(g)).length;
      return bMatches - aMatches;
    });

    return sortedByRelevance.slice(0, 4);
  }, [game]);

  if (!game) return null;

  // Extract 3 captures for the screenshots grid
  const captures = (game.screenshots && game.screenshots.length > 0)
    ? [game.bannerUrl, ...game.screenshots].slice(0, 3)
    : [game.bannerUrl, game.coverUrl, game.bannerUrl];

  // Helper for server initial icon
  const getServerInitial = (name: string) => {
    const trimmed = name.trim().toUpperCase();
    if (trimmed.startsWith('GOOGLE') || trimmed.startsWith('DRIVE')) return 'D';
    if (trimmed.startsWith('MEDIA')) return 'M';
    if (trimmed.startsWith('MEGA')) return 'M';
    if (trimmed.startsWith('TORRENT')) return 'T';
    if (trimmed.startsWith('PIXEL')) return 'P';
    return trimmed.charAt(0) || 'S';
  };

  const passwordText = 'oribius-vault';
  const heroImage = game.bannerUrl || game.coverUrl;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8 animate-fade-in"
      onClick={onClose}
    >
      {/* Modal Dialog Window - Fullscreen en móvil, max-w-7xl en escritorio */}
      <div
        ref={scrollContainerRef}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-7xl bg-[#100E0C] border-0 sm:border border-[rgba(237,230,216,0.16)] rounded-none sm:rounded-[6px] shadow-2xl overflow-y-auto min-h-[100dvh] sm:min-h-0 max-h-[100dvh] sm:max-h-[94vh] text-[#EDE6D8] font-sans transition-all flex flex-col"
      >
        {/* Top Sticky Header Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-5 sm:px-8 py-3.5 bg-[#100E0C]/95 backdrop-blur-md border-b border-[rgba(237,230,216,0.1)] shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-2 h-2 rotate-45 bg-[#B8976A] shrink-0" aria-hidden="true" />
            <span className="font-['Libre_Baskerville',serif] text-base sm:text-lg text-[#EDE6D8] font-normal truncate max-w-md md:max-w-xl">
              {game.title}
            </span>
            <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-[rgba(237,230,216,0.14)] shrink-0">
              <HardwareTierIndicator tier={game.hardwareTier} />
              <SetupBadge
                game={game}
                setup={setup || null}
                onOpenSetupModal={onOpenSetupModal}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={scrollToDownloads}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#EDE6D8] bg-[#1E1B17] hover:bg-[#2A241F] border border-[rgba(237,230,216,0.2)] hover:border-[#B8976A] rounded-[4px] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#B8976A]" />
              <span>Descargas</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#A89F90] hover:text-[#EDE6D8] hover:bg-[#1E1B17] rounded-[4px] transition-colors cursor-pointer"
              title="Cerrar (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 1. HERO BANNER: Siempre contiene la imagen principal del juego */}
        <div className="relative w-full h-72 sm:h-96 md:h-[420px] lg:h-[460px] overflow-hidden bg-[#151210] shrink-0">
          {/* Main Keyart Background Image */}
          <img
            src={heroImage}
            alt={`Imagen principal de ${game.title}`}
            className="w-full h-full object-cover object-center filter brightness-95"
            referrerPolicy="no-referrer"
          />

          {/* Cinematic Vignette and Smooth Gradient into Modal Body */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#100E0C] via-[#100E0C]/60 via-40% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#100E0C]/85 via-transparent to-[#100E0C]/60" />
          <div className="absolute inset-0 bg-black/20" />

          {/* Hero Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 md:p-10 pointer-events-none">
            {/* Top metadata badge */}
            <div className="flex items-center justify-between pointer-events-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#100E0C]/85 backdrop-blur-md border border-[rgba(237,230,216,0.18)] text-xs font-mono text-[#EDE6D8]">
                <Sparkles className="w-3.5 h-3.5 text-[#B8976A]" />
                <span className="uppercase tracking-wider text-[#B8976A]">Edición Completa</span>
                <span className="text-[rgba(237,230,216,0.3)]">|</span>
                <span>{game.version}</span>
              </div>
            </div>

            {/* Bottom Hero Info */}
            <div className="pointer-events-auto max-w-4xl space-y-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-sans">
                <span className="px-2.5 py-1 rounded-[4px] bg-[#B8976A] text-[#12100E] font-medium tracking-wide uppercase text-[11px]">
                  {game.genres[0]}
                </span>
                <div className="bg-[#100E0C]/80 backdrop-blur-md px-2.5 py-1 rounded-[4px] border border-[rgba(237,230,216,0.16)] text-[#EDE6D8] flex items-center gap-1.5 font-mono">
                  <HardDrive className="w-3.5 h-3.5 text-[#B8976A]" />
                  <span>{game.fileSize}</span>
                </div>
                <div className="bg-[#100E0C]/80 backdrop-blur-md px-2.5 py-1 rounded-[4px] border border-[rgba(237,230,216,0.16)] text-[#EDE6D8] flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-[#B8976A] text-[#B8976A]" />
                  <span className="font-medium">{game.rating}</span>
                  <span className="text-[#A89F90]">/ 5.0</span>
                </div>
                <div className="hidden sm:flex items-center bg-[#100E0C]/80 backdrop-blur-md px-2.5 py-1 rounded-[4px] border border-[rgba(237,230,216,0.16)]">
                  <HardwareTierIndicator tier={game.hardwareTier} />
                </div>
              </div>

              <h1 className="font-['Libre_Baskerville',serif] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#EDE6D8] font-normal tracking-tight leading-[1.08] drop-shadow-md">
                {game.title}
              </h1>

              <p className="text-xs sm:text-sm text-[#D8CFBF] max-w-3xl line-clamp-2 leading-relaxed drop-shadow">
                {game.shortDescription || game.description}
              </p>
            </div>
          </div>
        </div>

        {/* 2. UNIFIED MODAL CONTENT BODY (Mucho más ancho, sin textos truncados) */}
        <div className="p-6 sm:p-8 md:p-10 lg:p-12 space-y-14 flex-1">
          {/* Main 2-Column Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
            
            {/* Left Column (amplio, 7/12 o 8/12): Descripción + Capturas + Requisitos */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-12">
              
              {/* 1. Descripción */}
              <section aria-labelledby="modal-desc-heading">
                <h2
                  id="modal-desc-heading"
                  className="font-['Libre_Baskerville',serif] text-2xl sm:text-3xl font-normal text-[#EDE6D8] tracking-tight mb-4"
                >
                  Descripción
                </h2>
                
                <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#D8CFBF]">
                  <p>
                    {game.description}
                  </p>
                  {game.shortDescription && (
                    <p className="text-[#A89F90]">
                      {game.shortDescription} Descarga directa completa con todos los complementos incluidos, comprobación de integridad y soporte para idiomas principales.
                    </p>
                  )}
                </div>

                {/* Tags / Pills */}
                <div className="flex flex-wrap items-center gap-2 mt-6">
                  {game.genres.map(genre => (
                    <span
                      key={genre}
                      className="px-3.5 py-1.5 rounded-full text-xs font-sans text-[#A89F90] bg-[#161310] border border-[rgba(237,230,216,0.16)] hover:border-[rgba(237,230,216,0.3)] transition-colors"
                    >
                      {genre}
                    </span>
                  ))}
                  {game.tags && game.tags.slice(0, 4).map(tag => (
                    <span
                      key={tag}
                      className="px-3.5 py-1.5 rounded-full text-xs font-sans text-[#A89F90] bg-[#161310] border border-[rgba(237,230,216,0.16)]"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-sans text-[#A89F90] bg-[#161310] border border-[rgba(237,230,216,0.16)]">
                    Un jugador
                  </span>
                </div>
              </section>

              {/* 2. Capturas */}
              <section aria-labelledby="modal-capturas-heading">
                <h3
                  id="modal-capturas-heading"
                  className="font-['Libre_Baskerville',serif] text-xl sm:text-2xl font-normal text-[#EDE6D8] tracking-tight mb-4"
                >
                  Capturas
                </h3>

                <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
                  {captures.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedScreenshotForLightbox(imgUrl)}
                      className="group relative aspect-[16/10] rounded-[4px] overflow-hidden bg-[#161310] border border-[rgba(237,230,216,0.16)] hover:border-[#B8976A] transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#B8976A]"
                      title="Ver captura ampliada"
                    >
                      <img
                        src={imgUrl}
                        alt={`Captura ${idx + 1} de ${game.title}`}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    </button>
                  ))}
                </div>
              </section>

              {/* 3. Requisitos del sistema - Diagnóstico con Tu Setup y Tabla oficial */}
              <section aria-labelledby="modal-requisitos-heading">
                {/* Diagnóstico Interactivo con Setup del Visitante */}
                <SetupComparator
                  game={game}
                  setup={setup || null}
                  onOpenSetupModal={onOpenSetupModal || (() => {})}
                />

                <h3
                  id="modal-requisitos-heading"
                  className="font-['Libre_Baskerville',serif] text-xl sm:text-2xl font-normal text-[#EDE6D8] tracking-tight mb-4"
                >
                  Ficha técnica oficial de requisitos
                </h3>

                <div className="w-full overflow-x-auto rounded-[4px] border border-[rgba(237,230,216,0.1)] bg-[#13110E] p-4 sm:p-5">
                  <table className="w-full text-left text-xs sm:text-sm font-sans min-w-[500px]">
                    <thead>
                      <tr className="border-b border-[rgba(237,230,216,0.16)]">
                        <th className="py-3 font-normal text-[#8A8275] uppercase text-[11px] font-mono tracking-wider w-[22%]">
                          Componente
                        </th>
                        <th className="py-3 font-mono text-xs uppercase tracking-widest text-[#B8976A] font-medium w-[39%]">
                          Mínimos
                        </th>
                        <th className="py-3 font-mono text-xs uppercase tracking-widest text-[#B8976A] font-medium w-[39%]">
                          Recomendados
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgba(237,230,216,0.08)]">
                      <tr>
                        <td className="py-3.5 text-[#A89F90] pr-4 font-normal">Sistema operativo</td>
                        <td className="py-3.5 text-[#EDE6D8] pr-4 font-medium leading-relaxed">{game.requirements.minimum.os || 'Windows 10 64-bit'}</td>
                        <td className="py-3.5 text-[#EDE6D8] font-medium leading-relaxed">{game.requirements.recommended.os || 'Windows 11 64-bit'}</td>
                      </tr>
                      <tr>
                        <td className="py-3.5 text-[#A89F90] pr-4 font-normal">Procesador</td>
                        <td className="py-3.5 text-[#EDE6D8] pr-4 font-medium leading-relaxed">{game.requirements.minimum.cpu}</td>
                        <td className="py-3.5 text-[#EDE6D8] font-medium leading-relaxed">{game.requirements.recommended.cpu}</td>
                      </tr>
                      <tr>
                        <td className="py-3.5 text-[#A89F90] pr-4 font-normal">Memoria</td>
                        <td className="py-3.5 text-[#EDE6D8] pr-4 font-medium leading-relaxed">{game.requirements.minimum.ram}</td>
                        <td className="py-3.5 text-[#EDE6D8] font-medium leading-relaxed">{game.requirements.recommended.ram}</td>
                      </tr>
                      <tr>
                        <td className="py-3.5 text-[#A89F90] pr-4 font-normal">Gráficos</td>
                        <td className="py-3.5 text-[#EDE6D8] pr-4 font-medium leading-relaxed">{game.requirements.minimum.gpu}</td>
                        <td className="py-3.5 text-[#EDE6D8] font-medium leading-relaxed">{game.requirements.recommended.gpu}</td>
                      </tr>
                      <tr>
                        <td className="py-3.5 text-[#A89F90] pr-4 font-normal">DirectX</td>
                        <td className="py-3.5 text-[#EDE6D8] pr-4 font-medium leading-relaxed">{game.requirements.minimum.directX || 'Versión 12'}</td>
                        <td className="py-3.5 text-[#EDE6D8] font-medium leading-relaxed">{game.requirements.recommended.directX || 'Versión 12'}</td>
                      </tr>
                      <tr>
                        <td className="py-3.5 text-[#A89F90] pr-4 font-normal">Almacenamiento</td>
                        <td className="py-3.5 text-[#EDE6D8] pr-4 font-medium leading-relaxed">{game.requirements.minimum.storage}</td>
                        <td className="py-3.5 text-[#EDE6D8] font-medium leading-relaxed">{game.requirements.recommended.storage} (SSD)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

            </div>

            {/* Right Column (4/12 o 5/12): Enlaces de descarga + Información completa sin truncar */}
            <div ref={downloadSectionRef} className="lg:col-span-5 xl:col-span-4 space-y-6">
              
              {/* Card 1: Enlaces de descarga */}
              <div className="bg-[#151210] border border-[rgba(237,230,216,0.14)] rounded-[4px] p-5 sm:p-6 space-y-5">
                <div>
                  <h3 className="font-['Libre_Baskerville',serif] text-xl font-normal text-[#EDE6D8] tracking-tight">
                    Enlaces de descarga
                  </h3>
                  <p className="text-xs font-mono text-[#A89F90] mt-1.5 flex flex-wrap items-center gap-2">
                    <span className="text-[#B8976A]">[{game.fileSize}]</span>
                    <span>·</span>
                    <span>{game.version}</span>
                    <span>·</span>
                    <span>Español</span>
                  </p>
                </div>

                {/* Server Mirrors List */}
                <div className="space-y-3">
                  {game.downloadLinks.map(link => {
                    const initial = getServerInitial(link.serverName);

                    return (
                      <div
                        key={link.id}
                        className="flex items-center justify-between p-3.5 bg-[#1B1815] hover:bg-[#221E1A] border border-[rgba(237,230,216,0.1)] hover:border-[rgba(237,230,216,0.25)] rounded-[4px] transition-colors gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Round Letter Avatar */}
                          <div className="w-8 h-8 rounded-full border border-[rgba(237,230,216,0.22)] bg-[#100E0C] flex items-center justify-center font-mono text-xs font-medium text-[#EDE6D8] shrink-0">
                            {initial}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-medium text-[#EDE6D8] leading-tight">
                              {link.serverName}
                            </h4>
                            <p className="text-[11px] text-[#A89F90] mt-0.5">
                              {link.serverName.toLowerCase().includes('torrent')
                                ? 'Archivo .torrent'
                                : 'Descarga directa'}
                            </p>
                          </div>
                        </div>

                        {/* Download button */}
                        <button
                          onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
                          className="px-3 py-1.5 text-xs font-medium text-[#A89F90] hover:text-[#EDE6D8] bg-transparent hover:bg-[#2A241F] border border-[rgba(237,230,216,0.22)] hover:border-[#B8976A] rounded-[4px] transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Descargar</span>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Contraseña Box */}
                <div className="flex items-center justify-between p-3 bg-[#100E0C] border border-[rgba(237,230,216,0.12)] rounded-[4px] text-xs">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#A89F90]">
                    Contraseña
                  </span>
                  <button
                    onClick={() => handleCopyPassword(passwordText)}
                    className="font-mono text-[#EDE6D8] hover:text-[#B8976A] flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Copiar contraseña"
                  >
                    <span>[{passwordText}]</span>
                    {copiedPassword ? (
                      <Check className="w-3.5 h-3.5 text-[#B8976A]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#A89F90]" />
                    )}
                  </button>
                </div>

                {/* Checksum SHA256 */}
                <div className="flex items-center justify-between text-[11px] font-mono text-[#A89F90] pt-1 px-1">
                  <span className="break-all" title={game.sha256}>
                    SHA256: {game.sha256.slice(0, 14)}...
                  </span>
                  <button
                    onClick={() => handleCopyHash(game.sha256)}
                    className="hover:text-[#EDE6D8] transition-colors cursor-pointer text-[10px] uppercase underline underline-offset-2 shrink-0 ml-2"
                  >
                    {copiedHash ? 'Copiado' : 'Copiar Hash'}
                  </button>
                </div>

                {/* Enlace caído */}
                <div className="pt-2 border-t border-[rgba(237,230,216,0.08)] text-center">
                  <button
                    onClick={handleReport}
                    className="text-xs text-[#A89F90] hover:text-[#B8976A] transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>{reportSent ? '✓ Reporte recibido, gracias' : '¿Enlace caído? Avísanos'}</span>
                    {!reportSent && <ArrowRight className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              {/* Card 2: Información - Todo el texto visible y completo, sin cortes ni truncate */}
              <div className="bg-[#151210] border border-[rgba(237,230,216,0.14)] rounded-[4px] p-5 sm:p-6 space-y-4">
                <h3 className="font-['Libre_Baskerville',serif] text-xl font-normal text-[#EDE6D8] tracking-tight">
                  Información
                </h3>

                <dl className="space-y-3.5 text-xs sm:text-[13px] font-sans divide-y divide-[rgba(237,230,216,0.08)]">
                  <div className="flex items-start justify-between gap-4 pt-1">
                    <dt className="text-[#A89F90] shrink-0">Desarrollador</dt>
                    <dd className="text-[#EDE6D8] font-medium text-right break-words">{game.developer}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-4 pt-3.5">
                    <dt className="text-[#A89F90] shrink-0">Editor</dt>
                    <dd className="text-[#EDE6D8] font-medium text-right break-words">{game.publisher}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-4 pt-3.5">
                    <dt className="text-[#A89F90] shrink-0">Lanzamiento</dt>
                    <dd className="text-[#EDE6D8] font-mono text-right">{game.releaseYear}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-4 pt-3.5">
                    <dt className="text-[#A89F90] shrink-0">Género</dt>
                    <dd className="text-[#EDE6D8] font-medium text-right break-words">
                      {game.genres.join(' · ')}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-4 pt-3.5">
                    <dt className="text-[#A89F90] shrink-0">Idioma</dt>
                    <dd className="text-[#EDE6D8] font-medium text-right">Español, Inglés</dd>
                  </div>
                  <div className="flex items-start justify-between gap-4 pt-3.5">
                    <dt className="text-[#A89F90] shrink-0">Plataforma</dt>
                    <dd className="text-[#EDE6D8] font-medium text-right">PC · Windows</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 pt-3.5">
                    <dt className="text-[#A89F90] shrink-0">Exigencia</dt>
                    <dd className="text-[#EDE6D8] font-medium text-right">
                      <HardwareTierIndicator tier={game.hardwareTier} />
                    </dd>
                  </div>
                </dl>
              </div>

            </div>

          </div>

          {/* Bottom Section: También te puede gustar */}
          {relatedGames.length > 0 && (
            <section aria-labelledby="modal-related-heading" className="pt-8 border-t border-[rgba(237,230,216,0.14)]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3
                    id="modal-related-heading"
                    className="font-['Libre_Baskerville',serif] text-xl sm:text-2xl font-normal text-[#EDE6D8] tracking-tight"
                  >
                    También te puede gustar
                  </h3>
                  <p className="text-xs text-[#A89F90] font-sans mt-0.5">
                    Juegos similares recomendados de nuestra biblioteca
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-xs text-[#A89F90] hover:text-[#B8976A] transition-colors cursor-pointer inline-flex items-center gap-1 font-sans"
                >
                  <span>Ver catálogo</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* 4 Cards Grid amplia y sin recortes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {relatedGames.map((item) => (
                  <div
                    key={item.id}
                    className="group flex flex-col justify-between bg-[#151210] border border-[rgba(237,230,216,0.12)] hover:border-[rgba(237,230,216,0.28)] rounded-[4px] overflow-hidden transition-all duration-300"
                  >
                    {/* Poster Image */}
                    <div
                      onClick={() => onSelectGame ? onSelectGame(item) : undefined}
                      className="relative aspect-[3/4] w-full overflow-hidden bg-[#1B1815] cursor-pointer"
                    >
                      <img
                        src={item.coverUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#151210] via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Metadata & Actions */}
                    <div className="p-3.5 space-y-3">
                      <div className="flex items-baseline justify-between gap-1">
                        <h4
                          onClick={() => onSelectGame ? onSelectGame(item) : undefined}
                          className="font-['Libre_Baskerville',serif] text-xs sm:text-sm font-normal text-[#EDE6D8] truncate group-hover:text-[#B8976A] transition-colors cursor-pointer"
                          title={item.title}
                        >
                          {item.title}
                        </h4>
                        <span className="font-mono text-[11px] text-[#A89F90] shrink-0">
                          [{item.fileSize}]
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#A89F90] font-sans">
                        <span className="truncate">{item.genres[0]}</span>
                        <HardwareTierIndicator tier={item.hardwareTier} showLabel={false} />
                      </div>

                      <button
                        onClick={() => onSelectGame ? onSelectGame(item) : undefined}
                        className="w-full py-1.5 px-2 text-xs font-medium text-[#A89F90] group-hover:text-[#EDE6D8] bg-transparent hover:bg-[#231F1B] border border-[rgba(237,230,216,0.18)] group-hover:border-[#B8976A] rounded-[4px] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3 h-3" />
                        <span>Ver enlaces</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>

      {/* Lightbox Modal for Screenshots */}
      {selectedScreenshotForLightbox && (
        <div
          className="fixed inset-0 z-60 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedScreenshotForLightbox(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh] overflow-hidden rounded-[4px] border border-[rgba(237,230,216,0.2)]">
            <button
              onClick={() => setSelectedScreenshotForLightbox(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/70 hover:bg-black text-[#EDE6D8] rounded-[4px] border border-white/20 transition-colors cursor-pointer"
              title="Cerrar vista previa"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedScreenshotForLightbox}
              alt="Captura ampliada"
              className="w-full h-full object-contain max-h-[85vh]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </div>
  );
};
