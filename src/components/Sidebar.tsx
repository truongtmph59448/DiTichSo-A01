import React from 'react';
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  BookOpen, 
  Info, 
  Heart,
  Landmark,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { PROJECT_INFO } from '../data/monuments';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  favoritesCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  favoritesCount
}) => {
  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Landmark, desc: 'Giới thiệu & Tiêu biểu' },
    { id: 'explore', label: 'Khám phá di tích', icon: Compass, desc: 'Tra cứu & Bộ lọc' },
    { id: 'map', label: 'Bản đồ di sản', icon: MapPin, desc: 'Bản đồ số tương tác' },
    { id: 'gemini', label: 'Trợ lý Gemini', icon: Sparkles, desc: 'Hỏi đáp dữ liệu kiểm chứng', badge: 'AI' },
    { id: 'references', label: 'Nguồn tham khảo', icon: BookOpen, desc: 'Tài liệu & Pháp lý' },
    { id: 'about', label: 'Giới thiệu', icon: Info, desc: 'Thông tin tác giả & Đề tài' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-72 bg-[#153D35] text-[#FAF7F2] border-r border-[#153D35]/30 min-h-screen sticky top-0 shrink-0 select-none shadow-xl">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#FAF7F2]/10 bg-[#0F2D27]/50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#B97249] to-[#C89B3C] flex items-center justify-center text-white shadow-md border border-white/20">
            {/* Stylized traditional temple/gate icon */}
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21h18" />
              <path d="M5 21V9l7-5 7 5v12" />
              <path d="M9 21v-7a3 3 0 0 1 6 0v7" />
              <path d="M2 9h20" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-white">{PROJECT_INFO.appName}</h1>
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-[#B97249]/40 text-[#EADBC8] border border-[#B97249]/60">
                A01
              </span>
            </div>
            <p className="text-xs text-[#FAF7F2]/75 font-medium mt-0.5">Bản đồ số di tích Việt Nam</p>
          </div>
        </div>
        <p className="text-[11px] text-[#FAF7F2]/60 mt-3 italic line-clamp-1">
          "{PROJECT_INFO.slogan}"
        </p>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[#FAF7F2]/40 mb-2">
          Điều hướng chính
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-200 text-left group ${
                isActive
                  ? 'bg-[#B97249] text-white shadow-lg shadow-[#B97249]/25 font-semibold'
                  : 'text-[#FAF7F2]/80 hover:bg-[#FAF7F2]/10 hover:text-white'
              }`}
            >
              <div
                className={`p-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-black/20 text-white'
                    : 'bg-[#FAF7F2]/5 text-[#FAF7F2]/80 group-hover:bg-[#FAF7F2]/10 group-hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium tracking-tight truncate">{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#C89B3C] text-black">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p
                  className={`text-[11px] truncate mt-0.5 ${
                    isActive ? 'text-white/80' : 'text-[#FAF7F2]/50 group-hover:text-[#FAF7F2]/70'
                  }`}
                >
                  {item.desc}
                </p>
              </div>
            </button>
          );
        })}

        {/* Quick Favorite Counter */}
        <div className="pt-4 mt-4 border-t border-[#FAF7F2]/10 px-3">
          <button
            onClick={() => setCurrentTab('explore')}
            className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[#FAF7F2]/5 hover:bg-[#FAF7F2]/10 transition-colors text-xs text-[#FAF7F2]/80"
          >
            <span className="flex items-center gap-2">
              <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'text-red-400 fill-red-400' : 'text-[#FAF7F2]/60'}`} />
              Di tích đã yêu thích
            </span>
            <span className="font-bold px-2 py-0.5 rounded-full bg-[#FAF7F2]/15 text-[#FAF7F2]">
              {favoritesCount}
            </span>
          </button>
        </div>
      </nav>

      {/* Footer Info Box */}
      <div className="p-4 m-3 rounded-xl bg-[#0D2621]/80 border border-[#FAF7F2]/10 text-xs">
        <div className="flex items-center gap-1.5 text-[#C89B3C] font-semibold text-[11px] mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>Phi lợi nhuận • Chính xác</span>
        </div>
        <p className="text-[11px] text-[#FAF7F2]/70 leading-relaxed">
          Đề tài thực tập FPT Polytechnic × IMTA TECH. Dữ liệu chuẩn hóa từ UNESCO & Cục Di sản văn hóa.
        </p>
        <div className="mt-2 pt-2 border-t border-[#FAF7F2]/10 flex items-center justify-between text-[10px] text-[#FAF7F2]/50">
          <span>SV: Trần Mạnh Trường</span>
          <span className="font-mono">PH59448</span>
        </div>
      </div>
    </aside>
  );
};
