import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Heart, 
  MapPin, 
  Award, 
  ArrowRight, 
  RotateCcw, 
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { MONUMENTS_DATA, Monument } from '../data/monuments';

interface ExploreViewProps {
  onSelectMonument: (monument: Monument) => void;
  onOpenOnMap: (monument: Monument) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  onSelectMonument,
  onOpenOnMap,
  favorites,
  onToggleFavorite
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);

  // Extract unique provinces
  const provinces = useMemo(() => {
    const list = Array.from(new Set(MONUMENTS_DATA.map(m => m.province))).sort();
    return ['all', ...list];
  }, []);

  // Filter types
  const types = [
    { id: 'all', label: 'Tất cả loại hình' },
    { id: 'lich-su', label: 'Lịch sử' },
    { id: 'kien-truc', label: 'Kiến trúc nghệ thuật' },
    { id: 'khao-co', label: 'Khảo cổ' },
    { id: 'danh-thang', label: 'Danh lam thắng cảnh' },
  ];

  // Levels
  const levels = [
    { id: 'all', label: 'Tất cả cấp độ' },
    { id: 'unesco', label: 'Di sản Thế giới UNESCO' },
    { id: 'national', label: 'Di tích Quốc gia Đặc biệt' },
  ];

  // Filtering logic
  const filteredMonuments = useMemo(() => {
    return MONUMENTS_DATA.filter((m) => {
      // Search by name, shortName, summary, value or history
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = m.name.toLowerCase().includes(query) || m.shortName.toLowerCase().includes(query);
        const matchesSummary = m.summary.toLowerCase().includes(query);
        const matchesValue = m.value.toLowerCase().includes(query);
        const matchesProvince = m.province.toLowerCase().includes(query);
        const matchesHistory = m.history.toLowerCase().includes(query);
        if (!matchesName && !matchesSummary && !matchesValue && !matchesProvince && !matchesHistory) {
          return false;
        }
      }

      // Province filter
      if (selectedProvince !== 'all' && m.province !== selectedProvince) {
        return false;
      }

      // Type filter
      if (selectedType !== 'all') {
        const lowerType = m.type.toLowerCase();
        if (selectedType === 'lich-su' && !lowerType.includes('lịch sử')) return false;
        if (selectedType === 'kien-truc' && !lowerType.includes('kiến trúc')) return false;
        if (selectedType === 'khao-co' && !lowerType.includes('khảo cổ')) return false;
        if (selectedType === 'danh-thang' && !lowerType.includes('thắng cảnh') && !lowerType.includes('hỗn hợp')) return false;
      }

      // Level filter
      if (selectedLevel === 'unesco' && !m.isUnesco) return false;
      if (selectedLevel === 'national' && !m.isNationalSpecial) return false;

      // Only favorites filter
      if (onlyFavorites && !favorites.includes(m.id)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedProvince, selectedType, selectedLevel, onlyFavorites, favorites]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedProvince('all');
    setSelectedType('all');
    setSelectedLevel('all');
    setOnlyFavorites(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Overview */}
      <div className="border-b border-[#E5DFD4] pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#153D35] tracking-tight flex items-center gap-2">
          <span>Khám phá Di tích Lịch sử, Văn hóa</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          Tra cứu hệ thống di tích đã được xếp hạng, hồ sơ niên đại và văn bản pháp lý chính thống.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5DFD4] shadow-xs space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm theo tên di tích, địa danh, giá trị lịch sử hoặc triều đại..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E5DFD4] text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#153D35]/30 focus:border-[#153D35]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-full w-5 h-5 flex items-center justify-center"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Selectors Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Province Selector */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
              Tỉnh / Thành phố
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E5DFD4] text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#153D35]/30"
            >
              <option value="all">Tất cả địa phương ({provinces.length - 1})</option>
              {provinces.filter(p => p !== 'all').map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Type Selector */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
              Loại hình di tích
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E5DFD4] text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#153D35]/30"
            >
              {types.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Level Selector */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
              Cấp độ xếp hạng
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E5DFD4] text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#153D35]/30"
            >
              {levels.map((l) => (
                <option key={l.id} value={l.id}>{l.label}</option>
              ))}
            </select>
          </div>

          {/* Favorites toggle & reset */}
          <div className="flex items-end gap-2">
            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border transition-all h-[38px] ${
                onlyFavorites
                  ? 'bg-red-50 text-red-600 border-red-200'
                  : 'bg-[#FAF7F2] text-gray-700 border-[#E5DFD4] hover:bg-gray-100'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-red-600 text-red-600' : 'text-gray-400'}`} />
              <span>Chỉ mục yêu thích ({favorites.length})</span>
            </button>

            {(searchQuery || selectedProvince !== 'all' || selectedType !== 'all' || selectedLevel !== 'all' || onlyFavorites) && (
              <button
                onClick={resetFilters}
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium transition-colors h-[38px] w-[38px] flex items-center justify-center shrink-0"
                title="Đặt lại bộ lọc"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Active Results Summary */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
          <span>Tìm thấy <strong className="text-[#153D35]">{filteredMonuments.length}</strong> di tích phù hợp</span>
          {onlyFavorites && (
            <span className="text-red-600 font-medium flex items-center gap-1">
              <Heart className="w-3 h-3 fill-red-600" />
              Đang lọc theo danh mục yêu thích
            </span>
          )}
        </div>
      </div>

      {/* Monuments Cards Grid */}
      {filteredMonuments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMonuments.map((monument) => {
            const isFav = favorites.includes(monument.id);
            return (
              <div
                key={monument.id}
                className="flex flex-col rounded-2xl bg-white border border-[#E5DFD4] hover:border-[#B97249]/50 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden group"
              >
                {/* Header Banner */}
                <div className="p-4 bg-gradient-to-r from-[#153D35] to-[#1E5247] text-white flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#B97249] text-white">
                        {monument.badge}
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/20 text-white">
                        {monument.province}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-white group-hover:text-[#EADBC8] transition-colors leading-snug line-clamp-1">
                      {monument.shortName}
                    </h3>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(monument.id);
                    }}
                    className={`p-2 rounded-xl transition-all shrink-0 ${
                      isFav
                        ? 'bg-red-500 text-white shadow-xs'
                        : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                    }`}
                    title={isFav ? 'Bỏ lưu yêu thích' : 'Lưu vào mục yêu thích'}
                    aria-label="Lưu yêu thích"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-white text-white' : ''}`} />
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="text-xs text-gray-500 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#B97249] shrink-0" />
                      <span className="line-clamp-1 font-medium">{monument.period}</span>
                    </div>

                    <p className="text-xs text-gray-700 leading-relaxed line-clamp-3">
                      {monument.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                    <button
                      onClick={() => onSelectMonument(monument)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#FAF7F2] hover:bg-[#B97249] text-[#153D35] hover:text-white font-semibold text-xs border border-[#E5DFD4] hover:border-[#B97249] transition-all"
                    >
                      <span>Hồ sơ chi tiết</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onOpenOnMap(monument)}
                      className="p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#153D35] text-[#153D35] hover:text-white border border-[#E5DFD4] hover:border-[#153D35] transition-all shrink-0"
                      title="Xem vị trí trên bản đồ"
                      aria-label="Xem trên bản đồ"
                    >
                      <MapPin className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 rounded-2xl bg-white border border-[#E5DFD4] space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#FAF1E6] text-[#B97249] flex items-center justify-center mx-auto text-2xl font-bold">
            🔍
          </div>
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-gray-800">
              Không tìm thấy di tích nào phù hợp
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
              Không có di tích nào khớp với từ khóa "{searchQuery}" hoặc các điều kiện lọc hiện tại.
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#153D35] hover:bg-[#1E5247] text-white text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Xóa toàn bộ bộ lọc</span>
          </button>
        </div>
      )}
    </div>
  );
};
