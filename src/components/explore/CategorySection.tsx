import React from 'react';

interface CategorySectionProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CATEGORIES = [
  'Todos',
  'Acción',
  'Aventura',
  'Estrategia',
  'RPG',
  'Indie',
];

export const CategorySection: React.FC<CategorySectionProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section className="w-full mb-16">
      {/* Title */}
      <h2 className="font-['Libre_Baskerville',serif] text-2xl sm:text-[32px] font-normal text-[#EDE6D8] mb-6">
        Explorar por categoría
      </h2>

      {/* 6 Category Pills in 1 Single Row */}
      <div className="w-full overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-3 sm:gap-4 min-w-max">
          {CATEGORIES.map(category => {
            const isActive = selectedCategory === category;

            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`h-[48px] px-8 rounded-full border text-sm font-sans transition-all cursor-pointer whitespace-nowrap flex items-center justify-center ${
                  isActive
                    ? 'border-[#B8976A] text-[#B8976A] font-medium'
                    : 'border-[rgba(237,230,216,0.24)] text-[#EDE6D8]/80 hover:text-[#EDE6D8] hover:border-[rgba(237,230,216,0.4)]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
