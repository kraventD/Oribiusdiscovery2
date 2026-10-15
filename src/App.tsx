import React, { useState, useMemo, useRef } from 'react';
import { GAMES_CATALOG } from './data/gamesCatalog';
import { GameItem } from './types/game';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';
import { HeroSection } from './components/games/HeroSection';
import { FeaturedSection } from './components/games/FeaturedSection';
import { CategorySection } from './components/explore/CategorySection';
import { NewReleasesSection } from './components/games/NewReleasesSection';
import { HowToDownloadPanel } from './components/home/HowToDownloadPanel';
import { SiteFooter } from './components/layout/SiteFooter';
import { GameDetailModal } from './components/games/GameDetailModal';

export default function App() {
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);
  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const featuredGamesRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const newReleasesRef = useRef<HTMLDivElement>(null);

  // 1. Hero Featured Game (Elden Ring)
  const heroGame = useMemo(() => {
    return GAMES_CATALOG.find(g => g.id === 'elden-ring') || GAMES_CATALOG[0];
  }, []);

  // 2. Destacados (Exact 4 games: Hades, Hollow Knight, Civilization VI, Balatro)
  const featuredGames = useMemo(() => {
    const featuredIds = ['hades', 'hollow-knight', 'civilization-vi', 'balatro'];
    let list = featuredIds
      .map(id => GAMES_CATALOG.find(g => g.id === id))
      .filter((g): g is GameItem => Boolean(g));

    // Apply category filter if not "Todos"
    if (selectedCategory !== 'Todos') {
      list = list.filter(g => g.genres.includes(selectedCategory));
    }

    // Apply search query if active
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        g =>
          g.title.toLowerCase().includes(q) ||
          g.genres.some(genre => genre.toLowerCase().includes(q))
      );
    }

    return list;
  }, [selectedCategory, searchQuery]);

  // 3. Nuevos lanzamientos (Exact 4 games: Black Myth: Wukong, S.T.A.L.K.E.R. 2, Silent Hill 2, Metaphor: ReFantazio)
  const newReleasesGames = useMemo(() => {
    const releaseIds = [
      'black-myth-wukong',
      'stalker-2',
      'silent-hill-2',
      'metaphor-refantazio',
    ];
    let list = releaseIds
      .map(id => GAMES_CATALOG.find(g => g.id === id))
      .filter((g): g is GameItem => Boolean(g));

    if (selectedCategory !== 'Todos') {
      list = list.filter(g => g.genres.includes(selectedCategory));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        g =>
          g.title.toLowerCase().includes(q) ||
          g.genres.some(genre => genre.toLowerCase().includes(q))
      );
    }

    return list;
  }, [selectedCategory, searchQuery]);

  // Navigation handlers
  const handleNavigate = (section: string) => {
    setActiveSection(section);
    if (section === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'juegos') {
      featuredGamesRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'categorias') {
      categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'novedades') {
      newReleasesRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'favoritos') {
      showToast('Sección de favoritos sincronizada con tu biblioteca local.');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleOpenLinks = (game: GameItem) => {
    setSelectedGame(game);
  };

  const handleOpenDetails = (game: GameItem) => {
    setSelectedGame(game);
  };

  return (
    <div className="min-h-screen bg-[#12100E] text-[#EDE6D8] font-sans selection:bg-[#B8976A] selection:text-[#12100E] flex">
      {/* 1. Left Vertical Fixed Sidebar (Desktop only - Width: 88px) */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* 2. Mobile Bottom Navigation Bar (Instagram / FB style) */}
      <BottomNav
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* 3. Main Content Area (Offset by 88px on desktop, pb-24 on mobile for bottom bar) */}
      <div className="flex-1 min-w-0 pl-0 md:pl-[88px] pb-24 md:pb-0 flex flex-col">
        {/* Héroe panorámico a todo el ancho disponible */}
        <div id="inicio">
          <HeroSection
            game={heroGame}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenLinks={handleOpenLinks}
            onOpenDetails={handleOpenDetails}
          />
        </div>

        {/* Inner Content Container with 72px horizontal gutter */}
        <main className="w-full max-w-[1440px] px-6 sm:px-10 lg:px-[72px] mx-auto">
          {/* Sección Destacados */}
          <div ref={featuredGamesRef} id="juegos">
            <FeaturedSection
              games={featuredGames}
              onOpenLinks={handleOpenLinks}
              onOpenDetails={handleOpenDetails}
              onViewAll={() => setSelectedCategory('Todos')}
            />
          </div>

          {/* Sección Explorar por categoría */}
          <div ref={categoriesRef} id="categorias">
            <CategorySection
              selectedCategory={selectedCategory}
              onSelectCategory={cat => setSelectedCategory(cat)}
            />
          </div>

          {/* Zona inferior: Dos Columnas (Nuevos lanzamientos 2/3 + Cómo descargar 1/3) */}
          <section ref={newReleasesRef} id="novedades" className="w-full mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Columna Izquierda (~2/3: 8 columnas de 12) */}
              <div className="lg:col-span-8">
                <NewReleasesSection
                  games={newReleasesGames}
                  onOpenLinks={handleOpenLinks}
                  onOpenDetails={handleOpenDetails}
                  onViewAll={() => setSelectedCategory('Todos')}
                />
              </div>

              {/* Columna Derecha (~1/3: 4 columnas de 12) */}
              <div className="lg:col-span-4">
                <HowToDownloadPanel
                  onReportClick={() =>
                    showToast(
                      'Reporte recibido. Verificaremos los servidores de inmediato.'
                    )
                  }
                />
              </div>
            </div>
          </section>
        </main>

        {/* Pie de Página */}
        <SiteFooter />
      </div>

      {/* Real Functional Download Links and Details Modal */}
      <GameDetailModal
        game={selectedGame}
        onClose={() => setSelectedGame(null)}
        onSelectGame={game => setSelectedGame(game)}
        onReportLink={() =>
          showToast('Reporte recibido. Verificaremos los servidores de inmediato.')
        }
      />

      {/* Discreet Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 bg-[#1A1714] border border-[#B8976A] text-[#EDE6D8] text-xs font-sans px-4 py-3 rounded-[4px] shadow-xl animate-fade-in flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8976A]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
