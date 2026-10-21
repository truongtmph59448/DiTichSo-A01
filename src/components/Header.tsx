import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Type, 
  Heart, 
  Landmark, 
  Compass, 
  MapPin, 
  Sparkles, 
  BookOpen, 
  Info 
} from 'lucide-react';
import { PROJECT_INFO } from '../data/monuments';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  favoritesCount: number;
  fontSize: 'standard' | 'large' | 'xlarge';
  setFontSize: (size: 'standard' | 'large' | 'xlarge') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  favoritesCount,
  fontSize,
  setFontSize
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Landmark },
    { id: 'explore', label: 'Khám phá di tích', icon: Compass },
    { id: 'map', label: 'Bản đồ di sản', icon: MapPin },
    { id: 'gemini', label: 'Trợ lý Gemini', icon: Sparkles },
    { id: 'references', label: 'Nguồn tham khảo', icon: BookOpen },
    { id: 'about', label: 'Giới thiệu', icon: Info },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setIsMobileMenuOpen(false);
  };

  const cycleFontSize = () => {
    if (fontSize === 'standard') setFontSize('large');
    else if (fontSize === 'large') setFontSize('xlarge');
    else setFontSize('standard');
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#153D35] text-[#FAF7F2] border-b border-[#153D35]/30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Mobile Menu Trigger & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 text-[#FAF7F2] focus:outline-none"
              aria-label="Mở thực đơn di động"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div 
              onClick={() => setCurrentTab('home')}
              className="flex items-center gap-2.5 cursor-pointer lg:hidden"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#B97249] to-[#C89B3C] flex items-center justify-center text-white font-bold shadow-sm">
                🏛️
              </div>
              <div>
                <span className="font-bold text-lg text-white tracking-tight">{PROJECT_INFO.appName}</span>
                <span className="block text-[10px] text-[#FAF7F2]/70 leading-none">Di tích Việt Nam</span>
              </div>
            </div>

            {/* Desktop Quick Header Breadcrumb */}
            <div className="hidden lg:flex items-center gap-2 text-sm text-[#FAF7F2]/80">
              <span className="font-medium text-white">{PROJECT_INFO.projectName}</span>
              <span className="text-[#FAF7F2]/30">•</span>
              <span className="text-xs text-[#EADBC8] bg-[#B97249]/30 px-2 py-0.5 rounded border border-[#B97249]/40">
                Phi lợi nhuận • Giáo dục
              </span>
            </div>
          </div>

          {/* Accessibility Font Size Toggle & Quick Actions */}
          <div className="flex items-center gap-2.5">
            {/* Font size adjuster button */}
            <div className="flex items-center bg-[#0F2D27]/80 rounded-xl p-1 border border-[#FAF7F2]/15">
              <button
                onClick={cycleFontSize}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg text-[#FAF7F2] hover:bg-[#FAF7F2]/15 transition-colors"
                title="Thay đổi cỡ chữ (Hỗ trợ người cao tuổi và thị lực kém)"
                aria-label="Điều chỉnh cỡ chữ"
              >
                <Type className="w-3.5 h-3.5 text-[#C89B3C]" />
                <span className="hidden sm:inline text-[11px] text-[#FAF7F2]/80">Cỡ chữ:</span>
                <span className="font-bold text-[#EADBC8]">
                  {fontSize === 'standard' ? 'Chuẩn' : fontSize === 'large' ? 'Lớn +15%' : 'Rất lớn +30%'}
                </span>
              </button>
            </div>

            {/* Favorites button */}
            <button
              onClick={() => setCurrentTab('explore')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 text-xs font-medium transition-colors"
              title="Xem danh sách di tích yêu thích"
            >
              <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'text-red-400 fill-red-400' : 'text-[#FAF7F2]/70'}`} />
              <span className="hidden sm:inline">Yêu thích</span>
              <span className="bg-[#B97249] text-white px-1.5 py-0.2 rounded-full text-[10px] font-bold">
                {favoritesCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />

          {/* Drawer Menu */}
          <div className="fixed inset-y-0 left-0 w-72 bg-[#153D35] text-[#FAF7F2] shadow-2xl p-5 flex flex-col z-50">
            <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F2]/15">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B97249] to-[#C89B3C] flex items-center justify-center text-white text-lg font-bold shadow-md">
                  🏛️
                </div>
                <div>
                  <h2 className="font-bold text-lg text-white">{PROJECT_INFO.appName}</h2>
                  <p className="text-[11px] text-[#FAF7F2]/75">Mã đề tài: {PROJECT_INFO.projectCode}</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-lg bg-[#FAF7F2]/10 text-[#FAF7F2] hover:bg-[#FAF7F2]/20"
                aria-label="Đóng thực đơn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-2">
              <p className="text-xs text-[#FAF7F2]/60 italic py-2">
                "{PROJECT_INFO.slogan}"
              </p>
            </div>

            <nav className="flex-1 space-y-1.5 py-3 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-left text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#B97249] text-white shadow-md font-semibold'
                        : 'text-[#FAF7F2]/80 hover:bg-[#FAF7F2]/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-[#FAF7F2]/15 text-xs text-[#FAF7F2]/70 space-y-1">
              <p className="font-semibold text-[#EADBC8]">Dự án Thực tập Đợt 15</p>
              <p>FPT Polytechnic × IMTA TECH</p>
              <p className="text-[11px] text-[#FAF7F2]/50">SV: {PROJECT_INFO.authorName} ({PROJECT_INFO.studentId})</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
