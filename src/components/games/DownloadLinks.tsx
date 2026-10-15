import React, { useState } from 'react';
import { Download, ExternalLink, Check, Copy, ShieldCheck, Server } from 'lucide-react';
import { DownloadLink } from '../../types/game';

interface DownloadLinksProps {
  links: DownloadLink[];
  gameTitle: string;
  sha256: string;
  installationSteps: string[];
}

export const DownloadLinks: React.FC<DownloadLinksProps> = ({
  links,
  gameTitle,
  sha256,
  installationSteps,
}) => {
  const [copiedHash, setCopiedHash] = useState(false);
  const [lastDownloadedId, setLastDownloadedId] = useState<string | null>(null);

  const handleCopyHash = () => {
    navigator.clipboard.writeText(sha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleDownloadClick = (link: DownloadLink) => {
    setLastDownloadedId(link.id);
    window.open(link.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      {/* Integrity & Security Banner */}
      <div className="bg-[#1A1714] border border-[rgba(237,230,216,0.14)] rounded-[4px] p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#EDE6D8]">
          <ShieldCheck className="w-4 h-4 text-[#B8976A] shrink-0" />
          <span>
            Enlaces comprobados y verificados. Integridad garantizada mediante checksum.
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-[11px] font-mono text-[#A89F90] truncate max-w-[150px] sm:max-w-[200px]">
            SHA256: {sha256.slice(0, 16)}...
          </span>
          <button
            onClick={handleCopyHash}
            className="flex items-center gap-1 px-2.5 py-1 bg-[#12100E] hover:bg-[#25201C] text-[#EDE6D8] border border-[rgba(237,230,216,0.24)] rounded-[4px] text-[11px] font-mono transition-colors cursor-pointer shrink-0"
            title="Copiar hash completo SHA256"
          >
            {copiedHash ? (
              <>
                <Check className="w-3 h-3 text-[#B8976A]" />
                <span className="text-[#B8976A]">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copiar Hash</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Available Direct Download Mirrors */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium font-['Libre_Baskerville',serif] text-[#EDE6D8] flex items-center gap-2">
            <Server className="w-4 h-4 text-[#B8976A]" />
            <span>Servidores Disponibles ({links.length})</span>
          </h4>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {links.map((link, idx) => {
            const isDownloaded = lastDownloadedId === link.id;

            return (
              <div
                key={link.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-[#1A1714] hover:bg-[#211E1A] border border-[rgba(237,230,216,0.14)] hover:border-[rgba(237,230,216,0.3)] rounded-[4px] gap-3 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-[4px] bg-[#12100E] border border-[rgba(237,230,216,0.14)] flex items-center justify-center text-[#B8976A] font-mono text-xs font-semibold shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-[#EDE6D8]">{link.serverName}</h5>
                    <div className="flex items-center gap-2 text-xs text-[#A89F90] font-sans mt-0.5">
                      <span>{link.partLabel}</span>
                      <span aria-hidden="true" className="opacity-40">·</span>
                      <span className="text-[#EDE6D8]">{link.size}</span>
                      <span aria-hidden="true" className="opacity-40">·</span>
                      <span>Verificado: {link.verifiedDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => handleDownloadClick(link)}
                    className="px-4 py-2 text-xs font-semibold rounded-[4px] transition-all flex items-center gap-1.5 cursor-pointer bg-[#B8976A] hover:bg-[#c9a677] text-[#12100E]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isDownloaded ? 'Abrir enlace de nuevo' : 'Ver enlace'}</span>
                    <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Installation Instructions */}
      <div className="bg-[#1A1714] border border-[rgba(237,230,216,0.14)] rounded-[4px] p-4 text-xs">
        <h5 className="font-semibold text-[#EDE6D8] uppercase tracking-wider text-[11px] mb-2.5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8976A]"></span>
          Instrucciones de Instalación
        </h5>
        <ol className="space-y-1.5 text-[#A89F90] list-decimal list-inside leading-relaxed font-sans">
          {installationSteps.map((step, i) => (
            <li key={i}>
              <span className="text-[#EDE6D8]">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
