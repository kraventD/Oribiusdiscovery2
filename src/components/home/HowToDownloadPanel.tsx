import React from 'react';

interface HowToDownloadPanelProps {
  onReportClick: () => void;
}

export const HowToDownloadPanel: React.FC<HowToDownloadPanelProps> = ({
  onReportClick,
}) => {
  const steps = [
    {
      num: '01',
      title: 'Elige el juego',
      description: 'Explora el catálogo y abre la ficha.',
    },
    {
      num: '02',
      title: 'Elige un servidor',
      description: 'MEGA, MediaFire, Drive o Torrent.',
    },
    {
      num: '03',
      title: 'Descarga',
      description: 'Sigue el enlace y listo.',
    },
  ];

  return (
    <div className="w-full bg-[#1A1714] rounded-[4px] p-8 flex flex-col justify-between">
      <div>
        {/* Title */}
        <h3 className="font-['Libre_Baskerville',serif] text-2xl sm:text-[30px] font-normal text-[#EDE6D8] mb-8">
          Cómo descargar
        </h3>

        {/* 3 Steps */}
        <div className="space-y-7">
          {steps.map(step => (
            <div key={step.num} className="flex items-start gap-5">
              <span className="font-['Libre_Baskerville',serif] text-xl font-normal text-[#B8976A] shrink-0 pt-0.5">
                {step.num}
              </span>

              <div>
                <h4 className="font-['Libre_Baskerville',serif] text-lg font-normal text-[#EDE6D8] mb-1">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-sm font-sans text-[#A89F90] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Divider and Link */}
      <div className="mt-8 pt-6 border-t border-[rgba(237,230,216,0.14)]">
        <button
          onClick={onReportClick}
          className="text-xs sm:text-sm font-sans text-[#B8976A] hover:text-[#c9a677] transition-colors cursor-pointer"
        >
          ¿Enlace caído? Avísanos →
        </button>
      </div>
    </div>
  );
};
