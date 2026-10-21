import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { ExploreView } from './components/ExploreView';
import { HeritageMap } from './components/HeritageMap';
import { GeminiAssistantView } from './components/GeminiAssistantView';
import { ReferencesView } from './components/ReferencesView';
import { AboutView } from './components/AboutView';
import { MonumentModal } from './components/MonumentModal';
import { Monument, PROJECT_INFO } from './data/monuments';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedMonument, setSelectedMonument] = useState<Monument | null>(null);
  const [focusedMapMonument, setFocusedMapMonument] = useState<Monument | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ditichso_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [fontSize, setFontSize] = useState<'standard' | 'large' | 'xlarge'>(() => {
    try {
      const saved = localStorage.getItem('ditichso_fontsize');
      return (saved as any) || 'standard';
    } catch {
      return 'standard';
    }
  });

  // Apply font scale to document element
  useEffect(() => {
    document.documentElement.classList.remove('font-scale-standard', 'font-scale-large', 'font-scale-xlarge');
    document.documentElement.classList.add(`font-scale-${fontSize}`);
    try {
      localStorage.setItem('ditichso_fontsize', fontSize);
    } catch {
      // ignore
    }
  }, [fontSize]);

  // Persist favorites
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('ditichso_favorites', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleOpenOnMap = (monument: Monument) => {
    setFocusedMapMonument(monument);
    setCurrentTab('map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col lg:flex-row text-[#1c2e27]">
      {/* Desktop Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        favoritesCount={favorites.length}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          currentTab={currentTab}
          setCurrentTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          favoritesCount={favorites.length}
          fontSize={fontSize}
          setFontSize={setFontSize}
        />

        {/* View Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {currentTab === 'home' && (
            <HomeView
              onNavigate={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectMonument={(m) => setSelectedMonument(m)}
            />
          )}

          {currentTab === 'explore' && (
            <ExploreView
              onSelectMonument={(m) => setSelectedMonument(m)}
              onOpenOnMap={handleOpenOnMap}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          )}

          {currentTab === 'map' && (
            <HeritageMap
              onSelectMonument={(m) => setSelectedMonument(m)}
              focusedMonument={focusedMapMonument}
            />
          )}

          {currentTab === 'gemini' && (
            <GeminiAssistantView />
          )}

          {currentTab === 'references' && (
            <ReferencesView />
          )}

          {currentTab === 'about' && (
            <AboutView />
          )}
        </main>

        {/* Global Footer */}
        <footer className="mt-auto border-t border-[#E5DFD4] bg-white py-6 text-xs text-gray-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <p className="font-semibold text-[#153D35]">
                {PROJECT_INFO.appName} — {PROJECT_INFO.projectName}
              </p>
              <p className="text-[11px] text-gray-600 mt-0.5">
                Dự án phi lợi nhuận • Tác giả: {PROJECT_INFO.authorName} ({PROJECT_INFO.studentId}) • Nhóm 1 • FPT Polytechnic × IMTA TECH
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                ditichso.ai.studio
              </span>
              <span>•</span>
              <button
                onClick={() => {
                  setCurrentTab('references');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-[#B97249] hover:underline font-medium"
              >
                Nguồn tham khảo
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* Monument Detail Modal */}
      <MonumentModal
        monument={selectedMonument}
        onClose={() => setSelectedMonument(null)}
        isFavorite={selectedMonument ? favorites.includes(selectedMonument.id) : false}
        onToggleFavorite={toggleFavorite}
        onOpenOnMap={handleOpenOnMap}
      />
    </div>
  );
}
